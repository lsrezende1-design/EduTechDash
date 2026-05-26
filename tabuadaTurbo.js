// Variáveis do sistema
let numero1;
let numero2;
let tempoInicio;

// Função para gerar nova pergunta
function gerarPergunta() {
  numero1 = Math.floor(Math.random() * 10) + 1;
  numero2 = Math.floor(Math.random() * 10) + 1;

  document.getElementById("pergunta").innerText =
    numero1 + " x " + numero2;

  tempoInicio = new Date().getTime(); // inicia cronômetro
}

// Função principal (tratamento com try/catch)
function verificarResposta() {
  try {
    let valor = document.getElementById("respostaAluno").value;

    if (valor === "") {
      throw new Error("Resposta inválida!");
    }

    let resposta = Number(valor);

    let correta = numero1 * numero2;

    let tempoFim = new Date().getTime();
    let tempoTotal = (tempoFim - tempoInicio) / 1000;

    if (resposta === correta) {
      document.getElementById("resultado").innerText = "✅ Acertou!";
    } else {
      document.getElementById("resultado").innerText =
        "❌ Errou! Resposta correta: " + correta;
    }

    document.getElementById("tempo").innerText =
      "Tempo: " + tempoTotal + " segundos";

    gerarPergunta();

  } catch (erro) {
    document.getElementById("resultado").innerText = erro.message;
  }
}


// ========================
// EVENTOS
// ========================
document.addEventListener("DOMContentLoaded", function () {

  let input = document.getElementById("respostaAluno");

  // bloqueia tecla "e"
  input.addEventListener("keydown", function (event) {
    if (event.key === "e" || event.key === "E") {
      event.preventDefault();
    }
  });

  // botão
  document.getElementById("btnVerificar").addEventListener("click", function (event) {
    event.preventDefault();
    verificarResposta();
  });

  // iniciar jogo
  gerarPergunta();
});
