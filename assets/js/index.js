import { decks, getDeckByID } from "./decks.js";
import { hexToString } from "./colors.js";
import { renderCarouselView } from "./carousel.js";
import { renderDeckView } from "./deck-view.js";

// Variable declaration
const deckTemplate = document.querySelector("#deck__template");
const deckList = document.querySelector(".gallery__list");

function createDeckEl(item) {
  const deckCard = deckTemplate.content.firstElementChild.cloneNode(true);

  // Link this card to its deck's personal URL.
  deckCard.dataset.deckId = item.id;
  const deckLink = deckCard.querySelector(".card__link");
  deckLink.href = `#deck/${item.id}`;

  deckCard.querySelector(".card__title").textContent = item.name;
  deckCard.querySelector(".card__count").textContent =
    `${item.cards.length} cards`;

  // Adjust colors according to their hexcodes.
  const colorName = hexToString(item.color);

  if (colorName) {
    deckCard.classList.add(`card_color_${colorName}`);
  }

  // Delete button for each card and functionality
  const deleteButton = deckCard.querySelector(".card__btn_type_delete");
  deleteButton.addEventListener("click", () => {
    const deckIndex = decks.indexOf(item);
    if (deckIndex !== -1) {
      decks.splice(deckIndex, 1);
    }
    deckCard.remove();
    if (window.location.hash === `#deck/${item.id}`) {
      window.location.hash = "#home";
    }
  });
  return deckCard;
}

// Render deckEl function creates the deck element
function renderDeckEl(item) {
  const deckCardToRender = createDeckEl(item);
  deckList.prepend(deckCardToRender);
}

// Use the above function to render each deck.
decks.forEach(renderDeckEl);

// Hash Routing
// Hash variable declaration
const homeView = document.querySelector("#home");
const mainContent = document.querySelector("#page__main-content");
const carouselView = document.querySelector(".carousel");
const deckDetailView = document.querySelector("#deck-view");
const notFoundView = document.querySelector("#not-found");
const practiceButton = deckDetailView.querySelector(".gallery__practice-btn");
let currentDeck = null;

practiceButton.addEventListener("click", (event) => {
  event.preventDefault();
  if (currentDeck) {
    window.location.hash = `#carousel/${currentDeck.id}`;
  }
});

function updateDeckCardCount(deck) {
  const deckCard = [...deckList.children].find(
    (element) => element.dataset.deckId === deck.id,
  );
  const count = deckCard?.querySelector(".card__count");

  if (count) {
    count.textContent = `${deck.cards.length} cards`;
  }
}

function deleteCard(deck, card) {
  const cardIndex = deck.cards.indexOf(card);
  if (cardIndex !== -1) {
    deck.cards.splice(cardIndex, 1);
  }

  updateDeckCardCount(deck);
  renderDeckView(deck, deleteCard);
}

function renderRoute() {
  // The hash includes "#", so remove it with slice(1) and then check its route.
  const hash = window.location.hash.slice(1);
  const isHomeRoute = hash === "" || hash === "home";
  const isCarouselRoute = hash.startsWith("carousel/");
  const isDeckRoute = hash.startsWith("deck/");

  // Find the deck object whose ID matches the one in the URL.
  currentDeck = null;

  if (isCarouselRoute || isDeckRoute) {
    const currentDeckID = hash.split("/")[1];
    currentDeck = getDeckByID(currentDeckID);
  }

  // A deck route is valid only if a valid deck was found.
  const showCarousel = isCarouselRoute && currentDeck;
  const showDeckView = isDeckRoute && currentDeck;

  if (showCarousel) {
    mainContent.classList.add("page__main-content_location_carousel");
  } else {
    mainContent.classList.remove("page__main-content_location_carousel");
  }

  // The styles work with existing CSS for .not-found.
  homeView.style.display = isHomeRoute ? "" : "none";
  carouselView.style.display = showCarousel ? "flex" : "none";
  deckDetailView.style.display = showDeckView ? "" : "none";
  notFoundView.style.display =
    isHomeRoute || showCarousel || showDeckView ? "none" : "";

  if (showCarousel) {
    renderCarouselView(currentDeck);
  }

  if (showDeckView) {
    renderDeckView(currentDeck, deleteCard);
  }
}

// Check route again when the hash changes and render again.
window.addEventListener("hashchange", renderRoute);

// Render the correct hash instantly when the page loads.
renderRoute();
