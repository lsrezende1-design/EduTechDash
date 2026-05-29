
/* esta primeira linha eu posso tirar, já que aprendemos que o js fica no final do body, mas por segurança, por boa prática, colocar isso me ajuda a garantir que o DOM esteja carregado antes de tentar acessar os elementos do getElementById, por exemplo.  */
document.addEventListener("DOMContentLoaded", function () {

  const loginForm = document.getElementById("loginForm");
  /* ele chama o formulário de login */ 
  const loginScreen = document.getElementById("loginScreen");
    /* ele chama a tela de login, que é a div que envolve o formulário */
  const dashboard = document.getElementById("dashboard");
    /* ele chama o dashboard, que é a div que envolve o conteúdo principal do sistema, tela depois de logar */
  const mensagem = document.getElementById("mensagem");
    /* ele chama a div de mensagem, de erro ou sucesso do login */ 

    if (!loginForm || !loginScreen || !dashboard) return;
/* aqui ele verifica se tem tudo disponível */
  
  /* esta parte coloquei só para mostrar as mensagens de erro se logar com senha errada, e para testar o do while depois, mas não é seguro, não usar no dia a dia  */
      
  const usuarioProfessor = "prof";
  const senhaProfessor = "123";

  const usuarioAluno = "aluno";
  const senhaAluno = "123";

  /*Aqui começam as verificações de acesso, para garantir que o usuário não acesse o dashboard sem logar, ou que um aluno acesse a parte do professor, por exemplo.  */
 
  if (localStorage.getItem("logado") === "true") {
 /*  Se já tiver "logado" = true:*/

    loginScreen.style.display = "none";
 /* Esconde tela de login */
  
    dashboard.style.display = "block";
/* Mostra dashboard */

      return;
  } /* Sai do código */



  
  loginForm.addEventListener("submit", function (event) {
    /*executa o código quando o usuário clica em entrar */

    event.preventDefault();
/* Evita que a página recarregue, comportamento padrão do submit, e me permite controlar o que acontece depois de clicar em entrar.  */


   /* nesta sessão eu pego as respostas do usuário e com o trim no final evito espaços em branco.  */
    let usuario = document.getElementById("usuario").value.trim();
    let senha = document.getElementById("senha").value.trim();
    let tipo = document.getElementById("tipoUsuario").value;

    let logado = false;
/* aqui começa o controle de acesso, verificando se os campos estão preenchidos, se o tipo foi selecionado, e se as credenciais estão corretas.  */

/*experimentando Do While pra controlar entrada */

    do {

      if (usuario === "" || senha === "") {
        mensagem.innerText = "❌ Preencha todos os campos!";
        break;
      }
/* aqui verifica se está vazio e se sim, envia a mensagem */

      if (tipo === "") {
        mensagem.innerText = "❌ Selecione o tipo!";
        break;
      }
/* aqui verifica se o tipo foi selecionado e se não exibe a mensagem */

      if (tipo === "professor") {

        /*aqui verificamos se o tipo é professor e se for loga com as funcionalidades de professor e não for apresenta mensagem */
        if (usuario === usuarioProfessor && senha === senhaProfessor) {
          logado = true;
          localStorage.setItem("tipoUsuario", "professor");
        } else {
          mensagem.innerText = "❌ Login de professor inválido!";
        }

      }

      /*aqui verificamos se o tipo é aluno e se for loga com as funcionalidades de aluno e não for apresenta mensagem */
      else if (tipo === "aluno") {

        if (usuario === usuarioAluno && senha === senhaAluno) {
          logado = true;
          localStorage.setItem("tipoUsuario", "aluno");
        } else {
          mensagem.innerText = "❌ Login de aluno inválido!";
        }

      }

      if (!logado) {
        break; /* evita loop infinito  */
      }

    } while (!logado);

    
    if (logado) {

      localStorage.setItem("logado", "true");
      /* quando tem sucesso  ...*/

      loginScreen.style.display = "none";
      /* Esconde tela de login */

      dashboard.style.display = "block";
      /* Mostra dashboard */
      if (typeof aplicarRegrasDashboard === "function") {
        aplicarRegrasDashboard();
      }
      /*aplica as regras do tipo de usuário no dashboard */

      mensagem.innerText = "";
      /* limpa mensagem de erro, caso tenha tido, para não mostrar mais depois de logar com sucesso */
    }

  });

});