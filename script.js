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


/* Lucka 20: chifferbrev med klickbara streck. */
const cipherOverlay = document.querySelector("#cipher-overlay");
const cipherEnvelope = document.querySelector("#cipher-envelope");
const cipherLetter = document.querySelector("#cipher-letter");
const cipherClose = document.querySelector("#cipher-close");
const cipherMessage = document.querySelector("#cipher-message");
const cipherFeedback = document.querySelector("#cipher-feedback");
const eleventhDoor = document.querySelectorAll(".door")[10];
const cipherText = "Morgondagens lucka som ska öppnas är luckan med två ettor";
const cipherAlphabet = "abcdefghijklmnopqrstuvwxyzåäö";
const cipherCodes = (() => {
  const map = {};
  [...cipherAlphabet].forEach((letter, index) => { map[letter] = index + 1; });
  // En unik kod per bokstav, med A = 7.
  map.a = 7;
  map.g = 1;
  return map;
})();

function renderCipher() {
  if (!cipherMessage) return;
  cipherMessage.replaceChildren();
  const seeded = new Set();
  const words = cipherText.split(" ");

  words.forEach((word, wordIndex) => {
    const wordWrap = document.createElement("span");
    wordWrap.className = "cipher-word";
    [...word].forEach((character) => {
      const letter = character.toLocaleLowerCase("sv-SE");
      const cell = document.createElement("span");
      cell.className = "cipher-cell";
      cell.dataset.letter = letter;
      cell.dataset.number = String(cipherCodes[letter]);

      const charSlot = document.createElement("button");
      charSlot.type = "button";
      charSlot.className = "cipher-char";
      charSlot.setAttribute("aria-label", seeded.has(letter) ? "Gissa bokstaven för siffra " + cipherCodes[letter] : "Synlig bokstav " + character);
      if (!seeded.has(letter)) {
        charSlot.textContent = character.toLocaleUpperCase("sv-SE");
        charSlot.classList.add("is-revealed", "is-seed");
        seeded.add(letter);
      } else {
        charSlot.textContent = "_";
        charSlot.classList.add("is-blank");
      }

      const numberSlot = document.createElement("span");
      numberSlot.className = "cipher-number";
      numberSlot.textContent = String(cipherCodes[letter]);
      cell.append(charSlot, numberSlot);
      wordWrap.append(cell);
    });
    cipherMessage.append(wordWrap);
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
    cipherMessage?.querySelector(".cipher-char.is-blank")?.focus();
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
        }, 650);
      }, 180);
    }, 650);
  }, 1100);
}

function revealCipherGuess(cell, input) {
  const guess = input.value.trim().toLocaleLowerCase("sv-SE");
  const number = Number(cell.dataset.number);
  const expectedLetter = cell.dataset.letter;
  if (guess.length !== 1) return;

  if (guess !== expectedLetter || cipherCodes[guess] !== number) {
    cipherFeedback.textContent = "Inte riktigt – försök igen!";
    cipherFeedback.classList.remove("is-correct");
    cipherFeedback.classList.add("is-wrong");
    input.classList.add("cipher-input-wrong");
    return;
  }

  cipherMessage.querySelectorAll('.cipher-cell[data-number="' + number + '"]').forEach((matchingCell) => {
    const button = matchingCell.querySelector(".cipher-char");
    button.textContent = matchingCell.dataset.letter.toLocaleUpperCase("sv-SE");
    button.classList.remove("is-blank");
    button.classList.add("is-revealed");
    button.setAttribute("aria-label", "Avslöjad bokstav " + button.textContent);
    button.disabled = true;
  });
  cipherFeedback.textContent = "Rätt bokstav! Alla rutor med siffran " + number + " är ifyllda.";
  cipherFeedback.classList.remove("is-wrong");
  cipherFeedback.classList.add("is-correct");

  const allRevealed = [...cipherMessage.querySelectorAll(".cipher-cell")].every((item) =>
    item.querySelector(".cipher-char").classList.contains("is-revealed")
  );
  if (allRevealed) {
    cipherFeedback.textContent = "Du knäckte meddelandet! Morgondagens lucka är lucka 11.";
    finishCipher();
  }
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

if (cipherMessage && cipherFeedback) {
  cipherMessage.addEventListener("click", (event) => {
    const button = event.target.closest(".cipher-char.is-blank");
    if (!button || button.disabled) return;
    const cell = button.closest(".cipher-cell");
    if (!cell || cell.querySelector(".cipher-inline-input")) return;

    const input = document.createElement("input");
    input.className = "cipher-inline-input";
    input.type = "text";
    input.maxLength = 1;
    input.autocomplete = "off";
    input.autocapitalize = "characters";
    input.setAttribute("aria-label", "Skriv bokstav för siffra " + cell.dataset.number);
    button.replaceWith(input);
    input.focus();

    const check = () => {
      if (!input.isConnected) return;
      const guess = input.value.trim().toLocaleLowerCase("sv-SE");
      if (!guess) {
        input.replaceWith(button);
        return;
      }
      if (guess === cell.dataset.letter && cipherCodes[guess] === Number(cell.dataset.number)) {
        revealCipherGuess(cell, input);
      } else {
        cipherFeedback.textContent = "Inte riktigt – försök igen!";
        cipherFeedback.classList.remove("is-correct");
        cipherFeedback.classList.add("is-wrong");
        input.classList.add("cipher-input-wrong");
        window.setTimeout(() => {
          if (!input.isConnected) return;
          input.replaceWith(button);
          button.focus();
        }, 700);
      }
    };

    input.addEventListener("keydown", (keyEvent) => {
      if (keyEvent.key === "Enter") {
        keyEvent.preventDefault();
        check();
      } else if (keyEvent.key === "Escape") {
        input.replaceWith(button);
        button.focus();
      }
    });
    input.addEventListener("blur", () => {
      if (input.isConnected && !input.value.trim()) input.replaceWith(button);
    });
  });
}
