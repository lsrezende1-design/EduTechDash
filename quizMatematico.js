document.addEventListener("DOMContentLoaded", function () {

  /* =====================================
     BANCO DE PERGUNTAS
  ===================================== */
  const bancoPerguntas = [
    { pergunta: "Quanto é 8 × 7?", opcoes: [54, 56, 64, 49], correta: 56 },
    { pergunta: "Quanto é 25 + 17?", opcoes: [42, 40, 38, 45], correta: 42 },
    { pergunta: "Quanto é 81 ÷ 9?", opcoes: [8, 7, 6, 9], correta: 9 },
    { pergunta: "Quanto é 15 × 3?", opcoes: [30, 35, 40, 45], correta: 45 },
    { pergunta: "Quanto é 100 - 37?", opcoes: [63, 67, 73, 57], correta: 63 },

    { pergunta: "Quanto é 9 × 6?", opcoes: [42, 48, 54, 56], correta: 54 },
    { pergunta: "Quanto é 144 ÷ 12?", opcoes: [10, 11, 12, 13], correta: 12 },
    { pergunta: "Quanto é 18 + 27?", opcoes: [45, 44, 46, 43], correta: 45 },
    { pergunta: "Quanto é 50 - 28?", opcoes: [22, 18, 20, 24], correta: 22 },
    { pergunta: "Quanto é 7 × 8?", opcoes: [54, 56, 52, 58], correta: 56 },

    { pergunta: "Quanto é 120 ÷ 10?", opcoes: [10, 11, 12, 9], correta: 12 },
    { pergunta: "Quanto é 16 × 4?", opcoes: [60, 64, 68, 72], correta: 64 },
    { pergunta: "Quanto é 49 ÷ 7?", opcoes: [6, 7, 8, 9], correta: 7 },
    { pergunta: "Quanto é 35 + 19?", opcoes: [52, 54, 56, 58], correta: 54 },
    { pergunta: "Quanto é 90 - 45?", opcoes: [40, 45, 50, 55], correta: 45 }
  ];

  /* =====================================
     EMBARALHAR LISTA
  ===================================== */
  function embaralhar(lista) {
    const copia = [...lista];

    for (let i = copia.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copia[i], copia[j]] = [copia[j], copia[i]];
    }

    return copia;
  }

  /* =====================================
     ELEMENTOS DO DOM
  ===================================== */
  const perguntaQuiz = document.getElementById("perguntaMatematica");
  const opcoes = document.querySelectorAll(".opcao-mat");
  const resultadoQuiz = document.getElementById("resultadoMatematica");
  const pontuacaoQuiz = document.getElementById("pontuacaoMatematica");
  const areaOpcoes = document.querySelector(".quiz-opcoes-mat");

  if (!perguntaQuiz || opcoes.length === 0 || !resultadoQuiz || !pontuacaoQuiz || !areaOpcoes) {
    return;
  }

  /* =====================================
     VARIÁVEIS DO QUIZ
  ===================================== */
  let perguntasDaRodada = [];
  let perguntaAtual = 0;
  let pontos = 0;

  /* =====================================
     INICIAR NOVA RODADA (4 perguntas)
  ===================================== */
  function iniciarNovaRodada() {
    perguntasDaRodada = embaralhar(bancoPerguntas).slice(0, 4);
    perguntaAtual = 0;
    pontos = 0;

    resultadoQuiz.innerText = "";
    pontuacaoQuiz.innerText = "Pontos: 0";

    const botaoReiniciar = areaOpcoes.querySelector(".btn-reiniciar");
    if (botaoReiniciar) {
      botaoReiniciar.remove();
    }

    opcoes.forEach(function (botao) {
      botao.style.display = "block";
      botao.disabled = false;
    });

    carregarPergunta();
  }

  /* =====================================
     CARREGAR PERGUNTA ATUAL
  ===================================== */
  function carregarPergunta() {
    const pergunta = perguntasDaRodada[perguntaAtual];

    perguntaQuiz.innerText = pergunta.pergunta;

    opcoes.forEach(function (botao, indice) {
      botao.innerText = pergunta.opcoes[indice];
      botao.style.display = "block";
      botao.disabled = false;
    });
  }

  /* =====================================
     FINALIZAR QUIZ
  ===================================== */
  function finalizarQuiz() {
    perguntaQuiz.innerText = "🎉 Quiz finalizado!";
    resultadoQuiz.innerText = "Pontuação final: " + pontos;

    opcoes.forEach(function (botao) {
      botao.style.display = "none";
    });

    const botaoReiniciar = document.createElement("button");
    botaoReiniciar.innerText = "Jogar novamente";
    botaoReiniciar.classList.add("btn-reiniciar");
    botaoReiniciar.style.marginTop = "15px";

    botaoReiniciar.addEventListener("click", iniciarNovaRodada);

    areaOpcoes.appendChild(botaoReiniciar);
  }

  /* =====================================
     CLIQUES NAS OPÇÕES
  ===================================== */
  opcoes.forEach(function (botao) {
    botao.addEventListener("click", function () {

      const resposta = Number(botao.innerText);
      const correta = perguntasDaRodada[perguntaAtual].correta;

      opcoes.forEach(function (b) {
        b.disabled = true;
      });

      if (resposta === correta) {
        resultadoQuiz.innerText = "✅ Resposta correta!";
        pontos++;
      } else {
        resultadoQuiz.innerText = "❌ Resposta incorreta!";
      }

      pontuacaoQuiz.innerText = "Pontos: " + pontos;
      perguntaAtual++;

      if (perguntaAtual >= perguntasDaRodada.length) {
        setTimeout(finalizarQuiz, 800);
        return;
      }

      setTimeout(function () {
        resultadoQuiz.innerText = "";
        carregarPergunta();
      }, 800);

    });
  });

  /* =====================================
     INÍCIO
  ===================================== */
  iniciarNovaRodada();

});