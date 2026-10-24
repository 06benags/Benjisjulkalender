const firstDoor = document.querySelector('[data-door="1"]');
const overlay = document.querySelector("#letter-overlay");
const envelope = document.querySelector("#envelope");
const letter = document.querySelector("#letter");
const closeButton = document.querySelector(".letter-close");

function openLetter() {
  overlay.hidden = false;
  envelope.hidden = false;
  letter.hidden = true;
  envelope.classList.remove("is-opening");
  document.body.style.overflow = "hidden";
  envelope.focus();
}

function revealLetter() {
  if (envelope.classList.contains("is-opening")) return;
  envelope.classList.add("is-opening");
  window.setTimeout(() => {
    envelope.hidden = true;
    letter.hidden = false;
    closeButton.focus();
  }, 780);
}

function closeLetter() {
  overlay.hidden = true;
  envelope.hidden = false;
  letter.hidden = true;
  envelope.classList.remove("is-opening");
  document.body.style.overflow = "";
  firstDoor.focus();
}

firstDoor.addEventListener("click", openLetter);
envelope.addEventListener("click", revealLetter);
closeButton.addEventListener("click", closeLetter);

overlay.addEventListener("click", (event) => {
  if (event.target === overlay) closeLetter();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !overlay.hidden) closeLetter();
});
