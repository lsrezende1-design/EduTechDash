document.addEventListener("DOMContentLoaded", function () {

  /* =====================================
     ELEMENTOS DO DOM
  ===================================== */
  const formBoletimAluno = document.getElementById("formBoletimAluno");
  const nomeConsultaAluno = document.getElementById("nomeConsultaAluno");
  const boletimAluno = document.getElementById("boletimAluno");
  const mensagemBoletim = document.getElementById("mensagemBoletim");

  // Proteção: se a página não tiver esse formulário, não roda
  if (!formBoletimAluno || !nomeConsultaAluno || !boletimAluno || !mensagemBoletim) return;

  /* =====================================
     MAP GLOBAL DE STATUS
  ===================================== */
  const statusMap = new Map([
    ["APR", "Aprovado"],
    ["REP_NOTA", "Reprovado por Nota"],
    ["REP_FREQ", "Reprovado por Frequência"],
    ["REP_AMBOS", "Reprovado por Nota e Frequência"]
  ]);

  /* =====================================
     FUNÇÕES PURAS
  ===================================== */
  function calcularMediaPonderada(notas, pesos) {
    let somaNotas = 0;
    let somaPesos = 0;

    for (let i = 0; i < notas.length; i++) {
      somaNotas += notas[i] * pesos[i];
      somaPesos += pesos[i];
    }

    return somaNotas / somaPesos;
  }

  function calcularFrequencia(presencas, totalAulas) {
    return (presencas / totalAulas) * 100;
  }

  function definirStatus(media, frequencia) {
    if (media >= 7 && frequencia >= 75) {
      return "APR";
    } else if (media < 7 && frequencia >= 75) {
      return "REP_NOTA";
    } else if (media >= 7 && frequencia < 75) {
      return "REP_FREQ";
    } else {
      return "REP_AMBOS";
    }
  }

  function definirConceito(media) {
    let faixa = "";

    if (media >= 9) {
      faixa = "A";
    } else if (media >= 8) {
      faixa = "B";
    } else if (media >= 7) {
      faixa = "C";
    } else {
      faixa = "D";
    }

    switch (faixa) {
      case "A":
        return "A";
      case "B":
        return "B";
      case "C":
        return "C";
      default:
        return "D";
    }
  }

  /* =====================================
     FUNÇÃO: CARREGAR ALUNOS
  ===================================== */
  function carregarAlunos() {
    const dadosSalvos = localStorage.getItem("alunos");

    if (!dadosSalvos) {
      return [];
    }

    try {
      const alunos = JSON.parse(dadosSalvos);

      if (!Array.isArray(alunos)) {
        return [];
      }

      return alunos;
    } catch {
      return [];
    }
  }

  /* =====================================
     BUSCA EXATA POR NOME
  ===================================== */
  function buscarAlunoPorNome(nomeDigitado, alunos) {
    const nomeFormatado = nomeDigitado.toLowerCase().trim();

    for (let i = 0; i < alunos.length; i++) {
      if (alunos[i].nome.toLowerCase().trim() === nomeFormatado) {
        return alunos[i];
      }
    }

    return null;
  }

  /* =====================================
     RENDERIZA O BOLETIM
  ===================================== */
  function renderizarBoletim(aluno) {
    // Validação defensiva da estrutura
    if (!aluno.notas || !Array.isArray(aluno.notas) || aluno.notas.length < 3) {
      throw new Error("As notas do aluno estão incompletas.");
    }

    if (typeof aluno.presencas !== "number" || typeof aluno.totalAulas !== "number" || aluno.totalAulas <= 0) {
      throw new Error("Os dados de frequência do aluno estão inválidos.");
    }

    const pesos = [2, 3, 5];
    const media = calcularMediaPonderada(aluno.notas, pesos);
    const frequencia = calcularFrequencia(aluno.presencas, aluno.totalAulas);
    const codigoStatus = definirStatus(media, frequencia);
    const statusExtenso = statusMap.get(codigoStatus);
    const conceito = definirConceito(media);

    boletimAluno.innerHTML = `
      <div class="linha-boletim">
        <h4>${aluno.nome}</h4>

        <p>Nota 1: ${Number(aluno.notas[0]).toFixed(2)}</p>
        <p>Nota 2: ${Number(aluno.notas[1]).toFixed(2)}</p>
        <p>Nota 3: ${Number(aluno.notas[2]).toFixed(2)}</p>

        <p>Média Ponderada: ${media.toFixed(2)}</p>
        <p>Frequência: ${frequencia.toFixed(2)}%</p>
        <p>Status: ${statusExtenso}</p>
        <p>Conceito: ${conceito}</p>

        <p>Telefone do responsável: ${aluno.contato?.telefone?.trim() || "Não informado"}</p>
        <p>E-mail do responsável: ${aluno.contato?.email?.trim() || "Não informado"}</p>
      </div>
    `;
  }

  /* =====================================
     EVENTO DO FORMULÁRIO
  ===================================== */
  formBoletimAluno.addEventListener("submit", function (event) {
    event.preventDefault();

    try {
      const nome = nomeConsultaAluno.value.trim();

      if (nome === "") {
        throw new Error("Digite o nome do aluno.");
      }

      // SEMPRE pega os dados atualizados na hora da consulta
      const alunos = carregarAlunos();

      if (alunos.length === 0) {
        throw new Error("Nenhum aluno foi encontrado no sistema.");
      }

      const aluno = buscarAlunoPorNome(nome, alunos);

      if (!aluno) {
        throw new Error("Aluno não encontrado.");
      }

      mensagemBoletim.innerText = "";
      renderizarBoletim(aluno);

    } catch (erro) {
      mensagemBoletim.innerText = erro.message;
      boletimAluno.innerHTML = "";
    }
  });

});