document.addEventListener("DOMContentLoaded", function () {
    const overlay = document.querySelector('.cookie-overlay-on');
    const cookieBanner = document.querySelector('.cookie-permission-container');

    if (!overlay || !cookieBanner) {
        console.log("Overlay or cookie banner not found.");
        return;
    }

    // Function to check if the banner is hidden (for both inline styles and CSS styles)
    function isBannerHidden() {
        const inlineDisplay = cookieBanner.style.display; // Checks inline style
        const computedDisplay = window.getComputedStyle(cookieBanner).display; // Checks CSS-applied style

        return inlineDisplay === 'none' || computedDisplay === 'none';
    }

    // Function to show the overlay with a delay
    function showOverlayWithDelay() {
        setTimeout(() => {
            overlay.classList.add('visible');
            console.log("Overlay is now visible after delay.");
        }, 500); // Delay of 500ms (adjust as needed)
    }

    // Function to hide the overlay if the cookie banner is hidden
    function checkAndHideOverlay() {
        if (isBannerHidden()) {
            overlay.style.display = 'none';
            console.log("Overlay hidden because cookie banner is hidden.");
        } else {
            overlay.style.display = ''; // Reset to default if needed
            showOverlayWithDelay(); // Delay before showing
        }
    }

    // Run the check on page load
    checkAndHideOverlay();

    // Observe changes in the cookie banner’s style (for real-time updates)
    const observer = new MutationObserver(checkAndHideOverlay);
    observer.observe(cookieBanner, { attributes: true, attributeFilter: ['style', 'class'] });

    console.log("Mutation observer set up for cookie banner.");
});
