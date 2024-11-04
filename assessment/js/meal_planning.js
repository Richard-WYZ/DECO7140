const recipes = document.querySelectorAll(".recipe-card");
const timeSlots = document.querySelectorAll(".time-slot");

// drag and drop
recipes.forEach((recipe) => {
  recipe.addEventListener("dragstart", dragStart);
});

timeSlots.forEach((slot) => {
  slot.addEventListener("dragover", dragOver);
  slot.addEventListener("drop", drop);
});

const recipeList = document.querySelector(".card-container");
recipeList.addEventListener("dragover", dragOver);
recipeList.addEventListener("drop", returnRecipe);

function dragStart(event) {
  event.dataTransfer.setData("text/plain", event.target.id);
}

function dragOver(event) {
  event.preventDefault();
}

function drop(event) {
  event.preventDefault();
  const recipeId = event.dataTransfer.getData("text/plain");
  const recipe = document.getElementById(recipeId);
  event.target.appendChild(recipe);
}

function returnRecipe(event) {
  event.preventDefault();
  const recipeId = event.dataTransfer.getData("text/plain");
  const recipe = document.getElementById(recipeId);
  recipeList.appendChild(recipe);
}
