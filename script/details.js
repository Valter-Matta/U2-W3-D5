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

const address = new URLSearchParams(window.location.search)

const productId = address.get('prodottoId') // concertId è il nome del parametro che avevo scelto
console.log('userId', productId)

fetch(myUrl + '/' + productId, {
  method: 'GET',
  headers: {
    Authorization: `Bearer ${myKeyAutorization}`,
  },
})
  .then((response) => {
    if (response.ok) {
      return response.json()
    } else {
      throw new Error(console.log('NOOOOOOO'))
    }
  })
  .then((singoloprodotto) => {
    console.log(singoloprodotto)
    document.querySelector('h1').innerText = singoloprodotto.name
    document.querySelector('h3').innerText = singoloprodotto.price + '$'
    const col = document.getElementById('card-container')
    col.innerHTML = `
           <div class="card h-100 ">
                <img src=${singoloprodotto.imageUrl} class="card-img-top " alt="articolo">
                <div class="card-body d-flex flex-column justify-content-between align-items-center h-50 bg-info-subtle">
                  <h5 class="card-title">${singoloprodotto.name}</h5>
                  <p class="card-text">${singoloprodotto.description}</p>
                 
                </div>
              </div>
        `
    return singoloprodotto
  })
  .then((singoloprodottomodifica) => {
    console.log(singoloprodottomodifica)
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

      fetch(myUrl + '/' + productId, {
        method: 'PUT',
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
            location.reload()
          } else {
            throw new Error(console.log('NOOOOOOO'))
          }
        })

        .catch((err) => console.log(err))
    })
  })
  .catch((err) => console.log(err))
