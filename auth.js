document.addEventListener("DOMContentLoaded", function () {

  const logado = localStorage.getItem("logado");
  const tipo = localStorage.getItem("tipoUsuario");
  const pagina = window.location.pathname.toLowerCase();

  // ✅ não logado
  if (logado !== "true") {
    window.location.href = "index.html";
    return;
  }

  // ✅ bloqueio por tipo
  if (pagina.includes("professor.html") && tipo !== "professor") {
    window.location.href = "index.html";
    return;
  }

  if (pagina.includes("aluno.html") && tipo !== "aluno") {
    window.location.href = "index.html";
    return;
  }

  // ✅ se chegou aqui → pode mostrar a página
  document.body.style.display = "block";

});