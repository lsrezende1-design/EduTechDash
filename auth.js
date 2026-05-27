document.addEventListener("DOMContentLoaded", function () {

  /* =====================================
     INICIALIZAÇÃO DOS ALUNOS
  ===================================== */
  function inicializarAlunos() {

    const dadosSalvos = localStorage.getItem("alunos");

    if (!dadosSalvos) {

      const alunosIniciais = [
        {
          nome: "Ana Souza",
          notas: [8.5, 7.0, 9.0],
          presencas: 18,
          totalAulas: 20,
          contato: { telefone: "", email: "" }
        },
        {
          nome: "Carlos Lima",
          notas: [6.0, 5.5, 7.0],
          presencas: 14,
          totalAulas: 20,
          contato: { telefone: "", email: "" }
        },
        {
          nome: "Mariana Alves",
          notas: [9.5, 8.5, 9.0],
          presencas: 20,
          totalAulas: 20,
          contato: { telefone: "", email: "" }
        }
      ];

      localStorage.setItem("alunos", JSON.stringify(alunosIniciais));
    }

  }

  inicializarAlunos();

  /* =====================================
     CONTROLE DE ACESSO
  ===================================== */

  const logado = localStorage.getItem("logado");
  const tipo = localStorage.getItem("tipoUsuario");
  const pagina = window.location.pathname.toLowerCase();

  if (logado !== "true") {
    window.location.replace("index.html");
    return;
  }

  if (pagina.includes("professor") && tipo !== "professor") {
    window.location.replace("index.html");
    return;
  }

  if (pagina.includes("aluno") && tipo !== "aluno") {
    window.location.replace("index.html");
    return;
  }

  /* ✅ MOSTRA A PÁGINA (ESSENCIAL) */
  document.body.style.visibility = "visible";

});
``
