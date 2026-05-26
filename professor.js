
document.addEventListener("DOMContentLoaded", function () {

  const tipo = localStorage.getItem("tipoUsuario");

 

});

  /* =====================================
     DADOS INICIAIS
  ===================================== */
  const alunosIniciais = [
    {
      nome: "Ana Souza",
      notas: [8.5, 7.0, 9.0],
      presencas: 18,
      totalAulas: 20,
      contato: {
        telefone: "35 99999-1111",
        email: "responsavel.ana@email.com"
      }
    },
    {
      nome: "Carlos Lima",
      notas: [6.0, 5.5, 7.0],
      presencas: 14,
      totalAulas: 20,
      contato: {
        telefone: "35 98888-2222",
        email: "responsavel.carlos@email.com"
      }
    },
    {
      nome: "Mariana Alves",
      notas: [9.5, 8.5, 9.0],
      presencas: 20,
      totalAulas: 20,
      contato: {
        telefone: "35 97777-3333",
        email: "responsavel.mariana@email.com"
      }
    }
  ];

  /* =====================================
     ARRAY GLOBAL DE ALUNOS
     - se já existir localStorage, usa ele
     - se não existir, usa os alunos iniciais
  ===================================== */
  const dadosSalvos = localStorage.getItem("alunos");

  const alunos = dadosSalvos
    ? JSON.parse(dadosSalvos)
    : alunosIniciais;

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
     ELEMENTOS DO DOM
  ===================================== */
  const formProfessor = document.getElementById("formProfessor");
  const listaAlunos = document.getElementById("listaAlunos");
  const buscaAluno = document.getElementById("buscaAluno");
  const mensagemProfessor = document.getElementById("mensagemProfessor");

  /* =====================================
     FUNÇÕES DE PERSISTÊNCIA
     - necessário para o aluno ver o boletim
  ===================================== */
  function salvarAlunos() {
    localStorage.setItem("alunos", JSON.stringify(alunos));
  }

  /* =====================================
     FUNÇÃO PURA: CALCULAR MÉDIA PONDERADA
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

  /* =====================================
     FUNÇÃO PURA: CALCULAR FREQUÊNCIA
  ===================================== */
  function calcularFrequencia(presencas, totalAulas) {
    return (presencas / totalAulas) * 100;
  }

  /* =====================================
     FUNÇÃO PURA: DEFINIR STATUS
  ===================================== */
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

  /* =====================================
     FUNÇÃO PURA: DEFINIR CONCEITO
  ===================================== */
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
     FUNÇÃO: BUSCA LINEAR
  ===================================== */
  function buscarAlunosPorNome(termo) {
    const encontrados = [];

    for (let i = 0; i < alunos.length; i++) {
      if (alunos[i].nome.toLowerCase().includes(termo.toLowerCase())) {
        encontrados.push(alunos[i]);
      }
    }

    return encontrados;
  }

  /* =====================================
     FUNÇÃO: NORMALIZAR DECIMAL
     aceita vírgula ou ponto
  ===================================== */
  function normalizarDecimal(valorTexto) {
    return valorTexto.replace(",", ".");
  }

  /* =====================================
     FUNÇÃO: VALIDAR ATÉ 2 CASAS DECIMAIS
  ===================================== */
  function validarDuasCasasDecimais(valorTexto) {
    const valorNormalizado = normalizarDecimal(valorTexto);
    const partes = valorNormalizado.split(".");

    if (partes.length === 2 && partes[1].length > 2) {
      return false;
    }

    return true;
  }

  /* =====================================
     FUNÇÃO: RENDERIZAR LISTA
     usa for-of
  ===================================== */
  function renderizarAlunos(listaRecebida = alunos) {
    listaAlunos.innerHTML = "";

    for (const aluno of listaRecebida) {
      const pesos = [2, 3, 5];
      const media = calcularMediaPonderada(aluno.notas, pesos);
      const frequencia = calcularFrequencia(aluno.presencas, aluno.totalAulas);
      const codigoStatus = definirStatus(media, frequencia);
      const statusExtenso = statusMap.get(codigoStatus);
      const conceito = definirConceito(media);

      listaAlunos.innerHTML += `
        <div class="linha-boletim">
          <h4>${aluno.nome}</h4>

          <p>Nota 1: ${aluno.notas[0].toFixed(2)}</p>
          <p>Nota 2: ${aluno.notas[1].toFixed(2)}</p>
          <p>Nota 3: ${aluno.notas[2].toFixed(2)}</p>

          <p>Média Ponderada: ${media.toFixed(2)}</p>
          <p>Frequência: ${frequencia.toFixed(2)}%</p>
          <p>Status: ${statusExtenso}</p>
          <p>Conceito: ${conceito}</p>

          <p>Telefone do responsável: ${aluno.contato?.telefone ?? "Não informado"}</p>
          <p>E-mail do responsável: ${aluno.contato?.email ?? "Não informado"}</p>
        </div>
      `;
    }
  }

  /* =====================================
     SUBMISSÃO COM ATUALIZAÇÃO PARCIAL
     - não apaga os demais campos
  ===================================== */
  formProfessor.addEventListener("submit", function (event) {
    event.preventDefault();

    try {
      const nome = document.getElementById("nomeAluno").value.trim();
      const nota1Texto = document.getElementById("nota1").value.trim();
      const nota2Texto = document.getElementById("nota2").value.trim();
      const nota3Texto = document.getElementById("nota3").value.trim();
      const presencasTexto = document.getElementById("presencas").value.trim();
      const totalAulasTexto = document.getElementById("totalAulas").value.trim();
      const telefoneResponsavel = document.getElementById("telefoneResponsavel").value.trim();
      const emailResponsavel = document.getElementById("emailResponsavel").value.trim();

      if (nome === "") {
        throw new Error("Informe o nome do aluno.");
      }

      const algumCampoPreenchido =
        nota1Texto !== "" ||
        nota2Texto !== "" ||
        nota3Texto !== "" ||
        presencasTexto !== "" ||
        totalAulasTexto !== "" ||
        telefoneResponsavel !== "" ||
        emailResponsavel !== "";

      if (!algumCampoPreenchido) {
        throw new Error("Preencha ao menos um campo para cadastrar ou atualizar.");
      }

      if (
        (nota1Texto !== "" && !validarDuasCasasDecimais(nota1Texto)) ||
        (nota2Texto !== "" && !validarDuasCasasDecimais(nota2Texto)) ||
        (nota3Texto !== "" && !validarDuasCasasDecimais(nota3Texto))
      ) {
        throw new Error("As notas podem ter no máximo 2 casas decimais.");
      }

      const nota1 = nota1Texto !== "" ? parseFloat(normalizarDecimal(nota1Texto)) : null;
      const nota2 = nota2Texto !== "" ? parseFloat(normalizarDecimal(nota2Texto)) : null;
      const nota3 = nota3Texto !== "" ? parseFloat(normalizarDecimal(nota3Texto)) : null;
      const presencas = presencasTexto !== "" ? parseInt(presencasTexto, 10) : null;
      const totalAulas = totalAulasTexto !== "" ? parseInt(totalAulasTexto, 10) : null;

      if (nota1Texto !== "" && isNaN(nota1)) {
        throw new Error("Nota 1 inválida.");
      }

      if (nota2Texto !== "" && isNaN(nota2)) {
        throw new Error("Nota 2 inválida.");
      }

      if (nota3Texto !== "" && isNaN(nota3)) {
        throw new Error("Nota 3 inválida.");
      }

      if (presencasTexto !== "" && isNaN(presencas)) {
        throw new Error("Presenças inválidas.");
      }

      if (totalAulasTexto !== "" && isNaN(totalAulas)) {
        throw new Error("Total de aulas inválido.");
      }

      if (
        (nota1 !== null && (nota1 < 0 || nota1 > 10)) ||
        (nota2 !== null && (nota2 < 0 || nota2 > 10)) ||
        (nota3 !== null && (nota3 < 0 || nota3 > 10))
      ) {
        throw new Error("As notas devem estar entre 0 e 10.");
      }

      if (totalAulas !== null && totalAulas <= 0) {
        throw new Error("O total de aulas deve ser maior que zero.");
      }

      /* =====================================
         PROCURA ALUNO EXISTENTE
      ===================================== */
      let alunoEncontrado = null;

      for (const aluno of alunos) {
        if (aluno.nome.toLowerCase() === nome.toLowerCase()) {
          alunoEncontrado = aluno;
        }
      }

      /* =====================================
         CADASTRA OU ATUALIZA SEM APAGAR DEMAIS
      ===================================== */
      if (alunoEncontrado) {
        if (nota1 !== null) {
          alunoEncontrado.notas[0] = nota1;
        }

        if (nota2 !== null) {
          alunoEncontrado.notas[1] = nota2;
        }

        if (nota3 !== null) {
          alunoEncontrado.notas[2] = nota3;
        }

        if (presencas !== null) {
          alunoEncontrado.presencas = presencas;
        }

        if (totalAulas !== null) {
          alunoEncontrado.totalAulas = totalAulas;
        }

        if (
          alunoEncontrado.presencas < 0 ||
          alunoEncontrado.totalAulas <= 0 ||
          alunoEncontrado.presencas > alunoEncontrado.totalAulas
        ) {
          throw new Error("As presenças não podem ser menores que zero nem maiores que o total de aulas.");
        }

        if (telefoneResponsavel !== "") {
          alunoEncontrado.contato.telefone = telefoneResponsavel;
        }

        if (emailResponsavel !== "") {
          alunoEncontrado.contato.email = emailResponsavel;
        }

        mensagemProfessor.innerText = "Aluno atualizado com sucesso!";
      } else {
        const novoAluno = {
          nome: nome,
          notas: [
            nota1 !== null ? nota1 : 0,
            nota2 !== null ? nota2 : 0,
            nota3 !== null ? nota3 : 0
          ],
          presencas: presencas !== null ? presencas : 0,
          totalAulas: totalAulas !== null ? totalAulas : 1,
          contato: {
            telefone: telefoneResponsavel,
            email: emailResponsavel
          }
        };

        if (novoAluno.presencas > novoAluno.totalAulas) {
          throw new Error("As presenças não podem ser maiores que o total de aulas.");
        }

        alunos.push(novoAluno);
        mensagemProfessor.innerText = "Aluno cadastrado com sucesso!";
      }

      /* =====================================
         SALVA PARA O PAINEL DO ALUNO
      ===================================== */
      salvarAlunos();

      renderizarAlunos();
      formProfessor.reset();

    } catch (erro) {
      mensagemProfessor.innerText = erro.message;
    }
  });

  /* =====================================
     BUSCA
  ===================================== */
  buscaAluno.addEventListener("input", function () {
    const termo = buscaAluno.value.trim();

    if (termo === "") {
      renderizarAlunos();
    } else {
      const encontrados = buscarAlunosPorNome(termo);
      renderizarAlunos(encontrados);
    }
  });

  /* =====================================
     RENDERIZA E SALVA AO CARREGAR
  ===================================== */
  renderizarAlunos();
  salvarAlunos();

});