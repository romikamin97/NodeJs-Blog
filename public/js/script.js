function handleSearchBar () {
  const searchButton = document.querySelector('.searchBtn')
  const searchBar = document.querySelector('.searchBar')
  const searchInput = document.getElementById('searchInput')
  const searchClose = document.getElementById('searchClose')

  searchButton.addEventListener('click', function () {
    searchBar.style.visibility = 'visible'
    searchBar.classList.add('open')
    this.setAttribute('aria-expanded', 'true')
    searchInput.focus()
  })

  searchClose.addEventListener('click', function () {
    searchBar.style.visibility = 'hidden'
    searchBar.classList.remove('open')
    this.setAttribute('aria-expanded', 'false')
  })
}

function handleForm (formName) {
  const formButton = document.querySelector('.' + formName + 'Btn')
  if (!formButton) {
    return
  }
  const form = document.querySelector('.' + formName + 'Form')
  const usernameInput = document.getElementById(formName + 'Username')
  const cancelButton = document.getElementById(formName + 'CancelBtn')

  formButton.addEventListener('click', function () {
    form.style.visibility = 'visible'
    form.classList.add('open')
    this.setAttribute('aria-expanded', 'true')
    usernameInput.focus()
  })

  cancelButton.addEventListener('click', function () {
    console.log('clicked')
    form.style.visibility = 'hidden'
    form.classList.remove('open')
    usernameInput.value = ''
    this.setAttribute('aria-expanded', 'false')
  })
}

document.addEventListener('DOMContentLoaded', function () {
  handleSearchBar()
  handleForm('signup')
  handleForm('login')
})
