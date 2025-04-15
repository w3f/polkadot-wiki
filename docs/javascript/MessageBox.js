document.addEventListener("click", () => {
  const messageBox = document.getElementById("messageBox");
  const closeButton = document.querySelector(".close-messagebox");
  if (closeButton !== null) {
    closeButton.addEventListener("click", () => {
      messageBox.classList.add("hidden");
    });
  }
});
