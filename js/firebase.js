document.addEventListener('DOMContentLoaded', () => {
    const storage = firebase.storage();
    const storageRef = storage.ref();
    const imagesContainer = document.getElementById('slideshow-container');
    let currentImageIndex = 0;
    var modal = new bootstrap.Modal(document.getElementById('slideshowModal'));

    // Function to load images or videos from Firebase Storage
    function loadContentFromFirebase(projectName) {
        // Clear previous content
        imagesContainer.innerHTML = '';

        // Get a reference to the images or videos in the storage
        const projectRef = storageRef.child('graphic-portfolio/' + projectName);

        // List all items in the project folder
        projectRef.listAll().then((result) => {
            const contentUrls = [];

            result.items.forEach((itemRef) => {
                // Get the download URL for each item
                itemRef.getDownloadURL().then((url) => {
                    contentUrls.push({ url, type: itemRef.name.endsWith('.mp4') ? 'video' : 'image' });

                    // Load the first content initially
                    if (contentUrls.length === 1) {
                        showContent(contentUrls[0]);
                    }
                });
            });

            // Enable navigation controls after all content is loaded
            enableNavigationControls(contentUrls);
        });
    }

    // Function to show a specific content (image or video)
    function showContent(content) {
        imagesContainer.innerHTML = ''; // Clear previous content

        if (content.type === 'image') {
            const img = document.createElement('img');
            img.src = content.url;
            img.alt = 'Design Preview';
            img.style.maxWidth = '100%';
            img.style.maxHeight = '100%';
            imagesContainer.appendChild(img);
        } else if (content.type === 'video') {
            const video = document.createElement('video');
            video.src = content.url;
            video.type = 'video/mp4';
            video.controls = true;
            video.style.maxWidth = '100%';
            video.style.maxHeight = '100%';
            imagesContainer.appendChild(video);
        }
    }

    // Function to enable navigation controls
    function enableNavigationControls(contentUrls) {
        const nextButton = document.getElementById('nextButton');
        const prevButton = document.getElementById('prevButton');

        nextButton.addEventListener('click', () => {
            currentImageIndex = (currentImageIndex + 1) % contentUrls.length;
            showContent(contentUrls[currentImageIndex]);

            // Enable the previous button after clicking next
            prevButton.disabled = false;
        });

        prevButton.addEventListener('click', () => {
            currentImageIndex = (currentImageIndex - 1 + contentUrls.length) % contentUrls.length;
            showContent(contentUrls[currentImageIndex]);

            // Check if it's the first content to disable the previous button
            if (currentImageIndex === 0) {
                prevButton.disabled = true;
            }
        });

        // Initially disable the previous button if there's only one content
        prevButton.disabled = contentUrls.length <= 1;
    }

    // Example usage when a portfolio item is clicked
    const portfolioItems = document.querySelectorAll('#graphic-portfolio .portfolio-item');

    portfolioItems.forEach((item) => {
        item.addEventListener('click', (event) => {
            // Prevent the default link behavior
            event.preventDefault();

            // Get the project name from the data attribute
            const projectName = item.getAttribute('data-project');

            // Load images or videos from Firebase Storage for the selected project
            loadContentFromFirebase(projectName);

            // Show the slideshow modal using Bootstrap
            $('#slideshowModal').modal('show');
        });

        // Close the modal when the close button is clicked
        document.querySelector('.modal-header .close').addEventListener('click', function () {
            modal.hide();
        });
    });
});