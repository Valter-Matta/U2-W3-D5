window.addEventListener('DOMContentLoaded', () => {
  const isLoggedIn = localStorage.getItem('isLoggedIn')

  // Se l'utente è loggato, mostra il back office
  if (isLoggedIn === 'true') {
    const backOffice = document.getElementById('back-office')
    backOffice.classList.remove('d-none')
  }
})

myUrl = 'https://striveschool-api.herokuapp.com/api/product/'
myKeyAutorization =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzM3MGM2NThhZDEyOTAwMTU4NzZiYzYiLCJpYXQiOjE3MzE2NjA5MDEsImV4cCI6MTczMjg3MDUwMX0.L6OB5nEWFAZuYKV442uVJkV52zNLLqBkJfd8_dXbeSQ'

const genCards = function () {
  fetch(myUrl, {
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzM3MGM2NThhZDEyOTAwMTU4NzZiYzYiLCJpYXQiOjE3MzE2NjA5MDEsImV4cCI6MTczMjg3MDUwMX0.L6OB5nEWFAZuYKV442uVJkV52zNLLqBkJfd8_dXbeSQ',
    },
  })
    .then((response) => {
      console.log('RESPONSE', response)
      if (response.ok) {
        return response.json()
      } else {
        throw new Error('Errore nel recupero della risposta dal server')
      }
    })
    .then((arrayOfProducts) => {
      // qui dentro finisco quando ho completato l'estrazione del JSON dalla Response!
      console.log('arrayOfprodutcs', arrayOfProducts)
      // recupero la riga nella quale innesterò le colonne per i concerti
      const row = document.getElementById('row-product')
      arrayOfProducts.forEach((product) => {
        const newCol = document.createElement('div')
        newCol.classList.add('col', 'col-12', 'col-md-6', 'col-lg-4')
        newCol.innerHTML = `
           <div class="card h-100 mt-3">
                <img src=${product.imageUrl} class="card-img-top " alt="articolo">
                <div class="card-body d-flex flex-column justify-content-between align-items-center h-50 bg-info-subtle">
                  <h5 class="card-title">${product.name}</h5>
                  <p class="card-text">${product.description}</p>
                  <p class="card-text">${product.price}$</p>
                  <a href="./details.html?prodottoId=${product._id}" class="btn btn-primary">Vai ai Dettagli</a>
                </div>
              </div>
        `
        row.appendChild(newCol)

        document.querySelector('.spinner-border').classList.add('d-none')
        document.querySelector('.btn-danger').addEventListener('click', () => {
          fetch(myUrl, {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${myKeyAutorization}`,
            },
          })
            .then((response) => {
              if (response.ok) {
                console.log('Array inviato con successo')
                location.reload()
              } else {
                throw new Error("Errore durante l'invio dell'array")
              }
            })
            .catch((err) => console.error('Errore:', err))
        })
      })
    })
    .catch((error) => {
      console.log('ERROR', error)
    })
}

genCards()
