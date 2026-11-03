
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
    puzzleLetter.scrollTop = 0;
    window.scrollTo(0, 0);
    puzzleAnswerInput?.focus({ preventScroll: true });
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
  }, 1000);
}

function closeLetter() {
  if (!overlay) return;
  overlay.hidden = true;
  document.body.style.overflow = "";
  firstDoor?.focus();
}

// Koppla luckornas klick via kalendern. Händelsedelegering gör att
// enskilda luckor fortsätter fungera även om markupen ändras.
const calendar = document.querySelector("#calendar");
if (calendar) {
  calendar.addEventListener("click", (event) => {
    const door = event.target.closest(".door");
    if (!door || !calendar.contains(door)) return;
    const index = [...calendar.querySelectorAll(".door")].indexOf(door);
    if (index === 0) openLetter();
    else if (index === 6) openPuzzle();
    else if (index === 8) openLetterMaze();
    else if (index === 10) openSudoku();
    else if (index === 19) openCipher();
  });
}

if (envelope && closeButton) {
  envelope.addEventListener("click", revealLetter);
  closeButton.addEventListener("click", closeLetter);
  overlay?.addEventListener("click", (event) => {
    if (event.target === overlay) closeLetter();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && overlay && !overlay.hidden) closeLetter();
  });
}

