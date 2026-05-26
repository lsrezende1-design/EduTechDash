document.addEventListener("DOMContentLoaded", function () {

  document.getElementById("formCadastro").addEventListener("submit", function (event) {
    event.preventDefault();

    try {

      let nome = document.getElementById("nome").value;
      let login = document.getElementById("login").value;
      let senha = document.getElementById("senha").value;
      let tipo = document.getElementById("tipoUsuario").value;

   

      if (nome === "" || login === "" || senha === "") {
        throw new Error("Preencha todos os campos!");
      }

      if (tipo === "") {
        throw new Error("Selecione o tipo de usuário!");
      }

      document.getElementById("mensagem").innerText = "Cadastro realizado com sucesso!";

      if (tipo === "professor") {
        window.location.href = "professor.html";
      } else if (tipo === "aluno") {
        window.location.href = "aluno.html";
      }

    } catch (erro) {
      document.getElementById("mensagem").innerText = erro.message;
    }

  });

});