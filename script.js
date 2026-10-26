const firstDoor = document.querySelector('[data-door="1"]');
const seventhDoor = document.querySelectorAll(".door")[6];
const overlay = document.querySelector("#letter-overlay");
const envelope = document.querySelector("#envelope");
const letter = document.querySelector("#letter");
const closeButton = document.querySelector(".letter-close");
const answerForm = document.querySelector("#answer-form");
const answerInput = document.querySelector("#door-answer");
const answerFeedback = document.querySelector("#answer-feedback");

function openLetter() {
  if (!overlay || !envelope || !letter) return;
  overlay.hidden = false;
  envelope.hidden = false;
  letter.hidden = true;
  envelope.classList.remove("is-opening");
  document.body.style.overflow = "hidden";
  envelope.focus();
}

function revealLetter() {
  if (!envelope || !letter) return;
  envelope.classList.add("is-opening");
  window.setTimeout(() => {
    envelope.hidden = true;
    letter.hidden = false;
    closeButton?.focus();
  }, 350);
}

function closeLetter() {
  if (!overlay) return;
  overlay.hidden = true;
  document.body.style.overflow = "";
  firstDoor?.focus();
}

if (seventhDoor && localStorage.getItem("door-7-unlocked") === "true") {
  seventhDoor.classList.add("is-unlocked");
  seventhDoor.setAttribute("aria-label", "Lucka 7, upplåst");
}

if (firstDoor && overlay && envelope && letter && closeButton) {
  firstDoor.addEventListener("click", openLetter);
  envelope.addEventListener("click", revealLetter);
  closeButton.addEventListener("click", closeLetter);

  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) closeLetter();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !overlay.hidden) closeLetter();
  });
}

if (answerForm && answerInput && answerFeedback) {
  answerForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const answer = Number(answerInput.value);
    answerFeedback.classList.remove("is-correct", "is-wrong");

    if (answer === 7) {
      const correctMessages = [
        "Korrekt!",
        "Rätt!",
        "Bra jobbat!",
        "En lucka närmare jul!",
        "Vem är som du?",
        "Tjusigt!",
        "Snyggt löst!",
        "Strålande!",
        "Precis rätt!",
        "Full pott!",
        "Du knäckte den!",
        "Julmagiskt!"
      ];
      const messageIndex = Math.floor(Math.random() * correctMessages.length);
      answerFeedback.textContent = "Lucka 7 är upplåst! " + correctMessages[messageIndex];
      answerFeedback.classList.add("is-correct");
      window.setTimeout(() => {
        closeLetter();
        if (seventhDoor) {
          seventhDoor.classList.add("is-unlocked");
          seventhDoor.setAttribute("aria-label", "Lucka 7, upplåst");
          localStorage.setItem("door-7-unlocked", "true");
          seventhDoor.focus();
        }
      }, 1000);
    } else {
      answerFeedback.textContent = "Inte riktigt! Läs brevet noggrant och försök igen.";
      answerFeedback.classList.add("is-wrong");
    }
  });
}
