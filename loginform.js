document.addEventListener("DOMContentLoaded", function () {

  const loginForm = document.getElementById("loginForm");
  const loginScreen = document.getElementById("loginScreen");
  const dashboard = document.getElementById("dashboard");
  const mensagem = document.getElementById("mensagem");

  if (!loginForm || !loginScreen || !dashboard) return;

  /* =====================================
     USUÁRIOS FIXOS
  ===================================== */
  const usuarioProfessor = "prof";
  const senhaProfessor = "123";

  const usuarioAluno = "aluno";
  const senhaAluno = "123";

  /* =====================================
     SE JÁ ESTIVER LOGADO
  ===================================== */
  if (localStorage.getItem("logado") === "true") {
    loginScreen.style.display = "none";
    dashboard.style.display = "block";
    return;
  }

  /* =====================================
     LOGIN COM DO WHILE (CONTROLADO)
  ===================================== */
  loginForm.addEventListener("submit", function (event) {

    event.preventDefault();

    let usuario = document.getElementById("usuario").value.trim();
    let senha = document.getElementById("senha").value.trim();
    let tipo = document.getElementById("tipoUsuario").value;

    let logado = false;

    do {

      if (usuario === "" || senha === "") {
        mensagem.innerText = "❌ Preencha todos os campos!";
        break;
      }

      if (tipo === "") {
        mensagem.innerText = "❌ Selecione o tipo!";
        break;
      }

      /* LOGIN PROFESSOR */
      if (tipo === "professor") {

        if (usuario === usuarioProfessor && senha === senhaProfessor) {
          logado = true;
          localStorage.setItem("tipoUsuario", "professor");
        } else {
          mensagem.innerText = "❌ Login de professor inválido!";
        }

      }

      /* LOGIN ALUNO */
      else if (tipo === "aluno") {

        if (usuario === usuarioAluno && senha === senhaAluno) {
          logado = true;
          localStorage.setItem("tipoUsuario", "aluno");
        } else {
          mensagem.innerText = "❌ Login de aluno inválido!";
        }

      }

      if (!logado) {
        break; // evita loop infinito
      }

    } while (!logado);

    /* =========================
       SUCESSO
    ========================= */
    if (logado) {

      localStorage.setItem("logado", "true");

      loginScreen.style.display = "none";
      dashboard.style.display = "block";

      if (typeof aplicarRegrasDashboard === "function") {
        aplicarRegrasDashboard();
      }

      mensagem.innerText = "";

    }

  });

});