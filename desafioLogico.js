const perguntas = [

    {
        pergunta: "Qual número completa a sequência? 2, 4, 8, 16, ?",
        opcoes: [18, 24, 32, 64],
        correta: "32",
    },

    {
        pergunta: "Se todos os gatos são animais e Mimi é um gato, então Mimi é:",
        opcoes: ["Um cachorro",
            "Um animal",
            "Uma planta",
            "Um peixe",
        ],
        correta: "Um animal"
    },

    {
        pergunta: "Qual é o próximo número? 1, 3, 5, 7, ?",
        opcoes: [8, 9, 10, 11],
        correta: "9",

    },
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