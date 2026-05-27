document.addEventListener("DOMContentLoaded", function () {

  const cadastroAluno = document.getElementById("cadastroAluno");
  const mensagemCadastro = document.getElementById("mensagemCadastro");

  const nomeInput = document.getElementById("nomeAluno");
  const emailInput = document.getElementById("emailAluno");
  const telefoneInput = document.getElementById("telefoneAluno");

  // Proteção: se o formulário não existir, não roda
  if (!cadastroAluno || !mensagemCadastro || !nomeInput || !emailInput || !telefoneInput) {
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
