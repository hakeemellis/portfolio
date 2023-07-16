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


// For NavBar Section to Change Automatically pending where you are //
// eg. Scrolling through About Me //

  // Add smooth scrolling to all links
  var links = document.querySelectorAll("a");

  links.forEach(function(link) {
    link.addEventListener("click", function(event) {
      // Make sure this.hash has a value before overriding default behavior
      if (this.hash !== "") {
        // Prevent default anchor click behavior
        event.preventDefault();

        // Store hash
        var hash = this.hash;

        // Using the scrollIntoView method to scroll smoothly to the specified section
        document.querySelector(hash).scrollIntoView({
          behavior: "smooth"
        });
      }
    });
  });

  // Add active class to navbar item based on scroll position
  window.addEventListener("scroll", function() {
    var scrollDistance = window.pageYOffset;

    // Assign active class to navbar items based on scroll position
    var sections = document.querySelectorAll(".page-section");

    sections.forEach(function(section) {
      var sectionTop = section.offsetTop;
      var sectionHeight = section.offsetHeight;
      if (scrollDistance >= sectionTop && scrollDistance < sectionTop + sectionHeight) {
        // Remove active class from all navbar items
        document.querySelectorAll(".navbar-nav a").forEach(function(navItem) {
          navItem.classList.remove("active");
        });

        // Get the corresponding navbar item and add active class
        var targetLink = document.querySelector('a[href="#' + section.id + '"]');
        targetLink.classList.add("active");
      }
    });
  });


// Hero Banner Welcome Typing //

var typingElements = document.querySelectorAll('.typing-effect');
var viewportHeight = window.innerHeight || document.documentElement.clientHeight;

typingElements.forEach(function(element) {
  var position = element.getBoundingClientRect().top;

  if (position < viewportHeight) {
    element.classList.add('start-typing');
  } else {
    element.classList.remove('start-typing');
  }
});

window.dispatchEvent(new Event('scroll'));


// Super Mario JS Activation within Hero Banner //

var button = document.querySelector('.mario-button');

button.addEventListener('click', function() {
  button.classList.add('start-animation');
});

// To Change Super Mario Button depending on Device Screen Size //

window.addEventListener('resize', function() {
  var startButton = document.getElementById('startButton');
  if (window.innerWidth < 1024) {
    startButton.classList.remove('btn-lg');
    startButton.classList.add('btn-sm');
  } else {
    startButton.classList.remove('btn-sm');
    startButton.classList.add('btn-lg');
  }
});


// About Me Section Fade-In JS //

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


// Portfolio Live Snippet Filter Code //

var filterButtons = document.querySelectorAll('.filter-button');
var portfolioItems = document.querySelectorAll('.portfolio-item');
var moreButton = document.getElementById('moreButton');
var initialVisibleItems = 4; // Number of initial visible items

// To set "All" filter option as active by default
filterButtons[0].classList.add('active');

// Show initial set of items
showItems('all', initialVisibleItems);

// Filter change
filterButtons.forEach(function (button) {
  button.addEventListener('click', function () {
    var filter = button.getAttribute('data-filter');

    // Remove active class from all buttons
    filterButtons.forEach(function (btn) {
      btn.classList.remove('active');
    });

    // Add active class to clicked button
    button.classList.add('active');

    // Show items based on the filter
    showItems(filter, initialVisibleItems);

    // Show initial set of hidden items when filter changes
    moreButton.style.display = 'block';
  });
});

// Function to show/hide items based on filter
function showItems(filter, visibleItemCount) {
  portfolioItems.forEach(function (item, index) {
    if (filter === 'all' || item.classList.contains(filter)) {
      item.style.display = index < visibleItemCount ? 'block' : 'none';
    } else {
      item.style.display = 'none';
    }
  });
}

// More button click event
moreButton.addEventListener('click', function () {
  var hiddenItems = document.querySelectorAll('.portfolio-item:not(.show)');

  // Show hidden items
  hiddenItems.forEach(function (item, index) {
    if (index < initialVisibleItems) {
      item.classList.add('show');
      item.style.display = 'block';
    }
  });

  // Hide more button if no more items
  if (document.querySelectorAll('.portfolio-item:not(.show)').length === 0) {
    moreButton.style.display = 'none';
  }
});

// End of the extension code //



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
