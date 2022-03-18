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
}

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

      article.querySelector(".deleteItem").addEventListener("click", (e) => {
        localStorage.removeItem(key);
        location.removeChild(article);
        calcQuantityPrice();
      });

      article.querySelector("input").addEventListener("change", (e) => {
        value = document.querySelector("input").value;

        if (value > 0 && value < 101) {
          localStorage.setItem(key, value);
          calcQuantityPrice();
        } else {
          alert(
            "Veuillez sélectionner une quantité comprise entre 1 et 100 avant de modifier votre panier !"
          );
        }
      });
    });
}
function domUpdate(totalPrice, totalQuantity) {
  const cartQuantity = document.getElementById("totalQuantity");
  cartQuantity.innerText = totalQuantity;

  const cartPrice = document.getElementById("totalPrice");
  cartPrice.innerText = totalPrice;
}
calcQuantityPrice();
