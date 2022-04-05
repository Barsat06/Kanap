//Récupération et affichage de l'ensemble des Kanap
fetch("http://localhost:3000/api/products")
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
  })
  .then((products) => {
    products.forEach((kanap) => {
      const items = document.querySelector(".items");
      const a = document.createElement("a");
      const article = document.createElement("article");
      const image = document.createElement("img");
      const h3 = document.createElement("h3");
      const p = document.createElement("p");

      h3.classList.add("productName");
      p.classList.add("productDescription");

      image.src = kanap.imageUrl;
      image.alt = kanap.altTxt;
      h3.innerText = kanap.name;
      p.innerText = kanap.description;
      a.href = "product.html?id=" + kanap._id;

      items.appendChild(a);
      a.appendChild(article);
      article.appendChild(image);
      article.appendChild(h3);
      article.appendChild(p);
    });
  });
