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

// search
function searchRecipes(query) {
  const filteredRecipes = window.allRecipes.filter((recipe) =>
    recipe.recipe_name.toLowerCase().includes(query.toLowerCase())
  );
  renderRecipes(filteredRecipes);
}
