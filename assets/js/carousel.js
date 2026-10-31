import { hexToString, removeColorClasses } from "./colors.js";
//Variable declaration
const carouselEl = document.querySelector(".carousel");
const titleEl = carouselEl.querySelector(".carousel__title");
const card = carouselEl.querySelector(".carousel__card");
const cardText = carouselEl.querySelector(".carousel__card_text");
const leftBtn = carouselEl.querySelector(".carousel__btn_type_left");
const rightBtn = carouselEl.querySelector(".carousel__btn_type_right");
const flipBtn = carouselEl.querySelector(".carousel__btn_type_flip");

// create a title string using templates
function getCarouselTitleString(deck, currentIndex) {
  return `${deck.name} · ${currentIndex + 1}/${deck.cards.length}`;
}

function renderCarouselView(deck) {
  // Index variable (both are changable and use let not const).
  let currentIndex = 0;
  // Showing the question if boolean is true and the answer if it is false.
  let showingQuestion = true;

  // Remove the past deck's color and apply the new deck's color.
  removeColorClasses(card);
  const colorName = hexToString(deck.color);

  if (colorName) {
    card.classList.add(`carousel__card_color_${colorName}`);
  }

  function updateDisplay() {
    // The current card is linked to its index number
    const currentCard = deck.cards[currentIndex];

    // Showing the question and answer upon showingQuestion variable status.
    if (showingQuestion) {
      cardText.textContent = currentCard.question;
      card.classList.remove("carousel__card_color_white");
    } else {
      cardText.textContent = currentCard.answer;
      card.classList.add("carousel__card_color_white");
    }

    // Retrieve title strings relative to their index number via
    // currentIndex variable.
    titleEl.textContent = getCarouselTitleString(deck, currentIndex);

    // Declare start and ending cards of the deck via currentIndex number.
    const isFirstCard = currentIndex === 0;
    const isLastCard = currentIndex === deck.cards.length - 1;

    // Toggle the diabled class for the arrow buttons using above variables.
    leftBtn.disabled = isFirstCard;
    leftBtn.classList.toggle("carousel__btn_disabled", isFirstCard);

    rightBtn.disabled = isLastCard;
    rightBtn.classList.toggle("carousel__btn_disabled", isLastCard);
  }

  // Show previous card and show the question side of it.
  // Also, MDN shows that multiple handlers won't be added to the same button
  // over many uses of long study sessions if using the "onclick" syntax instead of an
  // event listner. Cleaner also for easier reading.
  // Lastly decrement the index.
  leftBtn.onclick = () => {
    if (currentIndex > 0) {
      currentIndex -= 1;
      showingQuestion = true;
      updateDisplay();
    }
  };

  // Move to the next flashcard and then show its question side.
  // Also, increment the index.
  rightBtn.onclick = () => {
    if (currentIndex < deck.cards.length - 1) {
      currentIndex += 1;
      showingQuestion = true;
      updateDisplay();
    }
  };

  // Switch between the current card's question and answer sides.
  flipBtn.onclick = () => {
    showingQuestion = !showingQuestion;
    updateDisplay();
  };

  // Show the first card first upon load.
  updateDisplay();
}

export { renderCarouselView };
