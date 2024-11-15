const logged = function () {
  document.getElementById('form').addEventListener('submit', (e) => {
    e.preventDefault()
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    console.log(email)
    console.log(password)

    if (email === 'Admin@pcgaming.com' || password === 'Gaming') {
      // console.log('ooo')
      localStorage.setItem('isLoggedIn', 'true')
      const backOffice = document.getElementById('back-office')
      backOffice.classList.remove('d-none')
    } else {
      console.log('perche non va?')
    }
  })

  window.addEventListener('DOMContentLoaded', () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn')

    // Se l'utente è loggato, mostra il back office
    if (isLoggedIn === 'true') {
      const backOffice = document.getElementById('back-office')
      backOffice.classList.remove('d-none')
    }
  })
  
}

logged()