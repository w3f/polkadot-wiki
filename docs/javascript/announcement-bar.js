document.addEventListener("DOMContentLoaded", () => {
    const bar = document.getElementById("announcement-bar");
    const header = document.querySelector(".md-header");
    const closeButton = document.getElementById("announcement-close");

    if (bar && closeButton) {
        const barHeight = bar.offsetHeight;

        // Initially set the header offset
        header.style.top = `${barHeight}px`;
        document.body.style.marginTop = `${barHeight}px`;

        // Handle bar dismissal
        closeButton.addEventListener("click", () => {
            bar.style.display = "none";

            // Remove the header offset and reset body margin
            header.style.top = "0";
            document.body.style.marginTop = "0";
        });
    }
});

