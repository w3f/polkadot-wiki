document.addEventListener("DOMContentLoaded", () => {
  const messageBox = document.getElementById("messageBox");
  const closeButton = document.querySelector(".close-messagebox");

  if (messageBox && closeButton) {
    closeButton.addEventListener("click", (event) => {
      event.stopPropagation();
      messageBox.classList.add("hidden");
    });
  }
});
