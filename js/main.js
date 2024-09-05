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

// Hide the loading screen after a timeout
setTimeout(function() {
  loadingScreen.style.display = 'none';
}, 5000);


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
var webMoreButton = document.getElementById('moreButton'); // Change the ID here
var webInitialVisibleItems = 4; // Number of initial visible items


// Shuffle function to randomize array order
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Shuffle the graphic portfolio items array
webPortfolioItems = shuffleArray(Array.from(webPortfolioItems));

webFilterButtons[0].classList.add('active');

showWebItems('all', webInitialVisibleItems); // Show initial items for 'all' filter

webFilterButtons.forEach(function (button) {
  button.addEventListener('click', function () {
    var filter = button.getAttribute('data-filter');

    webFilterButtons.forEach(function (btn) {
      btn.classList.remove('active');
    });

    button.classList.add('active');
    activeFilter = filter; // Update activeFilter

    showWebItems(filter, webInitialVisibleItems);

    webMoreButton.style.display = 'block';
  });
});

function showWebItems(filter, visibleItemCount) {
  webPortfolioItems.forEach(function (item, index) {
    var itemFilterClasses = Array.from(item.classList).filter(className => className !== 'portfolio-item');

    var meetsFilterCriteria = filter === 'all' || itemFilterClasses.includes(filter);

    if (meetsFilterCriteria && (index < visibleItemCount || filter !== 'all')) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });

  // Reset the 'show' class for proper 'more' button behavior
  var allWebItems = document.querySelectorAll('#portfolio .portfolio-item'); // Change the ID here
  allWebItems.forEach(function (item) {
    item.classList.remove('show');
  });
}

webMoreButton.addEventListener('click', function () {
  var hiddenWebItems = document.querySelectorAll('#portfolio .portfolio-item:not(.show)'); // Change the ID here

  hiddenWebItems.forEach(function (item, index) {
    var itemClasses = Array.from(item.classList);

    // Exclude 'portfolio-item' from the itemClasses array
    var filteredClasses = itemClasses.filter(className => className !== 'portfolio-item');

    // Specify the classes you want to filter by
    var filterClasses = ['static', 'api', 'database']; // Add more classes as needed

    // Check if the item belongs to the current filter
    var belongsToFilter = activeFilter === 'all' || filterClasses.includes(activeFilter);

    // Check if any of the filter classes are present in filteredClasses
    var meetsFilterCriteria = belongsToFilter && (activeFilter === 'all' || filteredClasses.includes(activeFilter));

    if (meetsFilterCriteria) {
      item.classList.add('show');
      item.style.display = 'block';
    } else {
      item.style.display = 'none'; // Hide items not belonging to the current filter
    }
  });

  webMoreButton.style.display = 'none'; // Hide the "More" button after revealing all items
});



// UI/UX Portfolio Live Snippet Filter Code //
var uiuxFilterButtons = document.querySelectorAll('#uiux-portfolio .filter-button');
var uiuxPortfolioItems = document.querySelectorAll('#uiux-portfolio .portfolio-item');
var uiuxMoreButton = document.getElementById('moreButton'); // Change the ID here
var uiuxInitialVisibleItems = 4; // Number of initial visible items

// Shuffle function to randomize array order
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Shuffle the UI/UX portfolio items array
uiuxPortfolioItems = shuffleArray(Array.from(uiuxPortfolioItems));

uiuxFilterButtons[0].classList.add('active');

showUIUXItems('all', uiuxInitialVisibleItems); // Show initial items for 'all' filter

uiuxFilterButtons.forEach(function (button) {
  button.addEventListener('click', function () {
    var filter = button.getAttribute('data-filter');

    uiuxFilterButtons.forEach(function (btn) {
      btn.classList.remove('active');
    });

    button.classList.add('active');
    activeFilter = filter; // Update activeFilter

    showUIUXItems(filter, uiuxInitialVisibleItems);

    uiuxMoreButton.style.display = 'block';
  });
});

function showUIUXItems(filter, visibleItemCount) {
  uiuxPortfolioItems.forEach(function (item, index) {
    var itemFilterClasses = Array.from(item.classList).filter(className => className !== 'portfolio-item');

    var meetsFilterCriteria = filter === 'all' || itemFilterClasses.includes(filter);

    if (meetsFilterCriteria && (index < visibleItemCount || filter !== 'all')) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });

  // Reset the 'show' class for proper 'more' button behavior
  var allUIUXItems = document.querySelectorAll('#uiux-portfolio .portfolio-item'); // Change the ID here
  allUIUXItems.forEach(function (item) {
    item.classList.remove('show');
  });
}

