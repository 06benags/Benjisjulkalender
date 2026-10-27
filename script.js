const firstDoor = document.querySelector('[data-door="1"]');
const seventhDoor = document.querySelectorAll(".door")[6];
const twentiethDoor = document.querySelectorAll(".door")[19];
const puzzleOverlay = document.querySelector("#puzzle-overlay");
const puzzleClose = document.querySelector("#puzzle-close");
const puzzleAnswerForm = document.querySelector("#puzzle-answer-form");
const puzzleAnswerInput = document.querySelector("#puzzle-answer");
const puzzleFeedback = document.querySelector("#puzzle-feedback");
const overlay = document.querySelector("#letter-overlay");
const envelope = document.querySelector("#envelope");
const letter = document.querySelector("#letter");
const closeButton = document.querySelector(".letter-close");
const answerForm = document.querySelector("#answer-form");
const answerInput = document.querySelector("#door-answer");
const answerFeedback = document.querySelector("#answer-feedback");
const sceneTransition = document.querySelector("#scene-transition");

function openPuzzle() {
  if (!puzzleOverlay) return;
  puzzleOverlay.hidden = false;
  document.body.style.overflow = "hidden";
  puzzleAnswerInput?.focus();
}

function closePuzzle() {
  if (!puzzleOverlay) return;
  puzzleOverlay.hidden = true;
  document.body.style.overflow = "";
  seventhDoor?.focus();
}

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

if (seventhDoor && puzzleOverlay && puzzleClose) {
  seventhDoor.addEventListener("click", openPuzzle);
  puzzleClose.addEventListener("click", closePuzzle);
  puzzleOverlay.addEventListener("click", (event) => {
    if (event.target === puzzleOverlay) closePuzzle();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !puzzleOverlay.hidden) closePuzzle();
  });
}

if (puzzleAnswerForm && puzzleAnswerInput && puzzleFeedback) {
  puzzleAnswerForm.addEventListener("submit", (event) => {
    event.preventDefault();
    puzzleFeedback.classList.remove("is-correct", "is-wrong");

    if (Number(puzzleAnswerInput.value) === 20) {
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
      puzzleFeedback.textContent = "Du hittade rätt present! " + correctMessages[messageIndex];
      puzzleFeedback.classList.add("is-correct");
      puzzleAnswerInput.disabled = true;
      puzzleAnswerForm.querySelector('button[type="submit"]')?.setAttribute("disabled", "disabled");

      window.setTimeout(() => {
        if (!sceneTransition) {
          closePuzzle();
          seventhDoor?.classList.remove("is-unlocked");
          seventhDoor?.setAttribute("aria-label", "Lucka 7");
          twentiethDoor?.classList.add("is-unlocked");
          twentiethDoor?.setAttribute("aria-label", "Lucka 20, markerad");
          twentiethDoor?.focus();
          puzzleAnswerInput.disabled = false;
          puzzleAnswerForm.querySelector('button[type="submit"]')?.removeAttribute("disabled");
          return;
        }

        sceneTransition.hidden = false;
        requestAnimationFrame(() => sceneTransition.classList.add("is-visible"));

        window.setTimeout(() => {
          closePuzzle();
          if (twentiethDoor) {
            seventhDoor?.classList.remove("is-unlocked");
            seventhDoor?.setAttribute("aria-label", "Lucka 7");
            twentiethDoor.classList.add("is-unlocked");
            twentiethDoor.setAttribute("aria-label", "Lucka 20, markerad");
          }

          window.setTimeout(() => {
            sceneTransition.classList.remove("is-visible");
            window.setTimeout(() => {
              sceneTransition.hidden = true;
              twentiethDoor?.focus();
              puzzleAnswerInput.disabled = false;
              puzzleAnswerForm.querySelector('button[type="submit"]')?.removeAttribute("disabled");
            }, 650);
          }, 180);
        }, 650);
      }, 1000);
    } else {
      puzzleFeedback.textContent = "Inte riktigt. Följ snöret från stjärnan hela vägen ner.";
      puzzleFeedback.classList.add("is-wrong");
    }
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
        if (!sceneTransition) {
          closeLetter();
          seventhDoor?.classList.add("is-unlocked");
          seventhDoor?.setAttribute("aria-label", "Lucka 7, upplåst");
          seventhDoor?.focus();
          return;
        }

        sceneTransition.hidden = false;
        requestAnimationFrame(() => sceneTransition.classList.add("is-visible"));

        window.setTimeout(() => {
          closeLetter();
          if (seventhDoor) {
            seventhDoor.classList.add("is-unlocked");
            seventhDoor.setAttribute("aria-label", "Lucka 7, upplåst");
          }

          window.setTimeout(() => {
            sceneTransition.classList.remove("is-visible");
            window.setTimeout(() => {
              sceneTransition.hidden = true;
              seventhDoor?.focus();
            }, 650);
          }, 180);
        }, 650);
      }, 1000);
    } else {
      answerFeedback.textContent = "Inte riktigt! Läs brevet noggrant och försök igen.";
      answerFeedback.classList.add("is-wrong");
    }
  });
}
