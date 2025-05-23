document$.subscribe(() => {
  const messageBox = document.getElementById("messageBox");
  const closeButton = document.querySelector(".close-messagebox");

  if (messageBox && closeButton) {
    closeButton.addEventListener("click", () => {
      messageBox.classList.add("hidden");
    });
  }
});