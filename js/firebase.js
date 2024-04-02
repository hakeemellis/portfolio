document.addEventListener('DOMContentLoaded', () => {
    const storage = firebase.storage();
    const storageRef = storage.ref();
    const imagesContainer = document.getElementById('slideshow-container');
    let currentImageIndex = 0;
    let contentUrls = []; // Array to store image URLs
    var modal = new bootstrap.Modal(document.getElementById('slideshowModal'));


// Function to load images or videos from Firebase Storage
function loadContentFromFirebase(projectName) {
    // Clear previous content
    imagesContainer.innerHTML = '';
    currentImageIndex = 0; // Reset current image index when loading new content

    // Get a reference to the images or videos in the storage
    const projectRef = storageRef.child('graphic-portfolio/' + projectName);

    // List all items in the project folder
    projectRef.listAll().then((result) => {
        contentUrls = []; // Reset content URLs array
        result.items.forEach((itemRef, index) => {
            // Get the download URL for each item
            itemRef.getDownloadURL().then((url) => {
                contentUrls.push({ url, type: getItemType(itemRef) });

                // Load the first content initially
                if (contentUrls.length === 1) {
                    showContent(contentUrls[0]);
                    enableNavigationControls(); // Call the function here
                }
            });
        });
    });
}

    // Function to determine the type of an item (image, video, or PDF)
    function getItemType(itemRef) {
        const itemName = itemRef.name.toLowerCase();
        if (itemName.endsWith('.jpg') || itemName.endsWith('.jpeg') || itemName.endsWith('.png')) {
            return 'image';
        } else if (itemName.endsWith('.mp4')) {
            return 'video';
        } else if (itemName.endsWith('.gif')) {
            return 'gif';
        } else if (itemName.endsWith('.pdf')) {
            return 'pdf';
        } else {
            // Handle other types if needed
            return 'unknown';
        }
    }

    // Function to show a specific content (image, video, or PDF)
    function showContent(content) {
        imagesContainer.innerHTML = ''; // Clear previous content

        if (content.type === 'image' || content.type === 'gif') {
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
        } else if (content.type === 'pdf') {
            // Embed PDF using an embed tag
            const pdfEmbed = document.createElement('embed');
            pdfEmbed.src = content.url;
            pdfEmbed.type = 'application/pdf';
            pdfEmbed.style.width = '100%';
            pdfEmbed.style.height = '100vh'; // Adjust the height as needed
            imagesContainer.appendChild(pdfEmbed);
        }
    }

    // Function to enable navigation controls
    function enableNavigationControls() {
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
            prevButton.disabled = currentImageIndex <= 0;

            // Enable the next button after clicking previous
            nextButton.disabled = false;
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

            // Load images, videos, and PDFs from Firebase Storage for the selected project
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

