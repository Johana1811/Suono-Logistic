document.querySelectorAll(".remove").forEach(button => {
  button.addEventListener("click", () => {
    button.parentElement.remove();
  });
});
