document.addEventListener("DOMContentLoaded", function () {

  const logado = localStorage.getItem("logado");
  const tipo = localStorage.getItem("tipoUsuario");
  const pagina = window.location.pathname.toLowerCase();

  // ✅ não logado → nem mostra página
  if (logado !== "true") {
    window.location.replace("index.html");
    return;
  }

  // ✅ bloqueio silencioso (SEM ALERT, SEM FLICKER)
  if (pagina.includes("professor.html") && tipo !== "professor") {
    window.location.replace("index.html");
    return;
  }

  if (pagina.includes("aluno.html") && tipo !== "aluno") {
    window.location.replace("index.html");
    return;
  }

  // ✅ só libera se passou na validação
  document.body.style.visibility = "visible";

});