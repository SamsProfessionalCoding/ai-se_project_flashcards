import { hexToString } from "./colors.js";

const deckView = document.querySelector("#deck-view");
const title = deckView.querySelector(".gallery__title");
const cardsList = deckView.querySelector(".gallery__list");
const emptyMessage = deckView.querySelector(".gallery__empty");
const cardTemplate = document.querySelector("#flashcard-template");

function renderDeckView(deck, onDeleteCard) {
  document.querySelector(".page").classList.remove("page_no-mobile-bar");
  title.textContent = deck.name;
  cardsList.replaceChildren();
  emptyMessage.hidden = deck.cards.length > 0;
  const colorName = hexToString(deck.color);

  deck.cards.forEach((card) => {
    const cardElement = cardTemplate.content.firstElementChild.cloneNode(true);
    const cardText = cardElement.querySelector(".card__title");
    const flipButton = cardElement.querySelector(".card__btn_type_flip");
    const deleteButton = cardElement.querySelector(".card__btn_type_delete");
    let showingAnswer = false;

    cardText.textContent = card.question;
    if (colorName) {
      cardElement.classList.add(`card_color_${colorName}`);
    }

    flipButton.addEventListener("click", () => {
      showingAnswer = !showingAnswer;
      cardText.textContent = showingAnswer ? card.answer : card.question;
      cardElement.classList.toggle("card_color_white", showingAnswer);
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
