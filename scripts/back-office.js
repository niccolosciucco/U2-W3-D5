class Product {
  constructor(_name, _description, _imageUrl, _price, _brand) {
    this.name = _name;
    this.description = _description;
    this.imageUrl = _imageUrl;
    this.price = _price;
    this.brand = _brand;
  }
}

const form = document.querySelector("form");

const resetForm = function () {
  form.reset();
};

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const description = document.getElementById("description").value;
  const imageUrl = document.getElementById("imageUrl").value;
  const price = document.getElementById("price").value;
  const brand = document.getElementById("brand").value;

  const singleProduct = new Product(name, description, imageUrl, price, brand);

  //   esecuzione POST
  fetch("https://striveschool-api.herokuapp.com/api/product/", {
    method: "POST",
    body: JSON.stringify(singleProduct),
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OWUxZTg3ZjczOWY4NzAwMTU3YWIwOGIiLCJpYXQiOjE3NzY0MTI3OTksImV4cCI6MTc3NzYyMjM5OX0.k5G2wpCCStiNcAMLhzy0ZX1hcwkm_fZ-3__O5ly_1uY",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        alert("Prodotto aggiunto con successo");
        resetForm();
      } else {
        throw new Error("Risposta del server non positiva: " + response.status);
      }
    })
    .catch((err) => {
      alert("Errore nel contattare il server: " + err);
    });
});
