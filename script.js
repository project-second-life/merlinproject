document.addEventListener('DOMContentLoaded', () => {
    const images = [
        "assets/Image1.jpg",
        "assets/Image2.jpg",
        "assets/image3.jpg",
        "assets/image4.jpg"
    ];

    let currentIndex = 0;

    const imageContainer = document.getElementById('image-container');
    const imageElement = document.getElementById('mystery-image');
    const instructions = document.querySelector('.instructions');
    const modal = document.getElementById('proposal-modal');
    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');
    const successOverlay = document.getElementById('success-overlay');

    // Preload images
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });

    imageContainer.addEventListener('click', () => {
        if (currentIndex < images.length - 1) {
            // Transition to next image
            currentIndex++;

            // Add fade-out class
            imageElement.classList.add('image-transitioning');

            setTimeout(() => {
                imageElement.src = images[currentIndex];

                // Remove fade-out after source is changed to trigger fade-in
                setTimeout(() => {
                    imageElement.classList.remove('image-transitioning');
                }, 50);
            }, 400); // Wait for fade out animation

            // Change instructions text randomly or keep it mysterious
            if (currentIndex === images.length - 1) {
                instructions.style.opacity = 0; // Hide instructions on last step
            }

        } else if (currentIndex === images.length - 1) {
            // Final click on the last image, show modal
            showModal();
        }
    });

    function showModal() {
        modal.classList.remove('hidden');
    }

    // "Yes" button interaction
    yesBtn.addEventListener('click', () => {
        modal.classList.add('hidden');
        setTimeout(() => {
            successOverlay.classList.remove('hidden');
        }, 500);
    });

    // "No" button evasion interaction
    const evadeButton = () => {
        const containerRect = modal.querySelector('.glass-effect').getBoundingClientRect();
        const btnRect = noBtn.getBoundingClientRect();

        // Calculate random position within the container bounds
        const maxX = containerRect.width - btnRect.width - 40; // padding
        const maxY = 60; // relative to its container height

        const randomX = Math.floor(Math.random() * (maxX + 40)) - 40; // Allow moving left/right
        const randomY = Math.floor(Math.random() * 100) - 50; // Allow moving up/down

        // Switch to absolute positioning for moving
        noBtn.style.position = 'absolute';
        noBtn.style.left = `${Math.max(0, btnRect.left - containerRect.left + randomX)}px`;
        noBtn.style.top = `${Math.random() > 0.5 ? -40 : 40}px`;
    };

    noBtn.addEventListener('mouseover', evadeButton);
    noBtn.addEventListener('touchstart', (e) => {
        e.preventDefault(); // Prevent accidental tap
        evadeButton();
    }, { passive: false });
});
