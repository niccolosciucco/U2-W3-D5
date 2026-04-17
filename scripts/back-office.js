const url = "https://striveschool-api.herokuapp.com/api/product/";

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

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const buttonAct = document.querySelectorAll("form button:nth-of-type(1)");

const buttonsDis = document.querySelectorAll(
  "form button:nth-of-type(2), form button:nth-of-type(3)",
);

if (id) {
  buttonAct[0].disabled = true;
  buttonsDis.forEach((button) => {
    button.disabled = false;

    fetch(url + id, {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OWUxZTg3ZjczOWY4NzAwMTU3YWIwOGIiLCJpYXQiOjE3NzY0MTI3OTksImV4cCI6MTc3NzYyMjM5OX0.k5G2wpCCStiNcAMLhzy0ZX1hcwkm_fZ-3__O5ly_1uY",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(
            "Risposta del server non positiva: " + response.status,
          );
        }
      })
      .then((data) => {
        console.log(data);

        document.getElementById("name").value = data.name;
        document.getElementById("description").value = data.description;
        document.getElementById("imageUrl").value = data.imageUrl;
        document.getElementById("price").value = data.price;
        document.getElementById("brand").value = data.brand;
      })
      .catch((err) => {
        alert("Errore nel contattare il server: " + err);
      });
  });
}

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
  fetch(url, {
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
        window.location.assign("./home.html");
      } else {
        throw new Error("Risposta del server non positiva: " + response.status);
      }
    })
    .catch((err) => {
      alert("Errore nel contattare il server: " + err);
    });
});

// #region DELETE

const deleteProduct = function () {
  fetch(url + id, {
    method: "DELETE",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OWUxZTg3ZjczOWY4NzAwMTU3YWIwOGIiLCJpYXQiOjE3NzY0MTI3OTksImV4cCI6MTc3NzYyMjM5OX0.k5G2wpCCStiNcAMLhzy0ZX1hcwkm_fZ-3__O5ly_1uY",
    },
  })
    .then((response) => {
      if (response.ok) {
        alert("Prodotto cancellato con successo");
        window.location.assign("./home.html");
      } else {
        throw new Error("Risposta del server non positiva: " + response.status);
      }
    })
    .catch((err) => {
      alert("Errore nel contattare il server: " + err);
    });
};

// #endregion

// #region PUT

const putProduct = function () {
  const name = document.getElementById("name").value;
  const description = document.getElementById("description").value;
  const imageUrl = document.getElementById("imageUrl").value;
  const price = document.getElementById("price").value;
  const brand = document.getElementById("brand").value;

  const updatedProduct = new Product(name, description, imageUrl, price, brand);

  fetch(url + id, {
    method: "PUT",
    body: JSON.stringify(updatedProduct),
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OWUxZTg3ZjczOWY4NzAwMTU3YWIwOGIiLCJpYXQiOjE3NzY0MTI3OTksImV4cCI6MTc3NzYyMjM5OX0.k5G2wpCCStiNcAMLhzy0ZX1hcwkm_fZ-3__O5ly_1uY",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        alert("Prodotto aggiornato con successo!");
        window.location.assign("./home.html");
      } else {
        throw new Error("Errore durante l'aggiornamento: " + response.status);
      }
    })
    .catch((err) => {
      console.error(err);
      alert("Errore nel contattare il server: " + err.message);
    });
};

// #endregion
