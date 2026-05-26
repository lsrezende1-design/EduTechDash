const btnRecuperacao = document.getElementById("btnRecuperacao");
const resultadoRec = document.getElementById("resultadoRec");

btnRecuperacao.addEventListener("click", function () {

  let nota1 = parseFloat(document.getElementById("nota1Rec").value);
  let nota2 = parseFloat(document.getElementById("nota2Rec").value);

  if (isNaN(nota1) || isNaN(nota2)) {
    resultadoRec.innerText = "Informe notas válidas.";
    return;
  }

  let mediaAtual = (nota1 + nota2) / 2;

  // ✅ já aprovado
  if (mediaAtual >= 6.5) {
    resultadoRec.innerText = `✅ Nota em dia! Você já tem média ${mediaAtual.toFixed(2)}.`;
    return;
  }

  // ✅ cálculo correto (SUA FÓRMULA)
  let x = 13 - mediaAtual;

  if (x > 10) {
    resultadoRec.innerText = "❌ Mesmo com 10 na recuperação, não atinge média 6.5.";
  } else if (x <= 0) {
    resultadoRec.innerText = "✅ Você já atingiu a média.";
  } else {
    resultadoRec.innerText = `📌 Você precisa tirar ${x.toFixed(2)} na recuperação.`;
  }

});