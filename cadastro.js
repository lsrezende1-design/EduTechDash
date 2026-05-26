const cadastroAluno =
document.getElementById(
    "cadastroAluno"
);

const mensagemCadastro =
document.getElementById(
    "mensagemCadastro"
);

cadastroAluno.addEventListener(
    "submit",
    function(event){

        event.preventDefault();

        const aluno = {

            nome:
            document.getElementById(
                "nomeAluno"
            ).value,

            email:
            document.getElementById(
                "emailAluno"
            ).value,

            telefone:
            document.getElementById(
                "telefoneAluno"
            ).value

        };

        /* SALVA */

        localStorage.setItem(
            "dadosAluno",
            JSON.stringify(aluno)
        );

        /* MENSAGEM */

        mensagemCadastro.innerText =
        "✅ Cadastro salvo com sucesso!";

    }
);