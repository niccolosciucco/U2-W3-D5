const url = "https://striveschool-api.herokuapp.com/api/product/";
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const getCard = function () {
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
        throw new Error("Risposta del server non positiva: " + response.status);
      }
    })
    .then((data) => {
      console.log(data);
      const col = document.querySelector(".col-10");
      col.innerHTML = `
      <div class="card h-100 shadow-sm"> 
              <img src="${data.imageUrl}" class="card-img-top" alt="${data.name}" 
                   style="height: 200px; object-fit: contain;">
              <div class="card-body d-flex flex-column"> 
                <h5 class="card-title text-truncate">${data.name}</h5>
                <p class="card-text flex-grow-1 text-secondary small">${data.description}</p>
                <p class="fw-bold mb-3">${data.price}€</p>
              </div>
            </div>`;
    })
    .catch((err) => {
      alert("Errore nel contattare il server: " + err);
    });
};

getCard();
