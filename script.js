const firstDoor = document.querySelector('[data-door="1"]');
const overlay = document.querySelector("#letter-overlay");
const envelope = document.querySelector("#envelope");
const letter = document.querySelector("#letter");
const closeButton = document.querySelector(".letter-close");
const hintToggle = document.querySelector("#hint-toggle");
const hintOptions = document.querySelector("#hint-options");

if (hintToggle && hintOptions) {
  hintToggle.addEventListener("click", () => {
    const isHidden = hintOptions.hidden;
    hintOptions.hidden = !isHidden;
    hintToggle.setAttribute("aria-expanded", String(isHidden));
    hintToggle.textContent = isHidden ? "📜 Dölj facit" : "📜 Visa facit";
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
