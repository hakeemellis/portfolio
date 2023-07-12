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

// About Me Section Fade-In JS

window.addEventListener('scroll', function() {
  var aboutSection = document.querySelector('.about-me-section');
  var sectionTop = aboutSection.offsetTop;
  var sectionHeight = aboutSection.offsetHeight;
  var windowTop = window.pageYOffset;
  var windowHeight = window.innerHeight;

  if (windowTop > sectionTop - windowHeight + sectionHeight / 2 && windowTop < sectionTop + sectionHeight) {
    aboutSection.classList.add('fade-in');
  } else {
    aboutSection.classList.remove('fade-in');
  }
});


// Portfolio Live Snippet Filter Code

var filterButtons = document.querySelectorAll('.filter-button');
var portfolioItems = document.querySelectorAll('.portfolio-item');

// Set "All" filter as active by default
filterButtons[0].classList.add('active');

filterButtons.forEach(function (button) {
  button.addEventListener('click', function () {
    var filter = button.getAttribute('data-filter');

    // Remove active class from all buttons
    filterButtons.forEach(function (btn) {
      btn.classList.remove('active');
    });

    // Add active class to clicked button
    button.classList.add('active');

    // Filter portfolio items based on data-filter attribute
    portfolioItems.forEach(function (item) {
      if (filter === 'all' || item.classList.contains(filter)) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  });
});

// Show all portfolio items by default
portfolioItems.forEach(function (item) {
  item.style.display = 'block';
});

// Follow Up to that Code Above

var filterButtons = document.querySelectorAll('.filter-button');
var portfolioItems = document.querySelectorAll('.portfolio-item');
var moreButton = document.getElementById('moreButton');

// Set "All" filter as active by default
filterButtons[0].classList.add('active');

// Show initial 4 items
for (var i = 0; i < 4; i++) {
  portfolioItems[i].classList.add('show');
}

// More button click event
moreButton.addEventListener('click', function () {
  var hiddenItems = document.querySelectorAll('.portfolio-item:not(.show)');

  // Show hidden items
  hiddenItems.forEach(function (item, index) {
    if (index < 4) {
      item.classList.add('show');
    }
  });

  // Hide more button if no more items
  if (document.querySelectorAll('.portfolio-item:not(.show)').length === 0) {
    moreButton.style.display = 'none';
  }
});




// FOR MOBILE ONLY //

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


// Rotating Navbar for Mobile //
var navbarToggler = document.querySelector('.navbar-toggler');
var navbarTogglerIcon = document.querySelector('.navbar-toggler-icon');

navbarToggler.addEventListener('click', function() {
  navbarToggler.classList.toggle('active');
  if (navbarToggler.classList.contains('active')) {
    navbarTogglerIcon.style.transition = 'transform 0.3s';
    navbarTogglerIcon.style.transform = 'rotate(90deg)';
    navbarTogglerIcon.style.borderWidth = '4px';
  } else {
    navbarTogglerIcon.style.transition = 'transform 0.3s';
    navbarTogglerIcon.style.transform = 'rotate(0deg)';
    navbarTogglerIcon.style.borderWidth = '3px';
  }
});
