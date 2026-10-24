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


const hintToggle = document.querySelector("#hint-toggle");
const hintOptions = document.querySelector("#hint-options");
const answerForm = document.querySelector("#answer-form");
const answerInput = document.querySelector("#door-answer");
const answerFeedback = document.querySelector("#answer-feedback");

hintToggle.addEventListener("click", () => {
  const isExpanded = hintToggle.getAttribute("aria-expanded") === "true";
  hintToggle.setAttribute("aria-expanded", String(!isExpanded));
  hintOptions.hidden = isExpanded;
});

document.querySelectorAll("[data-hint]").forEach((button) => {
  button.addEventListener("click", () => {
    const hint = document.querySelector("#" + button.dataset.hint);
    hint.hidden = !hint.hidden;
    button.setAttribute("aria-expanded", String(!hint.hidden));
  });
});

answerForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const answer = Number(answerInput.value);
  answerFeedback.classList.remove("is-correct", "is-wrong");

  if (answer === 7) {
    answerFeedback.textContent = "Rätt svar! Imorgon ska ni öppna lucka 7. 🎄";
    answerFeedback.classList.add("is-correct");
  } else {
    answerFeedback.textContent = "Inte riktigt! Läs brevet noggrant och försök igen.";
    answerFeedback.classList.add("is-wrong");
  }
});
