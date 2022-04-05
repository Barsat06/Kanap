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

//Ajout d'un article au panier
addToCart.addEventListener("click", () => {
  const color = document.getElementById("colors").value;
  const quantity = document.getElementById("quantity").value;

  if (quantity > 0 && quantity < 101) {
    localStorage.setItem(
      JSON.stringify({ id: id, color: color }),
      JSON.stringify(Math.floor(new Number(quantity)))
    );
  } else {
    alert(
      "Veuillez sélectionner une quantité comprise entre 1 et 100 avant d'ajouter cet article à votre panier !"
    );
  }
});
