const firstDoor = document.querySelector('[data-door="1"]');
const overlay = document.querySelector("#letter-overlay");
const closeButton = document.querySelector(".letter-close");

function openLetter() {
  overlay.hidden = false;
  document.body.style.overflow = "hidden";
  closeButton.focus();
}

function closeLetter() {
  overlay.hidden = true;
  document.body.style.overflow = "";
  firstDoor.focus();
}

firstDoor.addEventListener("click", openLetter);
closeButton.addEventListener("click", closeLetter);

overlay.addEventListener("click", (event) => {
  if (event.target === overlay) closeLetter();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !overlay.hidden) closeLetter();
});