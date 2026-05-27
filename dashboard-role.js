document.addEventListener("DOMContentLoaded", function () {
  aplicarRegrasDashboard();
});

function aplicarRegrasDashboard() {

  const tipo = localStorage.getItem("tipoUsuario");

  const btnProfessor = document.getElementById("btnProfessor");
  const btnAluno = document.getElementById("btnAluno");

  const linkProfessorNav = document.getElementById("linkProfessorNav");
  const linkAlunoNav = document.getElementById("linkAlunoNav");

  const btnJogos = document.getElementById("btnJogos");
  const btnBiblioteca = document.getElementById("btnBiblioteca");
  const btnEventos = document.getElementById("btnEventos");

  // =========================
  // FUNÇÕES
  // =========================

  function bloquearBotao(botao) {
    if (!botao) return;
    botao.disabled = true;
    botao.style.opacity = "0.5";
    botao.style.cursor = "not-allowed";
  }

  function bloquearLink(link) {
    if (!link) return;
    link.removeAttribute("href");
    link.style.pointerEvents = "none";
    link.style.opacity = "0.5";
    link.style.cursor = "not-allowed";
  }

  // =========================
  // AÇÕES LIVRES (todos acessam)
  // =========================

  if (btnJogos) {
    btnJogos.onclick = () => window.location.href = "jogosMatematicos.html";
  }

  if (btnBiblioteca) {
    btnBiblioteca.onclick = () => window.location.href = "biblioteca.html";
  }

  if (btnEventos) {
    btnEventos.onclick = () => window.location.href = "eventos.html";
  }

  // =========================
  // CONTROLE POR TIPO
  // =========================

  if (tipo === "aluno") {

    bloquearBotao(btnProfessor);
    bloquearLink(linkProfessorNav);

    if (btnAluno) {
      btnAluno.onclick = () => window.location.href = "aluno.html";
    }
  }

  if (tipo === "professor") {

    bloquearBotao(btnAluno);
    bloquearLink(linkAlunoNav);

    if (btnProfessor) {
      btnProfessor.onclick = () => window.location.href = "professor.html";
    }
  }
}