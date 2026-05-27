document.addEventListener("DOMContentLoaded", function () {

  const bancoPerguntas = [
    {
      pergunta: "Qual número completa a sequência? 2, 4, 8, 16, ?",
      opcoes: ["18", "24", "32", "64"],
      correta: "32"
    },
    {
      pergunta: "Se todos os gatos são animais e Mimi é um gato, então Mimi é:",
      opcoes: ["Um cachorro", "Um animal", "Uma planta", "Um peixe"],
      correta: "Um animal"
    },
    {
      pergunta: "Qual é o próximo número? 1, 3, 5, 7, ?",
      opcoes: ["8", "9", "10", "11"],
      correta: "9"
    },
    {
      pergunta: "Qual palavra não pertence ao grupo? Maçã, Banana, Cenoura, Uva",
      opcoes: ["Maçã", "Banana", "Cenoura", "Uva"],
      correta: "Cenoura"
    },
    {
      pergunta: "Se hoje é segunda, que dia será daqui a 3 dias?",
      opcoes: ["Terça", "Quarta", "Quinta", "Sexta"],
      correta: "Quinta"
    },
    {
      pergunta: "Qual número é metade de 50?",
      opcoes: ["10", "15", "20", "25"],
      correta: "25"
    },
    {
      pergunta: "Se 3 lápis custam 9 reais, quanto custa 1 lápis?",
      opcoes: ["2", "3", "4", "5"],
      correta: "3"
    },
    {
      pergunta: "O que vem depois na sequência? A, C, E, G, ?",
      opcoes: ["H", "I", "J", "K"],
      correta: "I"
    }
  ];

  function embaralhar(lista) {
    const copia = [...lista];

    for (let i = copia.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copia[i], copia[j]] = [copia[j], copia[i]];
    }

    return copia;
  }

  const perguntaQuiz = document.getElementById("perguntaLogica");
  const opcoes = document.querySelectorAll(".opcao-logica");
  const resultadoQuiz = document.getElementById("resultadoLogica");
  const pontuacaoQuiz = document.getElementById("pontuacaoLogica");
  const areaOpcoes = document.querySelector(".quiz-opcoes-logica");

  if (!perguntaQuiz || opcoes.length === 0 || !resultadoQuiz || !pontuacaoQuiz || !areaOpcoes) {
    return;
  }

  let perguntasDaRodada = [];
  let perguntaAtual = 0;
  let pontos = 0;

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

  function carregarPergunta() {
    const pergunta = perguntasDaRodada[perguntaAtual];

    perguntaQuiz.innerText = pergunta.pergunta;

    opcoes.forEach(function (botao, indice) {
      botao.innerText = pergunta.opcoes[indice];
      botao.style.display = "block";
      botao.disabled = false;
    });
  }

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

  opcoes.forEach(function (botao) {
    botao.addEventListener("click", function () {
      const resposta = botao.innerText;
      const correta = perguntasDaRodada[perguntaAtual].correta;

      opcoes.forEach(function (b) {
        b.disabled = true;
      });

      if (resposta == correta) {
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

  iniciarNovaRodada();

});