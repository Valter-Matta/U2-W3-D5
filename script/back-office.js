window.addEventListener('DOMContentLoaded', () => {
  const isLoggedIn = localStorage.getItem('isLoggedIn')

  // Se l'utente è loggato, mostra il back office
  if (isLoggedIn === 'true') {
    const backOffice = document.getElementById('back-office')
    backOffice.classList.remove('d-none')
  }
})

class Product {
  constructor(_name, _description, _brand, _imageUrl, _price) {
    this.name = _name
    this.description = _description
    this.brand = _brand
    this.imageUrl = _imageUrl
    this.price = _price
  }
}

myUrl = 'https://striveschool-api.herokuapp.com/api/product/'
myKeyAutorization =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzM3MGM2NThhZDEyOTAwMTU4NzZiYzYiLCJpYXQiOjE3MzE2NjA5MDEsImV4cCI6MTczMjg3MDUwMX0.L6OB5nEWFAZuYKV442uVJkV52zNLLqBkJfd8_dXbeSQ'

const form = document.getElementById('product-form')
form.addEventListener('submit', (e) => {
  e.preventDefault()
  // ora recupero i valori dei 4 campi del form e ci faccio un oggetto
  const nameInput = document.getElementById('name')
  const descriptionInput = document.getElementById('description')
  const brandInput = document.getElementById('brand')
  const fotoInput = document.getElementById('foto')
  const priceInput = document.getElementById('price')
  const createdProduct = new Product(
    nameInput.value,
    descriptionInput.value,
    brandInput.value,
    fotoInput.value,
    priceInput.value
  )
  console.log('prodotto creato', createdProduct)

  fetch(myUrl, {
    method: 'POST',
    body: JSON.stringify(createdProduct),
    headers: {
      Authorization: `Bearer ${myKeyAutorization}`,
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (response.ok) {
        console.log(response)
        nameInput.value = ''
        descriptionInput.value = ''
        brandInput.value = ''
        fotoInput.value = ''
        priceInput.value = ''
      } else {
        throw new Error(console.log('NOOOOOOO'))
      }
    })

    .catch((err) => console.log(err))
})

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
      })
    })
    .catch((error) => {
      console.log('ERROR', error)
    })
}

genCards()
