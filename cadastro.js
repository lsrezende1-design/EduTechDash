document.addEventListener("DOMContentLoaded", function () {

  const cadastroAluno = document.getElementById("cadastroAluno");
  const mensagemCadastro = document.getElementById("mensagemCadastro");
  const nomeAlunoInput = document.getElementById("nomeAluno");
  const emailAlunoInput = document.getElementById("emailAluno");
  const telefoneAlunoInput = document.getElementById("telefoneAluno");

  if (!cadastroAluno || !mensagemCadastro || !nomeAlunoInput || !emailAlunoInput || !telefoneAlunoInput) {
    return;
  }

  /* =====================================
     FUNÇÃO: CARREGAR ALUNOS DO LOCALSTORAGE
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
     FUNÇÃO: SALVAR ALUNOS NO LOCALSTORAGE
  ===================================== */
  function salvarAlunos(alunos) {
    localStorage.setItem("alunos", JSON.stringify(alunos));
  }

  /* =====================================
     FUNÇÃO: BUSCAR ALUNO POR NOME
  ===================================== */
  function buscarAlunoPorNome(nomeDigitado, alunos) {
    for (let i = 0; i < alunos.length; i++) {
      if (alunos[i].nome.toLowerCase().trim() === nomeDigitado.toLowerCase().trim()) {
        return alunos[i];
      }
    }

    return null;
  }

  /* =====================================
     PREENCHER AUTOMATICAMENTE SE O ALUNO EXISTIR
  ===================================== */
  nomeAlunoInput.addEventListener("blur", function () {
    const nome = nomeAlunoInput.value.trim();

    if (nome === "") return;

    const alunos = carregarAlunos();
    const aluno = buscarAlunoPorNome(nome, alunos);

    if (aluno) {
      emailAlunoInput.value = aluno.contato?.email ?? "";
      telefoneAlunoInput.value = aluno.contato?.telefone ?? "";
    }
  });

  /* =====================================
     SUBMISSÃO DO FORMULÁRIO
  ===================================== */
  cadastroAluno.addEventListener("submit", function (event) {
    event.preventDefault();

    try {
      const nome = nomeAlunoInput.value.trim();
      const email = emailAlunoInput.value.trim();
      const telefone = telefoneAlunoInput.value.trim();

      if (nome === "" || email === "" || telefone === "") {
        throw new Error("Preencha todos os campos.");
      }

      const alunos = carregarAlunos();

      if (alunos.length === 0) {
        throw new Error("Nenhum aluno encontrado.");
      }

      const alunoEncontrado = buscarAlunoPorNome(nome, alunos);

      if (!alunoEncontrado) {
        throw new Error("Aluno não encontrado.");
      }

      if (!alunoEncontrado.contato) {
        alunoEncontrado.contato = {};
      }

      // ✅ ATUALIZA CONTATO NO MESMO ARRAY PRINCIPAL
      alunoEncontrado.contato.telefone = telefone;
      alunoEncontrado.contato.email = email;

      salvarAlunos(alunos);

      mensagemCadastro.innerText = "✅ Cadastro atualizado com sucesso!";
      cadastroAluno.reset();

    } catch (erro) {
      mensagemCadastro.innerText = erro.message;
    }
  });

});