uiuxMoreButton.addEventListener('click', function () {
  var hiddenUIUXItems = document.querySelectorAll('#uiux-portfolio .portfolio-item:not(.show)'); // Change the ID here

  hiddenUIUXItems.forEach(function (item, index) {
    var itemClasses = Array.from(item.classList);

    // Exclude 'portfolio-item' from the itemClasses array
    var filteredClasses = itemClasses.filter(className => className !== 'portfolio-item');

    // Specify the classes you want to filter by
    var filterClasses = ['wireframe', 'prototype', 'usertesting', 'research', 'visualdesign']; // Add more classes as needed

    // Check if the item belongs to the current filter
    var belongsToFilter = activeFilter === 'all' || filterClasses.includes(activeFilter);

    // Check if any of the filter classes are present in filteredClasses
    var meetsFilterCriteria = belongsToFilter && (activeFilter === 'all' || filteredClasses.includes(activeFilter));

    if (meetsFilterCriteria) {
      item.classList.add('show');
      item.style.display = 'block';
    } else {
      item.style.display = 'none'; // Hide items not belonging to the current filter
    }
  });

  uiuxMoreButton.style.display = 'none'; // Hide the "More" button after revealing all items
});
  


// Graphic Design Portfolio Live Snippet Filter Code //
var graphicFilterButtons = document.querySelectorAll('#graphic-portfolio .filter-button');
var graphicPortfolioItems = document.querySelectorAll('#graphic-portfolio .portfolio-item');
var graphicMoreButton = document.getElementById('graphicMoreButton');
var graphicInitialVisibleItems = 4; // Number of initial visible items
var activeFilter = 'all';


// Shuffle function to randomize array order
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Shuffle the graphic portfolio items array
graphicPortfolioItems = shuffleArray(Array.from(graphicPortfolioItems));


graphicFilterButtons[0].classList.add('active');

showGraphicItems('all', graphicInitialVisibleItems); // Show initial items for 'all' filter


graphicFilterButtons.forEach(function (button) {
  button.addEventListener('click', function () {
    var filter = button.getAttribute('data-filter');

    graphicFilterButtons.forEach(function (btn) {
      btn.classList.remove('active');
    });

    button.classList.add('active');
    activeFilter = filter; // Update activeFilter

    showGraphicItems(filter, graphicInitialVisibleItems);

    graphicMoreButton.style.display = 'block';
  });
});


function showGraphicItems(filter, visibleItemCount) {
  graphicPortfolioItems.forEach(function (item, index) {
    var itemFilterClasses = Array.from(item.classList).filter(className => className !== 'portfolio-item');

    var meetsFilterCriteria = filter === 'all' || itemFilterClasses.includes(filter);

    if (meetsFilterCriteria && (index < visibleItemCount || filter !== 'all')) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });

  // Reset the 'show' class for proper 'more' button behavior
  var allGraphicItems = document.querySelectorAll('#graphic-portfolio .portfolio-item');
  allGraphicItems.forEach(function (item) {
    item.classList.remove('show');
  });
}



graphicMoreButton.addEventListener('click', function () {
  var hiddenGraphicItems = document.querySelectorAll('#graphic-portfolio .portfolio-item:not(.show)');

  hiddenGraphicItems.forEach(function (item, index) {
    var itemClasses = Array.from(item.classList);

    // Exclude 'portfolio-item' from the itemClasses array
    var filteredClasses = itemClasses.filter(className => className !== 'portfolio-item');

    // Specify the classes you want to filter by
    var filterClasses = ['digital', 'print', 'logo', 'wireframe', 'videography']; // Add more classes as needed

    // Check if the item belongs to the current filter
    var belongsToFilter = activeFilter === 'all' || filterClasses.includes(activeFilter);

    // Check if any of the filter classes are present in filteredClasses
    var meetsFilterCriteria = belongsToFilter && (activeFilter === 'all' || filteredClasses.includes(activeFilter));

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
  Copyright (c) 2024 Hakeem Ellis
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
  Copyright (c) 2024 Hakeem Ellis
  All rights reserved.

  This work is licensed under the terms of the Custom Code license.
  For a copy, see https://github.com/hakeemellis/portfolio/blob/main/LICENSE.md.

  Contact: utilize the contact form at https://hakeemellis.com/
  `);

});
