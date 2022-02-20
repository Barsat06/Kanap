fetch("http://localhost:3000/api/products")
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
  })
  .then((products) => {
    for (let i = 0; i < products.length; i++) {
      const items = document.querySelector(".items");
      const a = document.createElement("a");
      const article = document.createElement("article");
      const image = document.createElement("img");
      const h3 = document.createElement("h3");
      const p = document.createElement("p");

      h3.classList.add("productName");
      p.classList.add("productDescription");

      image.src = products[i].imageUrl;
      image.alt = products[i].altTxt;
      h3.innerText = products[i].name;
      p.innerText = products[i].description;
      productId = products[i]._id;
      a.href = "product.html?id=" + productId;

      items.appendChild(a);
      a.appendChild(article);
      article.appendChild(image);
      article.appendChild(h3);
      article.appendChild(p);
    }
  });