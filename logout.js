/* =====================================
   LOGOUT (FUNÇÃO GLOBAL)
===================================== */
function logout() {

  
  localStorage.removeItem("logado");
  /*aqui ele apaga a regra logado do loginform.js*/
  localStorage.removeItem("tipoUsuario");
  /*aqui ele apaga o tipo de usuário*/

  window.location.href = "index.html";
/*aqui ele volta para o inicio do arquivo index.html, que vai fazer novamente o login */

}