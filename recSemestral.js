document.addEventListener("DOMContentLoaded", function () {

  const btnRecuperacao = document.getElementById("btnRecuperacao");
  const resultadoRec = document.getElementById("resultadoRec");

  if (!btnRecuperacao || !resultadoRec) return;

  btnRecuperacao.addEventListener("click", function () {

    const nota1 = parseFloat(document.getElementById("nota1Rec").value);
    const nota2 = parseFloat(document.getElementById("nota2Rec").value);

    if (isNaN(nota1) || isNaN(nota2)) {
      resultadoRec.innerText = "❌ Informe notas válidas.";
      return;
    }

    const mediaAtual = (nota1 + nota2) / 2;

    // ✅ já aprovado
    if (mediaAtual >= 6.5) {
      resultadoRec.innerText = `✅ Você já está aprovado com média ${mediaAtual.toFixed(2)}.`;
      return;
    }

    // ✅ cálculo da recuperação
    const notaNecessaria = 13 - mediaAtual;

    if (notaNecessaria > 10) {
      resultadoRec.innerText = "❌ Mesmo com 10 na recuperação, não é possível atingir média 6.5.";
    } else if (notaNecessaria <= 0) {
      resultadoRec.innerText = "✅ Você já atingiu a média.";
    } else {
      resultadoRec.innerText = `📌 Você precisa tirar ${notaNecessaria.toFixed(2)} na recuperação.`;
    }

  });

});
``