document.addEventListener("DOMContentLoaded", () => {
  const messageBox = document.getElementById("messageBox");
  const closeButton = document.querySelector(".close-messagebox");

  if (closeButton !== null && messageBox !== null) {
    closeButton.addEventListener("click", () => {
      messageBox.classList.add("hidden");
    });
  }
});
