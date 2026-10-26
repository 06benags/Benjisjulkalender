const firstDoor = document.querySelector('[data-door="1"]');
const overlay = document.querySelector("#letter-overlay");
const envelope = document.querySelector("#envelope");
const letter = document.querySelector("#letter");
const closeButton = document.querySelector(".letter-close");

function openLetter() {
  resetHints();
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
const hintMessage = document.querySelector("#hint-message");
const answerForm = document.querySelector("#answer-form");
const answerInput = document.querySelector("#door-answer");
const answerFeedback = document.querySelector("#answer-feedback");
let hintStage = 0;

function resetHints() {
  hintStage = 0;
  hintOptions.hidden = true;
  hintMessage.textContent = "";
  hintToggle.textContent = "💡 Visa ledtråd 1";
  hintToggle.disabled = false;
  hintToggle.setAttribute("aria-expanded", "false");
}

hintToggle.addEventListener("click", () => {
  const hints = [
    "Tomtens lilla egenhet kan vara viktigare än själva berättelsen. Fundera på vad som återkommer i texten.",
    "Titta på hur varje mening börjar. Ta vara på något från början av mening efter mening, i den ordning de står.",
    "Så gör ni: läs den allra första bokstaven i varje mening i brevet, uppifrån och ned. Bokstäverna bildar ”NÄSTA LUCKA ÄR SJU”. Rätt svar är alltså lucka 7."
  ];

  hintOptions.hidden = false;
  hintMessage.textContent = hints[hintStage];
  hintStage += 1;
  hintToggle.setAttribute("aria-expanded", "true");

  if (hintStage === 1) {
    hintToggle.textContent = "Visa ledtråd 2";
  } else if (hintStage === 2) {
    hintToggle.textContent = "Visa facit";
  } else {
    hintToggle.textContent = "Facit visat";
    hintToggle.disabled = true;
  }
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
