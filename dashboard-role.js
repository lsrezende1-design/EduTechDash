document.addEventListener("DOMContentLoaded", function () {
  const loginScreen = document.getElementById("loginScreen");
  const dashboard = document.getElementById("dashboard");

  if (!loginScreen || !dashboard) return;

  const logado = localStorage.getItem("logado");
  const tipo = localStorage.getItem("tipoUsuario");

  // Se não estiver logado, mantém login visível
  if (logado !== "true") {
    loginScreen.style.display = "block";
    dashboard.style.display = "none";
    return;
  }

  // Se estiver logado, mostra o dashboard
  loginScreen.style.display = "none";
  dashboard.style.display = "block";

  // MENU
  const menuProfessor = document.getElementById("menuProfessor");
  const menuAluno = document.getElementById("menuAluno");

  // CARDS
  const cardProfessor = document.getElementById("cardProfessor");
  const cardAluno = document.getElementById("cardAluno");

  if (tipo === "professor") {
    if (menuAluno) menuAluno.style.display = "none";
    if (cardAluno) cardAluno.style.display = "none";
  }

  if (tipo === "aluno") {
    if (menuProfessor) menuProfessor.style.display = "none";
    if (cardProfessor) cardProfessor.style.display = "none";
  }
});