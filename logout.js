/* =====================================
   LOGOUT (FUNÇÃO GLOBAL)
===================================== */
function logout() {
  localStorage.removeItem("logado");
  localStorage.removeItem("tipoUsuario");

  window.location.href = "index.html";
}