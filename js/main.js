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
