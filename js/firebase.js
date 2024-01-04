document.addEventListener('DOMContentLoaded', () => {
    const storage = firebase.storage();
    const storageRef = storage.ref();
    const imagesContainer = document.getElementById('slideshow-container');
    let currentImageIndex = 0;

    // Function to load images from Firebase Storage
    function loadImagesFromFirebase(projectName) {
        // Clear previous images
        imagesContainer.innerHTML = '';

        // Get a reference to the images in the storage
        const projectRef = storageRef.child('graphic-portfolio/' + projectName);

        // List all images in the project folder
        projectRef.listAll().then((result) => {
            const imageUrls = [];

            result.items.forEach((itemRef) => {
                // Get the download URL for each image
                itemRef.getDownloadURL().then((url) => {
                    imageUrls.push(url);

                    // Load the first image initially
                    if (imageUrls.length === 1) {
                        showImage(imageUrls[0]);
                    }
                });
            });

            // Enable navigation controls after all images are loaded
            enableNavigationControls(imageUrls);
        });
    }

    // Function to show a specific image
    function showImage(imageUrl) {
        imagesContainer.innerHTML = ''; // Clear previous images

        const img = document.createElement('img');
        img.src = imageUrl;
        img.alt = 'Design Preview';

        // Set maximum width and height for each image
        img.style.maxWidth = '100%';
        img.style.maxHeight = '100%';

        imagesContainer.appendChild(img);
    }

        // Function to enable navigation controls
        function enableNavigationControls(imageUrls) {
        const nextButton = document.getElementById('nextButton');
        const prevButton = document.getElementById('prevButton');

        nextButton.addEventListener('click', () => {
            currentImageIndex = (currentImageIndex + 1) % imageUrls.length;
            showImage(imageUrls[currentImageIndex]);

            // Enable the previous button after clicking next
            prevButton.disabled = false;
        });

        prevButton.addEventListener('click', () => {
            currentImageIndex = (currentImageIndex - 1 + imageUrls.length) % imageUrls.length;
            showImage(imageUrls[currentImageIndex]);

            // Check if it's the first image to disable the previous button
            if (currentImageIndex === 0) {
                prevButton.disabled = true;
            }
        });

        // Initially disable the previous button if there's only one image
        prevButton.disabled = imageUrls.length <= 1;
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
        });
    });
});
