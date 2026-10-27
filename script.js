const firstDoor = document.querySelector('[data-door="1"]');
const seventhDoor = document.querySelectorAll(".door")[6];
const twentiethDoor = document.querySelectorAll(".door")[19];
const puzzleOverlay = document.querySelector("#puzzle-overlay");
const puzzleEnvelope = document.querySelector("#puzzle-envelope");
const puzzleLetter = document.querySelector("#puzzle-letter");
const puzzleClose = document.querySelector("#puzzle-close");
const puzzleAnswerForm = document.querySelector("#puzzle-answer-form");
const puzzleAnswerInput = document.querySelector("#puzzle-answer");
const puzzleFeedback = document.querySelector("#puzzle-feedback");
const overlay = document.querySelector("#letter-overlay");
const envelope = document.querySelector("#envelope");
const letter = document.querySelector("#letter");
const closeButton = document.querySelector("#letter .letter-close");
const answerForm = document.querySelector("#answer-form");
const answerInput = document.querySelector("#door-answer");
const answerFeedback = document.querySelector("#answer-feedback");
const sceneTransition = document.querySelector("#scene-transition");

function openPuzzle() {
  if (!puzzleOverlay) return;
  puzzleOverlay.hidden = false;
  if (puzzleEnvelope) {
    puzzleEnvelope.hidden = false;
    puzzleEnvelope.classList.remove("is-opening");
  }
  if (puzzleLetter) puzzleLetter.hidden = true;
  document.body.style.overflow = "hidden";
}

function revealPuzzleLetter() {
  if (!puzzleEnvelope || !puzzleLetter) return;
  puzzleEnvelope.classList.add("is-opening");
  window.setTimeout(() => {
    puzzleEnvelope.hidden = true;
    puzzleLetter.hidden = false;
    puzzleAnswerInput?.focus();
  }, 650);
}

