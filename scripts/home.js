const url = "https://striveschool-api.herokuapp.com/api/product/";

const handleButtonNav = function () {
  const modale = document.getElementById("featureModal");
  const newModal = new bootstrap.Modal(modale);
  newModal.show();
};

const articles = document.querySelectorAll("article");
articles.forEach((art) => {
  art.style.display = "none";
});

const getProducts = function () {
  fetch(url, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OWUxZTg3ZjczOWY4NzAwMTU3YWIwOGIiLCJpYXQiOjE3NzY0MTI3OTksImV4cCI6MTc3NzYyMjM5OX0.k5G2wpCCStiNcAMLhzy0ZX1hcwkm_fZ-3__O5ly_1uY",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Risposta del server non positiva: " + response.status);
      }
    })
    .then((data) => {
      console.log(data);
      const spinner = document.getElementById("spinner");
      spinner.remove();

      articles.forEach((art) => {
        art.style.display = "block";
      });

      data.forEach((product) => {
        let rowName = null;

        if (product.brand.toUpperCase().trim() === "GRYFFINDOR") {
          rowName = "gryffindor-row";
        } else if (product.brand.toUpperCase().trim() === "SLYTHERIN") {
          rowName = "slytherin-row";
        } else if (product.brand.toUpperCase().trim() === "HUFFLEPUFF") {
          rowName = "hufflepuff-row";
        } else if (product.brand.toUpperCase().trim() === "RAVENCLAW") {
          rowName = "ravenclaw-row";
        }

        if (rowName) {
          const row = document.getElementById(rowName);

          row.innerHTML += `
          <div class="col-12 col-md-6 col-lg-3 mb-4">
            <div class="card h-100 shadow-sm"> 
              <img src="${product.imageUrl}" class="card-img-top" alt="${product.name}" 
                   style="height: 200px; object-fit: contain;">
              <div class="card-body d-flex flex-column"> 
                <h5 class="card-title text-truncate">${product.name}</h5>
                <p class="card-text flex-grow-1 text-secondary small">${product.description}</p>
                <p class="fw-bold mb-3">${product.price}€</p>
                <div class="d-flex justify-content-between gap-2">
                  <a href="./details.html?id=${product._id}" class="btn btn-outline-dark btn-sm">Details</a>
                  <a href="./back-office.html?id=${product._id}" class="btn btn-outline-dark btn-sm">Edit</a>
                </div>
              </div>
            </div>
          </div>
        `;
        }
      });
    })
    .catch((err) => {
      alert("Errore nel contattare il server: " + err);
    });
};

getProducts();
