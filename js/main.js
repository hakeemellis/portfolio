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

var navbar = document.querySelector('.navbar-expand-lg');
var navbarCollapse = document.querySelector('.navbar-collapse');

navbarCollapse.addEventListener('show.bs.collapse', function() {
  navbar.classList.add('bg-black');
});

navbarCollapse.addEventListener('hide.bs.collapse', function() {
  if (!navbar.classList.contains('show')) {
    navbar.classList.remove('bg-black');
  }
});
