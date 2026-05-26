const perguntas = [

    {
        pergunta: "Quanto é 8 × 7?",
        opcoes: [54, 56, 64, 49],
        correta: 56
    },

    {
        pergunta: "Quanto é 25 + 17?",
        opcoes: [42, 40, 38, 45],
        correta: 42
    },

    {
        pergunta: "Quanto é 81 ÷ 9?",
        opcoes: [8, 7, 6, 9],
        correta: 9
    },

    {
        pergunta: "Quanto é 15 × 3?",
        opcoes: [30, 35, 40, 45],
        correta: 45
    },

    {
        pergunta: "Quanto é 100 - 37?",
        opcoes: [63, 67, 73, 57],
        correta: 63
    }

];

/* =====================================
   ELEMENTOS HTML
===================================== */

const perguntaQuiz =
document.getElementById("perguntaQuiz");

const opcoes =
document.querySelectorAll(".opcao");

const resultadoQuiz =
document.getElementById("resultadoQuiz");

const pontuacaoQuiz =
document.getElementById("pontuacaoQuiz");

const areaOpcoes =
document.querySelector(".quiz-opcoes");

/* =====================================
   VARIÁVEIS
===================================== */

let perguntaAtual = 0;

let pontos = 0;

/* =====================================
   CARREGA PERGUNTA
===================================== */

function carregarPergunta(){

    const pergunta =
    perguntas[perguntaAtual];

    perguntaQuiz.innerText =
    pergunta.pergunta;

    opcoes.forEach(function(botao, indice){

        botao.style.display = "block";

        botao.innerText =
        pergunta.opcoes[indice];

    });

}

/* =====================================
   VERIFICA RESPOSTA
===================================== */

opcoes.forEach(function(botao){

    botao.addEventListener("click", function(){

        const resposta =
        Number(botao.innerText);

        const correta =
        perguntas[perguntaAtual].correta;

        /* =========================
           RESPOSTA CORRETA
        ========================= */

        if(resposta === correta){

            resultadoQuiz.innerText =
            "✅ Resposta correta!";

            pontos++;

        }

        /* =========================
           RESPOSTA INCORRETA
        ========================= */

        else{

            resultadoQuiz.innerText =
            "❌ Resposta incorreta!";

        }

        /* =========================
           ATUALIZA PONTUAÇÃO
        ========================= */

        pontuacaoQuiz.innerText =
        "Pontos: " + pontos;

        perguntaAtual++;

        /* =========================
           FINAL DO QUIZ
        ========================= */

        if(perguntaAtual >= perguntas.length){

            perguntaQuiz.innerText =
            "🎉 Quiz finalizado!";

            resultadoQuiz.innerText =
            "Pontuação final: " + pontos;

            /* ESCONDE OPÇÕES */

            opcoes.forEach(function(botao){

                botao.style.display = "none";

            });

            /* =========================
               BOTÃO REINICIAR
            ========================= */

            const botaoReiniciar =
            document.createElement("button");

            botaoReiniciar.innerText =
            "Jogar Novamente";

            botaoReiniciar.classList.add(
                "btn-reiniciar"
            );

            botaoReiniciar.style.marginTop =
            "20px";

            botaoReiniciar.addEventListener(
                "click",
                reiniciarQuiz
            );

            areaOpcoes.appendChild(
                botaoReiniciar
            );

            return;

        }

        /* =========================
           PRÓXIMA PERGUNTA
        ========================= */

        setTimeout(function(){

            resultadoQuiz.innerText = "";

            carregarPergunta();

        }, 1000);

    });

});

/* =====================================
   INICIA QUIZ
===================================== */

carregarPergunta();

/* =====================================
   REINICIAR QUIZ
===================================== */

function reiniciarQuiz(){

    /* VOLTA AO INÍCIO */

    perguntaAtual = 0;

    pontos = 0;

    /* LIMPA TEXTOS */

    resultadoQuiz.innerText = "";

    pontuacaoQuiz.innerText =
    "Pontos: 0";

    /* REMOVE BOTÃO REINICIAR */

    const botaoReiniciar =
    document.querySelector(
        ".btn-reiniciar"
    );

    if(botaoReiniciar){

        botaoReiniciar.remove();

    }

    /* MOSTRA OPÇÕES */

    opcoes.forEach(function(botao){

        botao.style.display = "block";

    });

    /* CARREGA NOVAMENTE */

    carregarPergunta();

}