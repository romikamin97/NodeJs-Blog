function handleSearchBar() {
  const searchButton = document.querySelector('.searchBtn');
  const searchBar = document.querySelector('.searchBar');
  const searchInput = document.getElementById('searchInput');
  const searchClose = document.getElementById('searchClose');

  searchButton.addEventListener('click', function () {
    searchBar.style.visibility = 'visible';
    searchBar.classList.add('open');
    this.setAttribute('aria-expanded', 'true');
    searchInput.focus();
  });


  searchClose.addEventListener('click', function () {
    searchBar.style.visibility = 'hidden';
    searchBar.classList.remove('open');
    this.setAttribute('aria-expanded', 'false');
  });
}

function handleSignupForm() {
  const signupButton = document.querySelector('.signupBtn');
  const signupForm = document.querySelector('.signupForm');
  const usernameInput = document.getElementById('username');
  const signupCancel = document.getElementById('cancelBtn');

  signupButton.addEventListener('click', function () {
    signupForm.style.visibility = 'visible';
    signupForm.classList.add('open');
    this.setAttribute('aria-expanded', 'true');
    usernameInput.focus();
  });

  signupCancel.addEventListener('click', function () {
    console.log("clicked")
    signupForm.style.visibility = 'hidden';
    signupForm.classList.remove('open');
    usernameInput.value = "";
    this.setAttribute('aria-expanded', 'false');
  });
}

document.addEventListener('DOMContentLoaded', function () {
  handleSearchBar()
  handleSignupForm()
});

