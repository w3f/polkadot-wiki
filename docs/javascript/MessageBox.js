document.addEventListener("DOMContentLoaded", () => {
  const messageBox = document.getElementById("messageBox");
  const closeButton = document.querySelector(".close-messagebox");

  // Add event listener to close button
  closeButton.addEventListener("click", () => {
    messageBox.classList.add("hidden");
  });
});

