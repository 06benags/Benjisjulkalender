const firstDoor = document.querySelector('[data-door="1"]');
const overlay = document.querySelector("#letter-overlay");
const envelope = document.querySelector("#envelope");
const letter = document.querySelector("#letter");
const closeButton = document.querySelector(".letter-close");
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

if (hintToggle && hintOptions && hintMessage) {
  hintToggle.addEventListener("click", () => {
    const hints = [
      "Om man läst texten noggrant kan man se att orden ’tar sin början’ står i röd text. Vad kan det syfta på? Kanske ska man titta på något i början av varje mening ...",
      "Tänk på vad en mening har allra först. Gör samma sak med mening efter mening och lägg ihop det ni hittar, i rätt ordning.",
      "Så löser ni det: läs första bokstaven i varje mening i brevtexten uppifrån och ned. Bokstäverna bildar orden NÄSTA LUCKA ÄR SJU. Svaret är lucka 7."
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
}

if (answerForm && answerInput && answerFeedback) {
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
}
