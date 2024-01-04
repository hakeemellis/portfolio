document.addEventListener('DOMContentLoaded', () => {

const storage = firebase.storage();
const storageRef = storage.ref();

// Function to load images from Firebase Storage
function loadImagesFromFirebase(projectName) {
    const imagesContainer = document.getElementById('slideshow-container');

    // Clear previous images
    imagesContainer.innerHTML = '';

    // Get a reference to the images in the storage
    const projectRef = storageRef.child('graphic-portfolio/' + projectName);

    // List all images in the project folder
    projectRef.listAll().then((result) => {
        result.items.forEach((itemRef) => {
            // Get the download URL for each image
            itemRef.getDownloadURL().then((url) => {
                // Create an image element and add it to the slideshow container
                const img = document.createElement('img');
                img.src = url;
                img.alt = 'Design Preview';
                imagesContainer.appendChild(img);

                // Set maximum width and height for each image
                img.style.maxWidth = '100%';
                img.style.maxHeight = '100%';

                imagesContainer.appendChild(img);
            });
        });
    });
}

// Example usage when a portfolio item is clicked
const portfolioItems = document.querySelectorAll('.portfolio-item');

portfolioItems.forEach((item) => {
    item.addEventListener('click', (event) => {
        // Prevent the default link behavior
        event.preventDefault();

        // Get the project name from the data attribute
        const projectName = item.getAttribute('data-project');

        // Load images from Firebase Storage for the selected project
        loadImagesFromFirebase(projectName);

        // Show the slideshow modal using Bootstrap
        $('#slideshowModal').modal('show');

        // Add an alert to check if the click event is triggered
        alert('Portfolio item clicked!');
    });

});

});