function closePuzzle() {
  if (!puzzleOverlay) return;
  puzzleOverlay.hidden = true;
  if (puzzleEnvelope) {
    puzzleEnvelope.hidden = false;
    puzzleEnvelope.classList.remove("is-opening");
  }
  if (puzzleLetter) puzzleLetter.hidden = true;
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
  puzzleEnvelope?.addEventListener("click", revealPuzzleLetter);
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


/* Lucka 20: chifferbrev där spelaren själv skriver in bokstavsgissningar. */
const cipherOverlay = document.querySelector("#cipher-overlay");
const cipherEnvelope = document.querySelector("#cipher-envelope");
const cipherLetter = document.querySelector("#cipher-letter");
const cipherClose = document.querySelector("#cipher-close");
const cipherMessage = document.querySelector("#cipher-message");
const cipherForm = document.querySelector("#cipher-form");
const cipherNumber = document.querySelector("#cipher-number");
const cipherGuess = document.querySelector("#cipher-guess");
const cipherFeedback = document.querySelector("#cipher-feedback");
const eleventhDoor = document.querySelectorAll(".door")[10];
const cipherText = "Morgondagens lucka som ska öppnas är luckan med två ettor";
const cipherAlphabet = "abcdefghijklmnopqrstuvwxyzåäö";
const cipherCodes = (() => {
  const map = {};
  [...cipherAlphabet].forEach((letter, index) => { map[letter] = index + 1; });
  map.a = 7;
  map.g = 1;
  return map;
})();
const cipherSeeds = new Set(["a", "e", "o", "r", "s", "t", "n", "l"]);
const cipherRevealed = new Set();

function renderCipher() {
  if (!cipherMessage) return;
  cipherMessage.replaceChildren();
  cipherRevealed.clear();
  const seeded = new Set();

  [...cipherText].forEach((character) => {
    if (character === " ") {
      const space = document.createElement("span");
      space.className = "cipher-space";
      space.setAttribute("aria-hidden", "true");
      cipherMessage.append(space);
      return;
    }
    const letter = character.toLocaleLowerCase("sv-SE");
    if (!cipherCodes[letter]) {
      const punctuation = document.createElement("span");
      punctuation.className = "cipher-punctuation";
      punctuation.textContent = character;
      cipherMessage.append(punctuation);
      return;
    }

    const cell = document.createElement("span");
    cell.className = "cipher-cell";
    cell.dataset.letter = letter;
    cell.dataset.number = String(cipherCodes[letter]);

    const charSlot = document.createElement("span");
    charSlot.className = "cipher-char";
    if (cipherSeeds.has(letter) && !seeded.has(letter)) {
      charSlot.textContent = character;
      charSlot.classList.add("is-revealed");
      seeded.add(letter);
    } else {
      charSlot.textContent = "_";
    }

    const numberSlot = document.createElement("span");
    numberSlot.className = "cipher-number";
    numberSlot.textContent = String(cipherCodes[letter]);
    cell.append(charSlot, numberSlot);
    cipherMessage.append(cell);
  });
}

function openCipher() {
  if (!cipherOverlay) return;
  cipherOverlay.hidden = false;
  cipherEnvelope.hidden = false;
  cipherEnvelope.classList.remove("is-opening");
  cipherLetter.hidden = true;
  document.body.style.overflow = "hidden";
  renderCipher();
  if (cipherFeedback) {
    cipherFeedback.textContent = "";
    cipherFeedback.classList.remove("is-correct", "is-wrong");
  }
}

function revealCipherLetter() {
  if (!cipherEnvelope || !cipherLetter) return;
  cipherEnvelope.classList.add("is-opening");
  window.setTimeout(() => {
    cipherEnvelope.hidden = true;
    cipherLetter.hidden = false;
    cipherNumber?.focus();
  }, 650);
}

function closeCipher() {
  if (!cipherOverlay) return;
  cipherOverlay.hidden = true;
  cipherEnvelope.hidden = false;
  cipherEnvelope.classList.remove("is-opening");
  cipherLetter.hidden = true;
  document.body.style.overflow = "";
  twentiethDoor?.focus();
}

function finishCipher() {
  if (cipherForm) {
    cipherForm.querySelector('button[type="submit"]')?.setAttribute("disabled", "disabled");
    cipherNumber.disabled = true;
    cipherGuess.disabled = true;
  }
  window.setTimeout(() => {
    if (!sceneTransition) {
      closeCipher();
      eleventhDoor?.classList.add("is-unlocked");
      eleventhDoor?.setAttribute("aria-label", "Lucka 11, markerad");
      eleventhDoor?.focus();
      return;
    }
    sceneTransition.hidden = false;
    requestAnimationFrame(() => sceneTransition.classList.add("is-visible"));
    window.setTimeout(() => {
      closeCipher();
      eleventhDoor?.classList.add("is-unlocked");
      eleventhDoor?.setAttribute("aria-label", "Lucka 11, markerad");
      window.setTimeout(() => {
        sceneTransition.classList.remove("is-visible");
        window.setTimeout(() => {
          sceneTransition.hidden = true;
          eleventhDoor?.focus();
          cipherNumber.disabled = false;
          cipherGuess.disabled = false;
          cipherForm?.querySelector('button[type="submit"]')?.removeAttribute("disabled");
        }, 650);
      }, 180);
    }, 650);
  }, 1100);
}

if (twentiethDoor && cipherOverlay && cipherEnvelope && cipherLetter && cipherClose) {
  twentiethDoor.addEventListener("click", openCipher);
  cipherEnvelope.addEventListener("click", revealCipherLetter);
  cipherClose.addEventListener("click", closeCipher);
  cipherOverlay.addEventListener("click", (event) => {
    if (event.target === cipherOverlay) closeCipher();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !cipherOverlay.hidden) closeCipher();
  });
}

if (cipherForm && cipherNumber && cipherGuess && cipherFeedback && cipherMessage) {
  cipherForm.addEventListener("submit", (event) => {
    event.preventDefault();
    cipherFeedback.classList.remove("is-correct", "is-wrong");
    const number = Number(cipherNumber.value);
    const guess = cipherGuess.value.trim().toLocaleLowerCase("sv-SE");
    const correctLetter = Object.keys(cipherCodes).find((letter) => cipherCodes[letter] === number);

    if (!correctLetter || guess.length !== 1 || !cipherAlphabet.includes(guess) || cipherCodes[guess] !== number) {
      cipherFeedback.textContent = "Inte riktigt – den bokstaven hör inte till den siffran. Försök igen!";
      cipherFeedback.classList.add("is-wrong");
      return;
    }

    cipherMessage.querySelectorAll('.cipher-cell[data-number="' + number + '"]').forEach((cell) => {
      const slot = cell.querySelector(".cipher-char");
      slot.textContent = cell.dataset.letter.toLocaleUpperCase("sv-SE");
      slot.classList.add("is-revealed");
    });
    cipherRevealed.add(correctLetter);
    cipherFeedback.textContent = "Rätt! Alla rutor med siffran " + number + " är avslöjade.";
    cipherFeedback.classList.add("is-correct");
    cipherNumber.value = "";
    cipherGuess.value = "";

    const allRevealed = [...cipherMessage.querySelectorAll(".cipher-cell")].every((cell) =>
      cell.querySelector(".cipher-char").classList.contains("is-revealed")
    );
    if (allRevealed) {
      cipherFeedback.textContent = "Du knäckte meddelandet! Morgondagens lucka är lucka 11.";
      finishCipher();
    } else {
      cipherNumber.focus();
    }
  });
}
