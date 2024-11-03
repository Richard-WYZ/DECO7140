import { fetchRecipes } from "./components.js";

document.addEventListener("DOMContentLoaded", function () {
  fetchRecipes(displayRecipes, handleGETError);

  const searchButton = document.querySelector(".search-button");
  const searchBox = document.querySelector(".search-box");

  // search
  searchButton.addEventListener("click", () => {
    searchRecipes(searchBox.value);
  });

  searchBox.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      searchRecipes(searchBox.value);
    }
  });
});

// Function to display recipes as cards
function displayRecipes(recipes) {
  window.allRecipes = recipes; // store all recipes
  renderRecipes(recipes);
}

function renderRecipes(recipes) {
  const recipeList = document.querySelector(".recipe-list");
  recipeList.innerHTML = "";

  recipes.forEach((recipe) => {
    const recipeCard = document.createElement("div");
    recipeCard.className = "recipe-card"; // card component

    /*
    use both recipe name and created time to ensure the recipe is unique
    encode to avoid special characters like space or question mark
    */
    recipeCard.innerHTML = `
          <a href="./recipeDetails.html?name=${encodeURIComponent(
            recipe.recipe_name
          )}&created_at=${encodeURIComponent(recipe.created_at)}">
            <h3>${recipe.recipe_name}</h3>
            <img src="${recipe.image}" alt="${recipe.recipe_name}" />
            <p><strong>Author:</strong> ${recipe.author}</p>
            <p><strong>Cooking Time:</strong> ${recipe.cooking_time} minutes</p>
            <p><strong>Servings:</strong> ${recipe.servings}</p>
            <p><strong>Difficulty:</strong> ${recipe.difficulty_level}</p>
          </a>
      `;
    recipeList.appendChild(recipeCard);
  });
}

function handleGETError(Error) {
  console.log("Error", Error);
}

function searchRecipes(query) {
  const filteredRecipes = window.allRecipes.filter((recipe) =>
    recipe.recipe_name.toLowerCase().includes(query.toLowerCase())
  );
  renderRecipes(filteredRecipes);
}
