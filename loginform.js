document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");
  const loginScreen = document.getElementById("loginScreen");
  const dashboard = document.getElementById("dashboard");
  const mensagem = document.getElementById("mensagem");

  if (!loginForm || !loginScreen || !dashboard) return;

  /* =====================================
     SE JÁ ESTIVER LOGADO
  ===================================== */
  if (localStorage.getItem("logado") === "true") {
    loginScreen.style.display = "none";
    dashboard.style.display = "block";
    return;
  }

  /* =====================================
     LOGIN
  ===================================== */
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    try {
      const usuario = document.getElementById("usuario").value.trim();
      const senha = document.getElementById("senha").value.trim();
      const tipo = document.getElementById("tipoUsuario").value;

      if (usuario === "" || senha === "") {
        throw new Error("Preencha todos os campos!");
      }

      if (tipo === "") {
        throw new Error("Selecione o tipo!");
      }

      localStorage.setItem("logado", "true");
      localStorage.setItem("tipoUsuario", tipo);

      loginScreen.style.display = "none";
      dashboard.style.display = "block";

      if (mensagem) {
        mensagem.innerText = "";
      }

    } catch (erro) {
      if (mensagem) {
        mensagem.innerText = erro.message;
      }
    }
  });
});

