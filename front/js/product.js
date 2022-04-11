//Récupération de l'id du produit
let params = new URLSearchParams(location.search);
let id = params.get("id");

//Récupération et affichage des données du produit
fetch("http://localhost:3000/api/products/" + id)
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
  })
  .then((products) => {
    const imgLocation = document.querySelector(".item__img");
    const img = document.createElement("img");
    img.src = products.imageUrl;
    img.alt = products.altTxt;
    imgLocation.appendChild(img);

    const name = document.getElementById("title");
    name.innerText = products.name;

    const price = document.getElementById("price");
    price.innerText = products.price;

    const description = document.getElementById("description");
    description.innerText = products.description;

    products.colors.forEach((colors) => {
      const colorsLocation = document.getElementById("colors");
      const option = document.createElement("option");

      option.value = colors;
      option.innerText = colors;

      colorsLocation.appendChild(option);
    });

    const title = document.querySelector("title");
    title.innerText = products.name;
  });

const addToCart = document.getElementById("addToCart");

//Fonction d'ajout au localStorage
function addLocalStorage(color, quantity) {
  localStorage.setItem(
    JSON.stringify({ id: id, color: color }),
    JSON.stringify(Math.floor(new Number(quantity)))
  );
  alert("Votre article a bien été ajouté au panier");
}

//Ajout d'un article au panier
addToCart.addEventListener("click", () => {
  const color = document.getElementById("colors").value;
  let quantity = document.getElementById("quantity").value;

  if (quantity > 0 && quantity < 101 && color != "") {
    if (localStorage.length > 0) {
      let kanap;
      let inCart = false;
      let value;

      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        value = localStorage.getItem(key);
        kanap = JSON.parse(key);
        if (kanap.id === id && kanap.color === color) {
          inCart = true;
          break;
        }
      }

      if (inCart === true) {
        localStorage.setItem(
          JSON.stringify({ id: id, color: color }),
          JSON.stringify(parseInt(value) + parseInt(quantity))
        );
        alert("Votre article a bien été ajouté au panier");
      } else {
        addLocalStorage(color, quantity);
      }
    } else {
      addLocalStorage(color, quantity);
    }
  } else if (quantity < 1 || quantity > 100) {
    alert(
      "Veuillez sélectionner une quantité comprise entre 1 et 100 avant d'ajouter cet article à votre panier !"
    );
  } else {
    alert(
      "Veuillez sélectionner une couleur avant d'ajouter cet article à votre panier !"
    );
  }
});
