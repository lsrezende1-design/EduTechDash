document.addEventListener("DOMContentLoaded", function () {

  let numero1;
  let numero2;
  let tempoInicio;

  /* =========================
     GERAR PERGUNTA
  ========================= */
  function gerarPergunta() {

    numero1 = Math.floor(Math.random() * 10) + 1;
    numero2 = Math.floor(Math.random() * 10) + 1;

    const pergunta = document.getElementById("perguntaTabuada");

    if (pergunta) {
      pergunta.innerText = numero1 + " x " + numero2;
    }

    tempoInicio = Date.now();
  }

  /* =========================
     VERIFICAR RESPOSTA
  ========================= */
  function verificarResposta() {

    try {

      const input = document.getElementById("respostaAluno");
      const resultado = document.getElementById("resultadoTabuada");
      const tempo = document.getElementById("tempoTabuada");

      if (!input || !resultado || !tempo) return;

      let valor = input.value;

      if (valor === "") {
        throw new Error("❌ Digite uma resposta!");
      }

      let resposta = Number(valor);

      if (isNaN(resposta)) {
        throw new Error("❌ Digite um número válido!");
      }

      let correta = numero1 * numero2;

      let tempoFim = Date.now();
      let tempoTotal = (tempoFim - tempoInicio) / 1000;

      if (resposta === correta) {
        resultado.innerText = "✅ Acertou!";
      } else {
        resultado.innerText = "❌ Errou! Resposta: " + correta;
      }

      tempo.innerText = "Tempo: " + tempoTotal.toFixed(2) + "s";

      input.value = "";

      gerarPergunta();

    } catch (erro) {
      const resultado = document.getElementById("resultadoTabuada");
      if (resultado) {
        resultado.innerText = erro.message;
      }
    }

  }

  /* =========================
     EVENTOS
  ========================= */
  const btn = document.getElementById("btnVerificar");
  const input = document.getElementById("respostaAluno");

  if (btn) {
    btn.addEventListener("click", verificarResposta);
  }

  if (input) {
    input.addEventListener("keydown", function (event) {
      if (event.key.toLowerCase() === "e") {
        event.preventDefault();
      }
    });
  }

  /* =========================
     INICIAR
  ========================= */
  gerarPergunta();

});