if (puzzleEnvelope && puzzleClose) {
  puzzleEnvelope.addEventListener("click", revealPuzzleLetter);
  puzzleClose.addEventListener("click", closePuzzle);
  puzzleOverlay?.addEventListener("click", (event) => {
    if (event.target === puzzleOverlay) closePuzzle();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && puzzleOverlay && !puzzleOverlay.hidden) closePuzzle();
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
const cipherAnswerForm = document.querySelector("#cipher-answer-form");
const cipherAnswerInput = document.querySelector("#cipher-answer");
const eleventhDoor = document.querySelector('[data-door="11"]');
const cipherText = "Imorgon ska du öppna lucka nummer elva";
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

  const words = cipherText.split(" ");
  const characters = [...words.join("")];
  const occurrences = new Map();
  characters.forEach((character, index) => {
    const letter = character.toLocaleLowerCase("sv-SE");
    if (!occurrences.has(letter)) occurrences.set(letter, []);
    occurrences.get(letter).push(index);
  });

  // Välj en synlig ledtråd per unik bokstav, utspridd över hela meddelandet.
  const seedPositions = new Set();
  const entries = [...occurrences.entries()];
  const targets = entries.map((_, index) =>
    entries.length === 1 ? 0 : Math.round(index * (characters.length - 1) / (entries.length - 1))
  );
  targets.forEach((target) => {
    let bestLetter = null;
    let bestPosition = null;
    let bestDistance = Infinity;
    occurrences.forEach((positions, letter) => {
      if (positions.some((position) => seedPositions.has(position))) return;
      const available = positions.filter((position) => !seedPositions.has(position));
      if (!available.length) return;
      const position = available.reduce((best, candidate) =>
        Math.abs(candidate - target) < Math.abs(best - target) ? candidate : best
      );
      const distance = Math.abs(position - target);
      if (distance < bestDistance) {
        bestDistance = distance;
        bestLetter = letter;
        bestPosition = position;
      }
    });
    if (bestLetter !== null) seedPositions.add(bestPosition);
  });

  let flatIndex = 0;
  words.forEach((word) => {
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
      if (seedPositions.has(flatIndex)) {
        charSlot.textContent = character.toLocaleUpperCase("sv-SE");
        charSlot.classList.add("is-revealed", "is-seed");
        charSlot.setAttribute("aria-label", "Synlig bokstav " + character);
      } else {
        charSlot.textContent = "_";
        charSlot.classList.add("is-blank");
        charSlot.setAttribute("aria-label", "Gissa bokstaven för siffra " + cipherCodes[letter]);
      }

      const numberSlot = document.createElement("span");
      numberSlot.className = "cipher-number";
      numberSlot.textContent = String(cipherCodes[letter]);
      cell.append(charSlot, numberSlot);
      wordWrap.append(cell);
      flatIndex++;
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
    cipherFeedback.textContent = "Fel, testa igen!";
    cipherFeedback.classList.remove("is-correct");
    cipherFeedback.classList.add("is-wrong");
    input.classList.add("cipher-input-wrong");
    return;
  }

  const button = cell.querySelector(".cipher-char");
  button.textContent = expectedLetter.toLocaleUpperCase("sv-SE");
  button.classList.remove("is-blank");
  button.classList.add("is-revealed");
  button.setAttribute("aria-label", "Avslöjad bokstav " + button.textContent);
  button.disabled = true;
  cipherFeedback.textContent = "Rätt!"
  cipherFeedback.classList.remove("is-wrong");
  cipherFeedback.classList.add("is-correct");

  const allRevealed = [...cipherMessage.querySelectorAll(".cipher-cell")].every((item) =>
    item.querySelector(".cipher-char").classList.contains("is-revealed")
  );
  if (allRevealed) {
    cipherFeedback.textContent = "";
    cipherAnswerInput.focus();
  }
}

if (twentiethDoor && cipherOverlay && cipherEnvelope && cipherLetter && cipherClose) {
  cipherEnvelope.addEventListener("click", revealCipherLetter);
  cipherClose.addEventListener("click", closeCipher);
  cipherOverlay.addEventListener("click", (event) => {
    if (event.target === cipherOverlay) closeCipher();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !cipherOverlay.hidden) closeCipher();
  });
}

if (cipherAnswerForm && cipherAnswerInput && cipherFeedback) {
  cipherAnswerForm.addEventListener("submit", (event) => {
    event.preventDefault();
    cipherFeedback.classList.remove("is-correct", "is-wrong");
    const allLettersRevealed = [...cipherMessage.querySelectorAll(".cipher-cell")].every((item) =>
      item.querySelector(".cipher-char").classList.contains("is-revealed")
    );
    if (!allLettersRevealed) {
      cipherFeedback.textContent = "Lös först alla bokstäver!";
      cipherFeedback.classList.add("is-wrong");
    } else if (Number(cipherAnswerInput.value) === 11) {
      cipherFeedback.textContent = "Rätt!";
      cipherFeedback.classList.add("is-correct");
      cipherAnswerInput.disabled = true;
      cipherAnswerForm.querySelector('button[type="submit"]')?.setAttribute("disabled", "disabled");
      twentiethDoor?.classList.remove("is-unlocked");
      twentiethDoor?.setAttribute("aria-label", "Lucka 20");
      finishCipher();
    } else {
      cipherFeedback.textContent = "Fel, testa igen!";
      cipherFeedback.classList.add("is-wrong");
    }
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
        input.replaceWith(button);
        revealCipherGuess(cell, input);
      } else {
        cipherFeedback.textContent = "Fel, testa igen!";
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


/* Lucka 11: klassiskt 9×9-sudoku. */
const sudokuOverlay = document.querySelector("#sudoku-overlay");
const sudokuEnvelope = document.querySelector("#sudoku-envelope");
const sudokuLetter = document.querySelector("#sudoku-letter");
const sudokuBoard = document.querySelector("#sudoku-board");
const sudokuClose = document.querySelector("#sudoku-close");
const sudokuFeedback = document.querySelector("#sudoku-feedback");
const sudokuAnswerForm = document.querySelector("#sudoku-answer-form");
const sudokuAnswerInput = document.querySelector("#sudoku-answer");
const ninthDoor = document.querySelectorAll(".door")[8];
const twentyfirstDoor = document.querySelectorAll(".door")[20];

const sudokuPuzzle = [
  "534678012",
  "672195340",
  "198342067",
  "850760023",
  "426853091",
  "713920806",
  "061030280",
  "207419005",
  "305080179"
];
const sudokuSolution = [
  "534678912",
  "672195348",
  "198342567",
  "859761423",
  "426853791",
  "713924856",
  "961537284",
  "287419635",
  "345286179"
];

function renderSudoku() {
  if (!sudokuBoard || sudokuBoard.childElementCount) return;
  sudokuPuzzle.forEach((row, rowIndex) => {
    [...row].forEach((digit, colIndex) => {
      const cell = document.createElement("input");
      cell.className = "sudoku-cell";
      cell.type = "text";
      cell.inputMode = "numeric";
      cell.autocomplete = "off";
      cell.maxLength = 1;
      cell.dataset.row = String(rowIndex);
      cell.dataset.col = String(colIndex);
      cell.setAttribute("aria-label", `Rad ${rowIndex + 1}, kolumn ${colIndex + 1}`);
      if (digit !== "0") {
        cell.value = digit;
        cell.disabled = true;
        cell.classList.add("is-given");
      } else {
        cell.addEventListener("input", () => {
          cell.value = cell.value.replace(/[^1-9]/g, "").slice(0, 1);
          checkSudokuCell(cell);
        });
      }
      sudokuBoard.append(cell);
    });
  });
}

function openSudoku() {
  if (!sudokuOverlay) return;
  renderSudoku();
  sudokuOverlay.hidden = false;
  if (sudokuEnvelope) {
    sudokuEnvelope.hidden = false;
    sudokuEnvelope.classList.remove("is-opening");
  }
  if (sudokuLetter) sudokuLetter.hidden = true;
  document.body.style.overflow = "hidden";
}

function revealSudokuLetter() {
  if (!sudokuEnvelope || !sudokuLetter) return;
  sudokuEnvelope.classList.add("is-opening");
  window.setTimeout(() => {
    sudokuEnvelope.hidden = true;
    sudokuLetter.hidden = false;
    sudokuBoard?.querySelector("input:not(:disabled)")?.focus();
  }, 650);
}

function closeSudoku() {
  if (!sudokuOverlay) return;
  sudokuOverlay.hidden = true;
  if (sudokuEnvelope) {
    sudokuEnvelope.hidden = false;
    sudokuEnvelope.classList.remove("is-opening");
  }
  if (sudokuLetter) sudokuLetter.hidden = true;
  document.body.style.overflow = "";
  eleventhDoor?.focus();
}

function finishSudoku() {
  const clueCell = sudokuBoard.querySelector('.sudoku-cell[data-row="0"][data-col="6"]');
  clueCell?.classList.add("is-red-clue");
  sudokuFeedback.textContent = "Sudokut är löst!";
  sudokuFeedback.className = "sudoku-feedback is-correct is-complete";
  sudokuBoard.querySelectorAll(".sudoku-cell").forEach((cell) => { cell.disabled = true; });
}

function checkSudokuCell(cell) {
  if (!cell || !sudokuFeedback || sudokuFeedback.classList.contains("is-complete")) return;
  const row = Number(cell.dataset.row);
  const col = Number(cell.dataset.col);
  const value = cell.value.trim();

  cell.classList.remove("is-wrong", "is-correct");
  if (!value) {
    sudokuFeedback.textContent = "Fyll i siffrorna en i taget.";
    sudokuFeedback.className = "sudoku-feedback";
    return;
  }

  if (value === sudokuSolution[row][col]) {
    cell.classList.add("is-correct");
    sudokuFeedback.textContent = "Rätt siffra!";
    sudokuFeedback.className = "sudoku-feedback is-correct";
  } else {
    cell.classList.add("is-wrong");
    sudokuFeedback.textContent = "Inte riktigt – prova en annan siffra.";
    sudokuFeedback.className = "sudoku-feedback is-wrong";
    return;
  }

  const allCorrect = [...sudokuBoard.querySelectorAll(".sudoku-cell")].every((item) =>
    item.value.trim() === sudokuSolution[Number(item.dataset.row)][Number(item.dataset.col)]
  );
  if (allCorrect) finishSudoku();
}

if (sudokuAnswerForm && sudokuAnswerInput && sudokuFeedback) {
  sudokuAnswerForm.addEventListener("submit", (event) => {
    event.preventDefault();
    sudokuFeedback.classList.remove("is-correct", "is-wrong");
    if (Number(sudokuAnswerInput.value) === 9) {
      sudokuFeedback.textContent = "Rätt!";
      sudokuFeedback.classList.add("is-correct");
      sudokuAnswerInput.disabled = true;
      sudokuAnswerForm.querySelector('button[type="submit"]')?.setAttribute("disabled", "disabled");
      window.setTimeout(() => {
        if (!sceneTransition) {
          closeSudoku();
          ninthDoor?.classList.add("is-unlocked");
          ninthDoor?.setAttribute("aria-label", "Lucka 9, upplåst");
          ninthDoor?.focus();
          return;
        }
        sceneTransition.hidden = false;
        requestAnimationFrame(() => sceneTransition.classList.add("is-visible"));
        window.setTimeout(() => {
          closeSudoku();
          ninthDoor?.classList.add("is-unlocked");
          ninthDoor?.setAttribute("aria-label", "Lucka 9, upplåst");
          window.setTimeout(() => {
            sceneTransition.classList.remove("is-visible");
            window.setTimeout(() => {
              sceneTransition.hidden = true;
              ninthDoor?.focus();
            }, 650);
          }, 180);
        }, 650);
      }, 350);
    } else {
      sudokuFeedback.textContent = "Fel, testa igen!";
      sudokuFeedback.classList.add("is-wrong");
    }
  });
}

if (eleventhDoor && sudokuOverlay && sudokuClose && sudokuEnvelope) {
  sudokuEnvelope.addEventListener("click", revealSudokuLetter);
  sudokuClose.addEventListener("click", closeSudoku);
  sudokuOverlay.addEventListener("click", (event) => {
    if (event.target === sudokuOverlay) closeSudoku();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !sudokuOverlay.hidden) closeSudoku();
  });
}
 
/* Lucka 9: extra svår bokstavslabyrint med en tydlig slutpunkt. */
const mazeOverlay = document.querySelector("#maze-overlay");
const mazeEnvelope = document.querySelector("#maze-envelope");
const mazeLetter = document.querySelector("#maze-letter");
const mazeClose = document.querySelector("#maze-close");
const mazeHost = document.querySelector("#letter-maze");
const mazeAnswerForm = document.querySelector("#maze-answer-form");
const mazeAnswerInput = document.querySelector("#maze-answer");
const mazeFeedback = document.querySelector("#maze-feedback");
const mazePhrase = "LUCKANSOMDUSKAÖPPNAIMORGONÄRSIFFRANSOMÄRTREDAGARFÖREJUL";

function buildLetterMaze() {
  if (!mazeHost || mazeHost.childElementCount) return;
  const rows = 12;
  const cols = 16;
  const size = 34;
  const pad = 18;
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZÅÄÖ";
  const cells = Array.from({ length: rows }, (_, r) =>
    Array.from({ length: cols }, (_, c) => ({
      r, c, walls: [true, true, true, true], visited: false
    }))
  );
  const directions = [
    { dr: -1, dc: 0, wall: 0, opposite: 2 },
    { dr: 0, dc: 1, wall: 1, opposite: 3 },
    { dr: 1, dc: 0, wall: 2, opposite: 0 },
    { dr: 0, dc: -1, wall: 3, opposite: 1 }
  ];
  let seed = 713;
  const random = () => {
    seed ^= seed << 13;
    seed ^= seed >>> 17;
    seed ^= seed << 5;
    return (seed >>> 0) / 4294967296;
  };

  // Randomiserad Prim-algoritm ger en tät, klassisk labyrint med många
  // korta sidogångar, återvändsgränder och vägval – utan öppna slingor.
  const startCell = cells[0][15];
  const exitCell = cells[rows - 1][14];
  const frontier = [];
  const addFrontier = (cell) => {
    directions.forEach((direction) => {
      const next = cells[cell.r + direction.dr]?.[cell.c + direction.dc];
      if (next && !next.visited) frontier.push({ cell, next, direction });
    });
  };
  cells[0][0].visited = true;
  addFrontier(cells[0][0]);
  while (frontier.length) {
    const index = Math.floor(random() * frontier.length);
    const { cell, next, direction } = frontier[index];
    frontier[index] = frontier[frontier.length - 1];
    frontier.pop();
    if (next.visited) continue;
    cell.walls[direction.wall] = false;
    next.walls[direction.opposite] = false;
    next.visited = true;
    addFrontier(next);
  }

  // Öppningarna sitter i överkanten respektive nederkanten.
  startCell.walls[0] = false;
  exitCell.walls[2] = false;

  const queue = [startCell];
  const previous = new Map([[startCell, null]]);
  for (let index = 0; index < queue.length; index++) {
    const current = queue[index];
    if (current === exitCell) break;
    directions.forEach((direction) => {
      const next = cells[current.r + direction.dr]?.[current.c + direction.dc];
      if (next && !current.walls[direction.wall] && !previous.has(next)) {
        previous.set(next, current);
        queue.push(next);
      }
    });
  }
  const route = [];
  let step = exitCell;
  while (step) {
    route.unshift(step);
    step = previous.get(step);
  }
  if (route.length !== mazePhrase.length) {
    throw new Error("Labyrintens lösningsväg måste innehålla exakt hela meddelandet.");
  }

  const routeLetters = new Map();
  route.forEach((cell, index) => routeLetters.set(cell, mazePhrase[index]));

  const ns = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(ns, "svg");
  svg.setAttribute("viewBox", `0 0 ${cols * size + pad * 2} ${rows * size + pad * 2}`);
  svg.setAttribute("role", "img");
  svg.setAttribute("aria-label", "Bokstavslabyrint med många återvändsgränder. Börja vid öppningen upptill och följ gångarna till utgången nedtill.");
  const wallGroup = document.createElementNS(ns, "g");
  wallGroup.setAttribute("class", "maze-walls");
  const textGroup = document.createElementNS(ns, "g");
  textGroup.setAttribute("class", "maze-letters");

  // Tydlig nedåtpil precis ovanför öppningen.
  const entryArrow = document.createElementNS(ns, "path");
  entryArrow.setAttribute("d", `M ${pad + startCell.c * size + size / 2} 1 V ${pad - 3} M ${pad + startCell.c * size + size / 2 - 6} ${pad - 9} L ${pad + startCell.c * size + size / 2} ${pad - 3} L ${pad + startCell.c * size + size / 2 + 6} ${pad - 9}`);
  entryArrow.setAttribute("fill", "none");
  entryArrow.setAttribute("stroke", "#b3261e");
  entryArrow.setAttribute("stroke-width", "3");
  entryArrow.setAttribute("stroke-linecap", "round");
  entryArrow.setAttribute("stroke-linejoin", "round");
  entryArrow.setAttribute("class", "maze-entry-arrow");

  // Utgångspil precis under öppningen längst ned.
  const exitArrow = document.createElementNS(ns, "path");
  exitArrow.setAttribute("d", `M ${pad + exitCell.c * size + size / 2} ${pad + rows * size + 3} V ${pad + rows * size + 15} M ${pad + exitCell.c * size + size / 2 - 6} ${pad + rows * size + 9} L ${pad + exitCell.c * size + size / 2} ${pad + rows * size + 15} L ${pad + exitCell.c * size + size / 2 + 6} ${pad + rows * size + 9}`);
  exitArrow.setAttribute("fill", "none");
  exitArrow.setAttribute("stroke", "#b3261e");
  exitArrow.setAttribute("stroke-width", "3");
  exitArrow.setAttribute("stroke-linecap", "round");
  exitArrow.setAttribute("stroke-linejoin", "round");
  exitArrow.setAttribute("class", "maze-exit-arrow");

  cells.flat().forEach((cell) => {
    const x = pad + cell.c * size;
    const y = pad + cell.r * size;
    cell.walls.forEach((hasWall, wallIndex) => {
      if (!hasWall) return;
      const line = document.createElementNS(ns, "line");
      const coords = [
        [x, y, x + size, y],
        [x + size, y, x + size, y + size],
        [x, y + size, x + size, y + size],
        [x, y, x, y + size]
      ][wallIndex];
      ["x1", "y1", "x2", "y2"].forEach((attribute, i) => line.setAttribute(attribute, coords[i]));
      wallGroup.append(line);
    });

    // Alla rutor får en bokstav. Endast den rätta vägen stavar meddelandet.
    const letter = routeLetters.get(cell) ?? letters[Math.floor(random() * letters.length)];
    if (letter) {
      const text = document.createElementNS(ns, "text");
      text.setAttribute("x", x + size / 2);
      text.setAttribute("y", y + size / 2);
      text.textContent = letter;
      textGroup.append(text);
    }
  });

  svg.append(entryArrow, exitArrow, wallGroup, textGroup);
  mazeHost.append(svg);
}

if (mazeAnswerForm && mazeAnswerInput && mazeFeedback) {
  mazeAnswerForm.addEventListener("submit", (event) => {
    event.preventDefault();
    mazeFeedback.classList.remove("is-correct", "is-wrong");
    if (Number(mazeAnswerInput.value) === 21) {
      mazeFeedback.textContent = "Rätt!";
      mazeFeedback.classList.add("is-correct");
      mazeAnswerInput.disabled = true;
      mazeAnswerForm.querySelector('button[type="submit"]')?.setAttribute("disabled", "disabled");

      // Samma svarta scenövergång som vid de andra luckornas lösningar.
      window.setTimeout(() => {
        if (!sceneTransition) {
          closeLetterMaze();
          twentyfirstDoor?.classList.add("is-unlocked");
          twentyfirstDoor?.setAttribute("aria-label", "Lucka 21, upplåst");
          twentyfirstDoor?.focus();
          return;
        }

        sceneTransition.hidden = false;
        requestAnimationFrame(() => sceneTransition.classList.add("is-visible"));

        window.setTimeout(() => {
          closeLetterMaze();
          twentyfirstDoor?.classList.add("is-unlocked");
          twentyfirstDoor?.setAttribute("aria-label", "Lucka 21, upplåst");

          window.setTimeout(() => {
            sceneTransition.classList.remove("is-visible");
            window.setTimeout(() => {
              sceneTransition.hidden = true;
              twentyfirstDoor?.focus();
            }, 650);
          }, 180);
        }, 650);
      }, 350);
    } else {
      mazeFeedback.textContent = "Fel, testa igen!";
      mazeFeedback.classList.add("is-wrong");
    }
  });
}

function openLetterMaze() {
  if (!mazeOverlay) return;
  buildLetterMaze();
  mazeOverlay.hidden = false;
  if (mazeEnvelope) {
    mazeEnvelope.hidden = false;
    mazeEnvelope.classList.remove("is-opening");
  }
  if (mazeLetter) mazeLetter.hidden = true;
  document.body.style.overflow = "hidden";
  mazeEnvelope?.focus();
}

function revealMazeLetter() {
  if (!mazeEnvelope || !mazeLetter) return;
  mazeEnvelope.classList.add("is-opening");
  window.setTimeout(() => {
    mazeEnvelope.hidden = true;
    mazeLetter.hidden = false;
    mazeLetter.scrollTop = 0;
    window.scrollTo(0, 0);
    mazeClose?.focus({ preventScroll: true });
  }, 650);
}

function closeLetterMaze() {
  if (!mazeOverlay) return;
  mazeOverlay.hidden = true;
  if (mazeEnvelope) {
    mazeEnvelope.hidden = false;
    mazeEnvelope.classList.remove("is-opening");
  }
  if (mazeLetter) mazeLetter.hidden = true;
  document.body.style.overflow = "";
  ninthDoor?.focus();
}

if (ninthDoor && mazeOverlay && mazeClose && mazeEnvelope) {
  mazeEnvelope.addEventListener("click", revealMazeLetter);
  mazeClose.addEventListener("click", closeLetterMaze);
  mazeOverlay.addEventListener("click", (event) => {
    if (event.target === mazeOverlay) closeLetterMaze();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !mazeOverlay.hidden) closeLetterMaze();
  });
  // Labyrinten lämnas endast via kryssknappen.
  // Labyrinten är statisk och går inte att förstora genom att trycka på den.
}
