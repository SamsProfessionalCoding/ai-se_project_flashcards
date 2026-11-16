const deckView = document.querySelector("#deck-view");
const title = deckView.querySelector(".deck-view__title");
const practiceButton = deckView.querySelector(".deck-view__practice-btn");
const cardsList = deckView.querySelector(".deck-view__cards");
const emptyMessage = deckView.querySelector(".deck-view__empty");
const cardTemplate = document.querySelector("#card__template");

function renderDeckView(deck, onDeleteCard) {
  title.textContent = deck.name;
  practiceButton.href = `#carousel/${deck.id}`;
  cardsList.replaceChildren();
  emptyMessage.hidden = deck.cards.length > 0;
  cardsList.style.setProperty("--deck-color", deck.color);

  deck.cards.forEach((card) => {
    const cardElement = cardTemplate.content.firstElementChild.cloneNode(true);
    const cardText = cardElement.querySelector(".deck-view__card-text");
    const flipButton = cardElement.querySelector(
      ".deck-view__card-btn_type_flip",
    );
    const deleteButton = cardElement.querySelector(
      ".deck-view__card-btn_type_delete",
    );
    let showingAnswer = false;

    cardText.textContent = card.question;
    flipButton.addEventListener("click", () => {
      showingAnswer = !showingAnswer;
      cardText.textContent = showingAnswer ? card.answer : card.question;
      cardElement.classList.toggle(
        "deck-view__card_flipped",
        showingAnswer,
      );
      flipButton.setAttribute("aria-pressed", String(showingAnswer));
      flipButton.setAttribute(
        "aria-label",
        showingAnswer ? "Show question" : "Show answer",
      );
    });

    deleteButton.addEventListener("click", () => {
      onDeleteCard(deck, card);
    });

    cardsList.append(cardElement);
  });
}

export { renderDeckView };
