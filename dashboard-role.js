document.addEventListener("DOMContentLoaded", function () {
  const logado = localStorage.getItem("logado");
  const tipo = localStorage.getItem("tipoUsuario");

  const btnProfessor = document.getElementById("btnProfessor");
  const btnAluno = document.getElementById("btnAluno");

  const linkProfessorNav = document.getElementById("linkProfessorNav");
  const linkAlunoNav = document.getElementById("linkAlunoNav");

  // Se não estiver logado, mantém só a tela de login
  const loginScreen = document.getElementById("loginScreen");
  const dashboard = document.getElementById("dashboard");

  if (logado !== "true") {
    if (loginScreen && dashboard) {
      loginScreen.style.display = "block";
      dashboard.style.display = "none";
    }
    return;
  }

  if (loginScreen && dashboard) {
    loginScreen.style.display = "none";
    dashboard.style.display = "block";
  }

  function bloquearBotao(botao) {
    if (!botao) return;
    botao.disabled = true;
    botao.style.opacity = "0.5";
    botao.style.cursor = "not-allowed";
  }

  function bloquearLink(link) {
    if (!link) return;

    // remove a navegação
    link.removeAttribute("href");

    // visual de desabilitado
    link.style.opacity = "0.5";
    link.style.cursor = "not-allowed";
    link.style.pointerEvents = "none";
    link.setAttribute("aria-disabled", "true");
  }

  // ALUNO: pode entrar só no aluno
  if (tipo === "aluno") {
    bloquearBotao(btnProfessor);
    bloquearLink(linkProfessorNav);

    if (btnAluno) {
      btnAluno.addEventListener("click", function () {
        window.location.href = "aluno.html";
      });
    }
  }

  // PROFESSOR: pode entrar só no professor
  if (tipo === "professor") {
    bloquearBotao(btnAluno);
    bloquearLink(linkAlunoNav);

    if (btnProfessor) {
      btnProfessor.addEventListener("click", function () {
        window.location.href = "professor.html";
      });
    }
  }
});