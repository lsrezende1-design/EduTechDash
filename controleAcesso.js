document.addEventListener("DOMContentLoaded", function () {

  let tipo = localStorage.getItem("tipoUsuario");

  let btnAluno = document.getElementById("btnAluno");
  let btnProfessor = document.getElementById("btnProfessor");

  if (tipo === "aluno") {
    // aluno NÃO pode acessar professor
    btnProfessor.disabled = true;
  }

  if (tipo === "professor") {
    // professor NÃO pode acessar aluno
    btnAluno.disabled = true;
  }

});