//Récupération et affichage de l'orderId
let params = new URLSearchParams(location.search);
let orderId = params.get("orderId");

document.getElementById("orderId").innerText = orderId;

localStorage.clear();
