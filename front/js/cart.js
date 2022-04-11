//Création de l'objet contact
let contact = new Object();
//Création du tableau allProductId
let allProductId = new Array();

//Calcule du nombres de Kanap et du prix dans le panier
function calcQuantityPrice() {
  let totalPrice = 0;
  let totalQuantity = 0;

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    let value = localStorage.getItem(key);
    const kanap = JSON.parse(key);

    fetch("http://localhost:3000/api/products/" + kanap.id)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((products) => {
        value = parseInt(value);

        totalPrice = totalPrice + value * products.price;
        totalQuantity = totalQuantity + value;
        domUpdate(totalPrice, totalQuantity);
      });
  }

  if (totalPrice === 0) {
    domUpdate(0, 0);
  }

  emptyCart();
}

//Modification des valeur de prix et de quantité affichées
function domUpdate(totalPrice, totalQuantity) {
  const cartQuantity = document.getElementById("totalQuantity");
  cartQuantity.innerText = totalQuantity;

  const cartPrice = document.getElementById("totalPrice");
  cartPrice.innerText = totalPrice;
}

//Création des articles dans le panier
for (let i = 0; i < localStorage.length; i++) {
  const key = localStorage.key(i);
  let value = localStorage.getItem(key);
  const kanap = JSON.parse(key);

  fetch("http://localhost:3000/api/products/" + kanap.id)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((products) => {
      const location = document.getElementById("cart__items");

      const article = document.createElement("div");

      //Intégration de l'article
      article.innerHTML = `<article class="cart__item" data-id="${kanap.id}" data-color="${kanap.color}">
      <div class="cart__item__img">
      <img src="${products.imageUrl}" alt="${products.altTxt}">
      </div>
      <div class="cart__item__content">
      <div class="cart__item__content__description">
      <h2>${products.name}</h2>
      <p>${kanap.color}</p>
      <p>${products.price} €</p>
      </div>
      <div class="cart__item__content__settings">
      <div class="cart__item__content__settings__quantity">
      <p>Qté : </p>
      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${value}">
      </div>
      <div class="cart__item__content__settings__delete">
      <p class="deleteItem">Supprimer</p>
      </div>
      </div>
      </div>
      </article>`;

      location.appendChild(article);

      //Suppression du Kanap
      article.querySelector(".deleteItem").addEventListener("click", (e) => {
        localStorage.removeItem(key);
        location.removeChild(article);
        calcQuantityPrice();
      });

      //Changement du nombre de Kanap
      article.querySelector("input").addEventListener("change", (e) => {
        value = article.querySelector("input").value;

        if (value > 0 && value < 101) {
          localStorage.setItem(key, Math.floor(value));
          calcQuantityPrice();
        } else {
          alert(
            "Veuillez sélectionner une quantité comprise entre 1 et 100 avant de modifier votre panier !"
          );
        }
      });
    });
}

calcQuantityPrice();

//Vérification de la présence de Kanap dans le panier
function emptyCart() {
  if (localStorage.length === 0) {
    const cart = document.getElementById("cart__items");
    cart.innerHTML = `<div class="cart__empty">
        <p>Votre panier est vide !</p>
        </div>`;
  }
}

//Vérification du formulaire de commande
//Regex
const nameRegex =
/^[a-zA-ZéèîïÉÈÎÏ][a-zA-Zéèêàçîï]+([-'\s][a-zA-ZéèîïÉÈÎÏ][a-zA-Zéèêàçîï]+)?$/;
const addressRegex = /^[a-zA-Z0-9\s,.'-]{3,}$/;
const emailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

//Vérification du prénom
const firstName = document.getElementById("firstName");
const firstNameError = document.getElementById("firstNameErrorMsg");

firstName.addEventListener("blur", (e) => {
  if (!nameRegex.test(firstName.value)) {
    firstNameError.innerText = "Veuillez indiquer votre nom.";
    firstName.style.border = "1px solid red";
  } else {
    firstNameError.innerText = "";
    firstName.style.border = "";
    contact.firstName = firstName.value;
  }
});

//Vérification du nom
const lastName = document.getElementById("lastName");
const lastNameError = document.getElementById("lastNameErrorMsg");

lastName.addEventListener("blur", (e) => {
  if (!nameRegex.test(lastName.value)) {
    lastNameError.innerText = "Veuillez indiquer votre nom.";
    lastName.style.border = "1px solid red";
  } else {
    lastNameError.innerText = "";
    lastName.style.border = "";
    contact.lastName = lastName.value;
  }
});

//Vérification de l'adresse
const address = document.getElementById("address");
const addressError = document.getElementById("addressErrorMsg");

address.addEventListener("blur", (e) => {
  if (!addressRegex.test(address.value)) {
    addressError.innerText = "Veuillez indiquer votre adresse.";
    address.style.border = "1px solid red";
  } else {
    addressError.innerText = "";
    address.style.border = "";
    contact.address = address.value;
  }
});

//Vérificatin de la ville
const city = document.getElementById("city");
const cityError = document.getElementById("cityErrorMsg");

city.addEventListener("blur", (e) => {
  if (!nameRegex.test(city.value)) {
    cityError.innerText = "Veuillez indiquer votre ville.";
    city.style.border = "1px solid red";
  } else {
    cityError.innerText = "";
    city.style.border = "";
    contact.city = city.value;
  }
});

//Vérification de l'email
const email = document.getElementById("email");
const emailError = document.getElementById("emailErrorMsg");

email.addEventListener("blur", (e) => {
  if (!emailRegex.test(email.value)) {
    emailError.innerText = "Veuillez indiquer votre email.";
    email.style.border = "1px solid red";
  } else {
    emailError.innerText = "";
    email.style.border = "";
    contact.email = email.value;
  }
});

//Fonction de vérification du panier
function validateCart() {
  if (localStorage.length === 0) {
    alert("Votre panier est vide !");
    return false;
  } else {
    return true;
  }
}

//Fonction de validation du formulaire
function validateForm() {
  if (
    nameRegex.test(firstName.value) &&
    nameRegex.test(lastName.value) &&
    addressRegex.test(address.value) &&
    nameRegex.test(city.value) &&
    emailRegex.test(email.value)
  ) {
    return true;
  } else {
    alert("Veuillez remplir tous les champs du formulaire avant de valider !");
    return false;
  }
}

const order = document.getElementById("order");

order.addEventListener("click", (e) => {
  e.preventDefault();

  if (validateCart() == false) {
    return;
  } else if (validateForm() == true) {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      let value = localStorage.getItem(key);
      const kanap = JSON.parse(key);

      allProductId.push(kanap.id);
    }
    const products = [...new Set(allProductId)];

    fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ contact, products }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        localStorage.clear();
        window.location.href = "confirmation.html?orderId=" + data.orderId;
      });
  } else {
    return;
  }
});
