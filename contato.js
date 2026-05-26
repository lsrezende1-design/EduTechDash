document.addEventListener("DOMContentLoaded", function () {

  const formContato = document.getElementById("formContato");
  const resposta = document.getElementById("mensagemContatoResposta");

if (!formContato) return;

  formContato.addEventListener("submit", function (event) {
    event.preventDefault();

    try {

      let nome = document.getElementById("nomeContato").value.trim();
      let email = document.getElementById("emailContato").value.trim();
      let mensagem = document.getElementById("mensagemContato").value.trim();

      // ✅ validação campos vazios
      if (nome === "" || email === "" || mensagem === "") {
        throw new Error("Preencha todos os campos.");
      }

      // ✅ validação de email (regex simples)
      let regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

      if (!regexEmail.test(email)) {
        throw new Error("Digite um e-mail válido.");
      }

      // ✅ validação tamanho da mensagem
      if (mensagem.length < 10) {
        throw new Error("A mensagem deve ter pelo menos 10 caracteres.");
      }

      // ✅ sucesso
      resposta.style.color = "lightgreen";
      resposta.innerText = "✅ Mensagem enviada com sucesso!";

      formContato.reset();

    } catch (erro) {
      resposta.style.color = "red";
      resposta.innerText = erro.message;
    }

  });

});
``