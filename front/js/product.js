const url = location.search;
let id = url.replace("?id=", "");

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

    for (let i = 0; i < products.colors.length; i++) {
      const colorsLocation = document.getElementById("colors");
      const option = document.createElement("option");

      option.value = products.colors[i];
      option.innerText = products.colors[i];

      colorsLocation.appendChild(option);
    }
  });
