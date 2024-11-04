import { fetchRecipes } from "./components.js";

document.addEventListener("DOMContentLoaded", function () {
  fetchRecipes(displayRecipes, handleGETError);

  // drag and drop recipes from recipe list
  const recipeList = document.querySelector(".card-container");
  recipeList.addEventListener("dragover", dragOver);
  document.addEventListener("drop", returnRecipe);

  // search recipes
  const searchButton = document.querySelector(".search-button");
  const searchBox = document.querySelector(".search-box");

  searchButton.addEventListener("click", () => {
    searchRecipes(searchBox.value);
  });

  searchBox.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      searchRecipes(searchBox.value);
    }
  });
});

function displayRecipes(recipes) {
  window.allRecipes = recipes; // store all recipes
  renderRecipes(recipes);
}

function renderRecipes(recipes) {
  const recipeContainer = document.querySelector(".card-container");
  recipeContainer.innerHTML = "";

  recipes.forEach((recipe, index) => {
    const recipeCard = document.createElement("div");
    recipeCard.className = "recipe-card";
    recipeCard.draggable = true;
    recipeCard.id = `recipe${index + 1}`; // unique id
    recipeCard.innerHTML = `
      <h3>${recipe.recipe_name}</h3>
      <img src="${
        recipe.image ? recipe.image : "./source/notAvailable.png"
      }" alt="${recipe.recipe_name}" />
    `;
    recipeContainer.appendChild(recipeCard);
  });

  enableDragAndDrop();
}

function handleGETError(error) {
  console.log("Error:", error);
}

// drag and drop recipes from recipe list
function enableDragAndDrop() {
  const recipes = document.querySelectorAll(".recipe-card");
  const timeSlots = document.querySelectorAll(".time-slot");

  recipes.forEach((recipe) => {
    recipe.addEventListener("dragstart", dragStart);

    // add touch event for mobile
    recipe.addEventListener("touchstart", touchStart);
    recipe.addEventListener("touchmove", touchMove);
    recipe.addEventListener("touchend", touchEnd);
  });

  timeSlots.forEach((slot) => {
    slot.addEventListener("dragover", dragOver);
    slot.addEventListener("drop", drop);
  });
}

function dragStart(event) {
  const recipeCard = event.target.closest(".recipe-card");
  const recipeId = recipeCard ? recipeCard.id : null;

  if (recipeId) {
    event.dataTransfer.setData("text/plain", recipeId);
    console.log(`Dragging recipe with id: ${recipeId}`);
  } else {
    console.error("Failed to set recipeId for drag event");
  }
}

function dragOver(event) {
  event.preventDefault();
}

function drop(event) {
  event.preventDefault();
  const recipeId = event.dataTransfer.getData("text/plain");

  if (!recipeId) {
    console.error("No recipeId found in dataTransfer");
    return;
  }

  const recipe = document.getElementById(recipeId);
  if (!recipe) {
    console.error(`Recipe with id ${recipeId} not found.`);
    return;
  }

  const timeSlot = event.target.closest(".time-slot");
  if (timeSlot) {
    timeSlot.querySelector(".slot-content").innerHTML = "";

    const recipeClone = recipe.cloneNode(true); // clone card
    recipeClone.draggable = true; // enable drag
    recipeClone.classList.add("dropped-card");

    // set event that can drag to remove card from time slot
    recipeClone.addEventListener("dragstart", dragStart);
    recipeClone.addEventListener("dragleave", handleDragLeave);

    timeSlot.querySelector(".slot-content").appendChild(recipeClone); // insert card
  }
}

function handleDragLeave(event) {
  const recipeId = event.target.id;

  // set timeout to prevent mistake
  setTimeout(() => {
    document.querySelectorAll(".time-slot").forEach((slot) => {
      const droppedCard = slot.querySelector(".dropped-card");
      if (droppedCard && droppedCard.id === recipeId) {
        slot.querySelector(".slot-content").innerHTML = "";
        console.log(`Removed recipe with id ${recipeId} from schedule`);
      }
    });
  }, 100); // time out 100ms
}

// check and remove card dragged from time slot
function returnRecipe(event) {
  event.preventDefault();
  const recipeId = event.dataTransfer.getData("text/plain");

  if (!recipeId) {
    console.error("No recipeId found in dataTransfer for return");
    return;
  }

  // judge if card are dragged out of time slot
  const targetSlot = event.target.closest(".time-slot");
  if (!targetSlot) {
    document.querySelectorAll(".time-slot").forEach((slot) => {
      const droppedCard = slot.querySelector(".dropped-card");
      if (droppedCard && droppedCard.id === recipeId) {
        slot.querySelector(".slot-content").innerHTML = "";
        console.log(`Removed recipe with id ${recipeId} from schedule`);
      }
    });
  }
}

// var for screen touch
let activeCard = null;
let startX = 0;
let startY = 0;

function touchStart(event) {
  const originalCard = event.target.closest(".recipe-card");
  if (originalCard) {
    // clone card
    activeCard = originalCard.cloneNode(true);
    document.body.appendChild(activeCard);

    // set start position
    startX = event.touches[0].clientX;
    startY = event.touches[0].clientY;

    activeCard.style.position = "absolute";
    activeCard.style.zIndex = 1000;
    activeCard.style.left = `${startX}px`;
    activeCard.style.top = `${startY}px`;

    document.body.style.overflow = "hidden";
  }
}

function touchMove(event) {
  if (!activeCard) return;

  event.preventDefault(); // ban scroll while moving

  const currentX = event.touches[0].clientX;
  const currentY = event.touches[0].clientY;

  // refresh location of card to follow the finger
  activeCard.style.left = `${currentX}px`;
  activeCard.style.top = `${currentY}px`;
}

function touchEnd(event) {
  if (!activeCard) return;

  const touchX = event.changedTouches[0].clientX;
  const touchY = event.changedTouches[0].clientY;

  const dropTarget = document.elementFromPoint(touchX, touchY);
  const timeSlot = dropTarget ? dropTarget.closest(".time-slot") : null;

  if (timeSlot) {
    timeSlot.querySelector(".slot-content").innerHTML = "";

    activeCard.classList.add("dropped-card");
    activeCard.style.position = "relative";
    activeCard.style.zIndex = "";
    activeCard.style.left = "";
    activeCard.style.top = "";

    // add card
    timeSlot.querySelector(".slot-content").appendChild(activeCard);

    // bind event to let it can be drag out
    activeCard.addEventListener("touchstart", touchStart);
    activeCard.addEventListener("touchmove", touchMove);
    activeCard.addEventListener("touchend", touchEnd);
  } else if (activeCard.classList.contains("dropped-card")) {
    // check drag out from time slot
    const parentSlot = document
      .querySelector(".time-slot .slot-content .dropped-card")
      .closest(".time-slot");
    if (parentSlot) {
      parentSlot.querySelector(".slot-content").innerHTML = "";
    }
    activeCard.remove(); // remove card
  } else {
    // remove clone
    activeCard.remove();
  }

  // add back scroll
  document.body.style.overflow = "";
  activeCard = null;
}

// search
function searchRecipes(query) {
  const filteredRecipes = window.allRecipes.filter((recipe) =>
    recipe.recipe_name.toLowerCase().includes(query.toLowerCase())
  );
  renderRecipes(filteredRecipes);
}
