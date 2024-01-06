document.addEventListener('DOMContentLoaded', function() {


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
  

  // Hide the loading screen
  var loadingScreen = document.querySelector('.loading-screen');
  var video = document.getElementById('bgVideo');

  // Add event listener to the video element
  video.addEventListener('loadeddata', function() {
    loadingScreen.style.display = 'none';
    
    // Hero Banner Welcome Typing
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
  });


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


// To Swap Hero Banner Video for Static Wallpaper IF //
// Video fails to Autoplay//

var video = document.getElementById("bgVideo");

    // Check if autoplay is supported
    var autoplaySupported = ("autoplay" in video) || (typeof video.webkitPlaysinline !== "undefined");

    if (!autoplaySupported) {
      // Hide the video element
      video.style.display = "none";

      // Set a static background image
      var heroBanner = document.getElementById("home");
      heroBanner.style.backgroundImage = "url('/images/Projects/ab1.jpg')";
      heroBanner.style.backgroundSize = "cover";
      heroBanner.style.backgroundPosition = "center";
      heroBanner.style.opacity = "0.95";
    }


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


// Web Design Portfolio Live Snippet Filter Code //
var webFilterButtons = document.querySelectorAll('#portfolio .filter-button');
var webPortfolioItems = document.querySelectorAll('#portfolio .portfolio-item');
var webMoreButton = document.getElementById('moreButton'); // Corrected the ID
var webInitialVisibleItems = 4; // Number of initial visible items

webFilterButtons[0].classList.add('active');

showWebItems('all', webInitialVisibleItems);

webFilterButtons.forEach(function (button) {
  button.addEventListener('click', function () {
    var filter = button.getAttribute('data-filter');

    webFilterButtons.forEach(function (btn) {
      btn.classList.remove('active');
    });

    button.classList.add('active');

    showWebItems(filter, webInitialVisibleItems);

    webMoreButton.style.display = 'block';
  });
});

function showWebItems(filter, visibleItemCount) {
  webPortfolioItems.forEach(function (item, index) {
    if (filter === 'all' || item.classList.contains(filter)) {
      item.style.display = index < visibleItemCount ? 'block' : 'none';
    } else {
      item.style.display = 'none';
    }
  });
}

webMoreButton.addEventListener('click', function () {
  var hiddenWebItems = document.querySelectorAll('#portfolio .portfolio-item:not(.show)');

  hiddenWebItems.forEach(function (item, index) {
    if (index < webInitialVisibleItems) {
      item.classList.add('show');
      item.style.display = 'block';
    }
  });

  if (document.querySelectorAll('#portfolio .portfolio-item:not(.show)').length === 0) {
    webMoreButton.style.display = 'none';
  }
});


// Graphic Design Portfolio Live Snippet Filter Code //
var graphicFilterButtons = document.querySelectorAll('#graphic-portfolio .filter-button');
var graphicPortfolioItems = document.querySelectorAll('#graphic-portfolio .portfolio-item');
var graphicMoreButton = document.getElementById('graphicMoreButton');
var graphicInitialVisibleItems = 4; // Number of initial visible items
var activeFilter = 'all';


graphicFilterButtons[0].classList.add('active');

showGraphicItems('all', graphicInitialVisibleItems); // Show initial items for 'all' filter


graphicFilterButtons.forEach(function (button) {
  button.addEventListener('click', function () {
    var filter = button.getAttribute('data-filter');

    graphicFilterButtons.forEach(function (btn) {
      btn.classList.remove('active');
    });

    button.classList.add('active');

    showGraphicItems(filter, graphicInitialVisibleItems);

    graphicMoreButton.style.display = 'block';
  });
});

function showGraphicItems(filter, visibleItemCount) {
  graphicPortfolioItems.forEach(function (item, index) {
    var meetsFilterCriteria = filter === 'all' || item.classList.contains(filter);

    if (meetsFilterCriteria && (index < visibleItemCount || filter !== 'all')) {
      // Show the item if it meets filter criteria and is within the visible count,
      // or if the filter is not 'all', meaning it should always be visible for a specific filter.
      item.style.display = 'block';
    } else {
      // Hide the item if it doesn't meet filter criteria or is beyond the visible count.
      item.style.display = 'none';
    }
  });
}


graphicMoreButton.addEventListener('click', function () {
  var hiddenGraphicItems = document.querySelectorAll('#graphic-portfolio .portfolio-item:not(.show)');

  hiddenGraphicItems.forEach(function (item, index) {
    var itemClasses = Array.from(item.classList);

    // Exclude 'portfolio-item' from the itemClasses array
    var filteredClasses = itemClasses.filter(className => className !== 'portfolio-item');

    // Specify the classes you want to filter by
    var filterClasses = ['digital', 'print', 'logo']; // Add more classes as needed
    console.log(filterClasses)
    
    // Check if any of the filter classes are present in filteredClasses
    var meetsFilterCriteria = activeFilter === 'all' || filterClasses.some(filterClass => filteredClasses.includes(filterClass));
    

    if (meetsFilterCriteria) {
      item.classList.add('show');
      item.style.display = 'block';
      
    } else {
      item.style.display = 'none'; // Hide items not belonging to the current filter
    }
  });

  graphicMoreButton.style.display = 'none'; // Hide the "More" button after revealing all items
});




// Contact Form Submission //

const form = document.getElementById('contactForm');

// submit event listener
form.addEventListener('submit', async (event) => {
  event.preventDefault(); // Prevent the default form submission

  // using fetch method to get data
  try {
    const response = await fetch(form.action, {
      method: form.method,
      headers: {
        'Accept': 'application/json',
      },
      body: new FormData(form),
    });

    // Check if the response status is OK (200)
    if (response.ok) {
      // Clear the form after successful submission
      form.reset();
      // Show success alert
      alert('Form submitted successfully!');
    } else {
      // Handle error response
      alert('An error occurred. Please try again.');
    }
  } catch (error) {
    // Handle fetch error
    alert('An error occurred. Please try again.');
  }
});
  
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get('success') === 'true') {
  alert('Information submitted successfully! Will respond within one business day :)');
}

// Copyright Notice //
  console.log(`
  Copyright (c) 2023 Hakeem Ellis
  All rights reserved.

  This work is licensed under the terms of the Custom Code license.
  For a copy, see https://github.com/hakeemellis/portfolio/blob/main/LICENSE.md.

  Contact: utilize the contact form at https://hakeemellis.com/
  `);

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


// Play Button for Hero Bar in Mobile //
var video = document.getElementById('bgVideo');
var playOverlay = document.getElementById('playOverlay');

var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

if (isMobile) {
  video.play().then(function () {
    // Autoplay successful
    playOverlay.style.display = 'none';
  }).catch(function (error) {
    // Autoplay failed
    console.error('Autoplay failed:', error);
    playOverlay.style.display = 'block';
  });

  // Add click event for the play button
  document.getElementById('startButton').addEventListener('click', function () {
    video.play();
    playOverlay.style.display = 'none';
  });
} else {
  // Not on mobile, hide play button overlay
  playOverlay.style.display = 'none';
}



  // Copyright Notice //
  console.log(`
  Copyright (c) 2023 Hakeem Ellis
  All rights reserved.

  This work is licensed under the terms of the Custom Code license.
  For a copy, see https://github.com/hakeemellis/portfolio/blob/main/LICENSE.md.

  Contact: utilize the contact form at https://hakeemellis.com/
  `);

});
