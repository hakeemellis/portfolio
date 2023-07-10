// For Navigation Bar Transparency // 
window.addEventListener('scroll', function() {
  var navbar = document.querySelector('.navbar');
  var heroSection = document.querySelector('.hero');
  
  console.log('Page Y Offset:', window.pageYOffset);
  console.log('Hero Section Offset Top:', heroSection.offsetTop);
  
  if (window.pageYOffset > heroSection.offsetTop) {
    navbar.classList.add('bg-black');
    console.log('Navbar scrolled');
  } else {
    navbar.classList.remove('bg-black');
    console.log('Navbar not scrolled');
  }
});


// For Nav Bar changing color when clicked in Mobile //
var navbar = document.querySelector('.navbar-expand-lg');
var navbarCollapse = document.querySelector('.navbar-collapse');

navbarCollapse.addEventListener('show.bs.collapse', function() {
  navbar.classList.add('bg-black');
  navbar.style.marginTop = '0';
  console.log('Navbar collapse shown');
});

navbarCollapse.addEventListener('hide.bs.collapse', function() {
  if (!navbar.classList.contains('show')) {
    navbar.classList.remove('bg-black');
    navbar.style.marginTop = '0';
    console.log('Navbar collapse hidden');
  }
});
