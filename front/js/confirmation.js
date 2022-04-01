//Récupération et affichage de l'orderId
const orderId = localStorage.getItem("orderId");
document.getElementById("orderId").innerText = orderId;

localStorage.clear();