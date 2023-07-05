// For Navigation Bar Transparency // 

  window.addEventListener('scroll', function() {
    var navbar = document.querySelector('.navbar');
    var heroSection = document.querySelector('.hero-section');
    
    if (window.scrollY > heroSection.offsetHeight) {
      navbar.classList.add('bg-black');
    } else {
      navbar.classList.remove('bg-black');
    }
  });

// For Nav Bar changing color when click in Mobile //

var navbar = document.querySelector('.navbar');

document.querySelector('.navbar-toggler').addEventListener('click', function() {
  if (navbar.classList.contains('bg-black')) {
    navbar.classList.remove('bg-black');
  } else {
    navbar.classList.add('bg-black');
  }
});
