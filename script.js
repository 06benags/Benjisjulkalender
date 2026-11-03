
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
const sudokuBoard = document.querySelector("#sudoku-board");
const sudokuClose = document.querySelector("#sudoku-close");
const sudokuFeedback = document.querySelector("#sudoku-feedback");
const ninthDoor = document.querySelectorAll(".door")[8];
const sudokuPuzzle = [
  "530070000",
  "600195000",
  "098000060",
  "800060003",
  "400803001",
  "700020006",
  "060000280",
  "000419005",
  "000080079"
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
  document.body.style.overflow = "hidden";
  sudokuBoard?.querySelector("input:not(:disabled)")?.focus();
}

function closeSudoku() {
  if (!sudokuOverlay) return;
  sudokuOverlay.hidden = true;
  document.body.style.overflow = "";
  eleventhDoor?.focus();
}

function finishSudoku() {
  const clueCell = sudokuBoard.querySelector('.sudoku-cell[data-row="0"][data-col="6"]');
  clueCell?.classList.add("is-red-clue");
  sudokuFeedback.textContent = "Helt rätt! Snyggt löst.";
  sudokuFeedback.className = "sudoku-feedback is-correct is-complete";
  sudokuBoard.querySelectorAll(".sudoku-cell").forEach((cell) => { cell.disabled = true; });
  ninthDoor?.classList.add("is-unlocked");
  ninthDoor?.setAttribute("aria-label", "Lucka 9, markerad");
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

if (eleventhDoor && sudokuOverlay && sudokuClose) {
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
const mazeClose = document.querySelector("#maze-close");
const mazeHost = document.querySelector("#letter-maze");
const mazePhrase = "OMDUADDERARÅTTAPLUSNIOOCHSEDANTARBORTETTOCHLÄGGERTILLTREFÖRATTSEDANTABORTTRESÅVETDUVILKENLUCKADUSKAÖPPNAIMORGON";

function setMazeExpanded(expanded) {
  if (!mazeHost) return;
  mazeHost.classList.toggle("maze-expanded", expanded);
  mazeHost.setAttribute(
    "aria-label",
    expanded ? "Förstorad labyrint." : "Labyrint. Tryck för att förstora."
  );
  if (!expanded) {
    mazeHost.style.setProperty("--maze-zoom", "1");
    mazeHost.dataset.panX = "0";
    mazeHost.dataset.panY = "0";
    mazeHost.style.setProperty("--maze-pan-x", "0px");
    mazeHost.style.setProperty("--maze-pan-y", "0px");
    mazeHost.style.cursor = "zoom-in";
  } else {
    mazeHost.style.cursor = "grab";
  }
  const controls = mazeOverlay?.querySelector(".maze-zoom-controls");
  if (controls) controls.hidden = !expanded;
}

let mazeDrag = null;
let suppressMazeClick = false;

function attachMazePanning() {
  if (!mazeHost) return;
  mazeHost.addEventListener("pointerdown", (event) => {
    if (!mazeHost.classList.contains("maze-expanded") || event.button !== 0) return;
    mazeDrag = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      panX: Number(mazeHost.dataset.panX || 0),
      panY: Number(mazeHost.dataset.panY || 0),
      moved: false
    };
    mazeHost.setPointerCapture(event.pointerId);
    mazeHost.style.cursor = "grabbing";
  });

  mazeHost.addEventListener("pointermove", (event) => {
    if (!mazeDrag || event.pointerId !== mazeDrag.pointerId) return;
    const dx = event.clientX - mazeDrag.startX;
    const dy = event.clientY - mazeDrag.startY;
    if (Math.abs(dx) + Math.abs(dy) > 3) mazeDrag.moved = true;
    if (!mazeDrag.moved) return;
    mazeHost.dataset.panX = String(mazeDrag.panX + dx);
    mazeHost.dataset.panY = String(mazeDrag.panY + dy);
    mazeHost.style.setProperty("--maze-pan-x", mazeHost.dataset.panX + "px");
    mazeHost.style.setProperty("--maze-pan-y", mazeHost.dataset.panY + "px");
  });

  const stopDragging = (event) => {
    if (!mazeDrag || event.pointerId !== mazeDrag.pointerId) return;
    suppressMazeClick = mazeDrag.moved;
    mazeDrag = null;
    mazeHost.style.cursor = "grab";
  };
  mazeHost.addEventListener("pointerup", stopDragging);
  mazeHost.addEventListener("pointercancel", stopDragging);
}

function addMazeZoomControls() {
  if (!mazeHost || !mazeOverlay || mazeOverlay.querySelector(".maze-zoom-controls")) return;
  const controls = document.createElement("div");
  controls.className = "maze-zoom-controls";
  controls.hidden = true;
  controls.innerHTML = '<button type="button" class="maze-zoom-close" aria-label="Stäng förstoring">×</button><button type="button" class="maze-zoom-out" aria-label="Zooma ut">−</button><button type="button" class="maze-zoom-in" aria-label="Zooma in">+</button>';
  controls.addEventListener("click", (event) => {
    event.stopPropagation();
    const button = event.target.closest("button");
    if (!button) return;
    if (button.classList.contains("maze-zoom-close")) {
      setMazeExpanded(false);
      return;
    }
    const current = Number(mazeHost.dataset.zoom || 1);
    const next = Math.max(0.7, Math.min(1.6, current + (button.classList.contains("maze-zoom-in") ? 0.1 : -0.1)));
    mazeHost.dataset.zoom = next.toFixed(1);
    mazeHost.style.setProperty("--maze-zoom", next.toFixed(1));
  });
  mazeOverlay.append(controls);
}

function buildLetterMaze() {
  if (!mazeHost || mazeHost.childElementCount) return;
  const rows = 27;
  const cols = 41;
  const size = 26;
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
  let seed = 987654321;
  const random = () => {
    seed ^= seed << 13;
    seed ^= seed >>> 17;
    seed ^= seed << 5;
    return (seed >>> 0) / 4294967296;
  };

  // Skapa en perfekt labyrint: många återvändsgränder, men bara en möjlig väg.
  const stack = [cells[0][0]];
  cells[0][0].visited = true;
  while (stack.length) {
    const current = stack[stack.length - 1];
    const options = directions.map((direction) => ({
      direction,
      next: cells[current.r + direction.dr]?.[current.c + direction.dc]
    })).filter((item) => item.next && !item.next.visited);
    if (!options.length) {
      stack.pop();
      continue;
    }
    const choice = options[Math.floor(random() * options.length)];
    current.walls[choice.direction.wall] = false;
    choice.next.walls[choice.direction.opposite] = false;
    choice.next.visited = true;
    stack.push(choice.next);
  }

  // Öppna start och hitta den enda vägen genom labyrinten.
  cells[0][0].walls[3] = false;
  const queue = [cells[0][0]];
  const previous = new Map([[cells[0][0], null]]);
  for (let index = 0; index < queue.length; index++) {
    const current = queue[index];
    if (current === cells[rows - 1][cols - 1]) break;
    directions.forEach((direction) => {
      const next = cells[current.r + direction.dr]?.[current.c + direction.dc];
      if (next && !current.walls[direction.wall] && !previous.has(next)) {
        previous.set(next, current);
        queue.push(next);
      }
    });
  }
  const fullRoute = [];
  let step = cells[rows - 1][cols - 1];
  while (step) {
    fullRoute.unshift(step);
    step = previous.get(step);
  }

  // Lösningsvägen slutar exakt vid meddelandets sista bokstav.
  const route = fullRoute.slice(0, mazePhrase.length);
  const routeLetters = new Map();
  route.forEach((cell, index) => routeLetters.set(cell, mazePhrase[index]));

  // Förläng den tomma gången från lösningsvägens slut till närmaste ytterkant.
  const exitCell = route[route.length - 1];
  const edgeOptions = [
    { distance: exitCell.r, dr: -1, dc: 0, wall: 0, opposite: 2 },
    { distance: cols - 1 - exitCell.c, dr: 0, dc: 1, wall: 1, opposite: 3 },
    { distance: rows - 1 - exitCell.r, dr: 1, dc: 0, wall: 2, opposite: 0 },
    { distance: exitCell.c, dr: 0, dc: -1, wall: 3, opposite: 1 }
  ];
  const exitDirection = edgeOptions.reduce((best, option) =>
    option.distance < best.distance ? option : best
  );
  const exitCorridor = new Set();
  let corridorCell = exitCell;
  while (corridorCell.r !== (exitDirection.dr < 0 ? 0 : exitDirection.dr > 0 ? rows - 1 : corridorCell.r) ||
         corridorCell.c !== (exitDirection.dc < 0 ? 0 : exitDirection.dc > 0 ? cols - 1 : corridorCell.c)) {
    const next = cells[corridorCell.r + exitDirection.dr][corridorCell.c + exitDirection.dc];
    corridorCell.walls[exitDirection.wall] = false;
    next.walls[exitDirection.opposite] = false;
    corridorCell = next;
    exitCorridor.add(corridorCell);
  }
  corridorCell.walls[exitDirection.wall] = false;

  const ns = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(ns, "svg");
  svg.setAttribute("viewBox", `0 0 ${cols * size + pad * 2} ${rows * size + pad * 2}`);
  svg.setAttribute("role", "img");
  svg.setAttribute("aria-label", "Svår bokstavslabyrint. Följ bokstäverna utan mellanrum och fortsätt sedan längs den tomma gången ut ur labyrinten.");
  const wallGroup = document.createElementNS(ns, "g");
  wallGroup.setAttribute("class", "maze-walls");
  const textGroup = document.createElementNS(ns, "g");
  textGroup.setAttribute("class", "maze-letters");

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

    let letter = routeLetters.get(cell);
    if (letter === undefined && !exitCorridor.has(cell)) {
      // Övriga rutor får slumpbokstäver som vilseleder utan att ändra texten.
      letter = letters[Math.floor(random() * letters.length)];
    }
    if (letter) {
      const text = document.createElementNS(ns, "text");
      text.setAttribute("x", x + size / 2);
      text.setAttribute("y", y + size / 2);
      text.textContent = letter;
      textGroup.append(text);
    }
  });

  svg.append(wallGroup, textGroup);
  mazeHost.append(svg);
  addMazeZoomControls();
}

function openLetterMaze() {
  if (!mazeOverlay) return;
  buildLetterMaze();
  mazeOverlay.hidden = false;
  document.body.style.overflow = "hidden";
  mazeClose?.focus();
}

function closeLetterMaze() {
  if (!mazeOverlay) return;
  mazeOverlay.hidden = true;
  document.body.style.overflow = "";
  ninthDoor?.focus();
}

if (ninthDoor && mazeOverlay && mazeClose) {
  mazeClose.addEventListener("click", closeLetterMaze);
  // Labyrinten lämnas endast via kryssknappen.
  mazeHost?.addEventListener("click", (event) => {
    if (event.target.closest(".maze-zoom-controls")) return;
    if (!mazeHost.classList.contains("maze-expanded")) setMazeExpanded(true);
  });
}
