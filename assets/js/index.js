import { decks, getDeckByID } from "./decks.js";
import { hexToString } from "./colors.js";
import { renderCarouselView } from "./carousel.js";

// Variable declaration
const deckTemplate = document.querySelector("#deck__template");
const deckList = document.querySelector(".decks__list");

function createDeckEl(item) {
  const deckCard = deckTemplate.content.firstElementChild.cloneNode(true);

  // Link this card to its deck's personal URL.
  const deckLink = deckCard.querySelector(".deck__link");
  deckLink.href = `#carousel/${item.id}`;

  deckCard.querySelector(".deck__title").textContent = item.name;
  deckCard.querySelector(".deck__count").textContent =
    `${item.cards.length} cards`;

  // Adjust colors according to their hexcodes.
  const colorName = hexToString(item.color);

  if (colorName) {
    deckCard.classList.add(`deck_color_${colorName}`);
  }

  // Delete button for each card and functionality
  const deleteButton = deckCard.querySelector(".deck__delete-btn");
  deleteButton.addEventListener("click", () => {
    deckCard.remove();
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
const notFoundView = document.querySelector("#not-found");

function renderRoute() {
  // The hash includes "#", so remove it with slice(1) and then check its route.
  const hash = window.location.hash.slice(1);
  const isHomeRoute = hash === "" || hash === "home";
  const isCarouselRoute = hash.startsWith("carousel/");

  // Find the deck object whose ID matches the one in the URL.
  // Note that a hash such as "carousel/html-basics", just "html-basics"
  // is found.
  let currentDeck;

  if (isCarouselRoute) {
    const currentDeckID = hash.split("/")[1];
    currentDeck = getDeckByID(currentDeckID);
  }

  // The carousel route is valid only if a valid deck was found.
  const showCarousel = isCarouselRoute && currentDeck;

  // Select showCarousel, if it is true (valid deck found) add the spacing class,
  //  otherwise remove it.
  if (showCarousel) {
    mainContent.classList.add("page__main-content_location_carousel");
  } else {
    mainContent.classList.remove("page__main-content_location_carousel");
  }

  // The styles work with existing CSS for .not-found.
  homeView.style.display = isHomeRoute ? "" : "none";
  carouselView.style.display = showCarousel ? "flex" : "none";
  notFoundView.style.display = isHomeRoute || showCarousel ? "none" : "";

  // Give selected deck (currentIndex number) the carousel renderer from
  // carousel.js
  if (showCarousel) {
    renderCarouselView(currentDeck);
  }
}

// Check route again when the hash changes and render again.
window.addEventListener("hashchange", renderRoute);

// Render the correct hash instantly when the page loads.
renderRoute();
