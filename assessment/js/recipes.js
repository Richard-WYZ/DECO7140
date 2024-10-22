import { fetchRecipes } from "./components.js";

// Function to display recipes as cards
function displayRecipes(recipes) {
  const recipeList = document.getElementById("recipe-list");
  recipeList.innerHTML = "";

  recipes.forEach((recipe) => {
    const recipeCard = document.createElement("div");
    recipeCard.className = "recipe-card"; // card component
    recipeCard.innerHTML = `
          <h3>${recipe.recipe_name}</h3>
          <img src="${recipe.image}" alt="${recipe.recipe_name}" />
          <p><strong>Author:</strong> ${recipe.author}</p>
          <p><strong>Cooking Time:</strong> ${recipe.cooking_time} minutes</p>
          <p><strong>Servings:</strong> ${recipe.servings}</p>
          <p><strong>Difficulty:</strong> ${recipe.difficulty_level}</p>
      `;
    recipeList.appendChild(recipeCard);
  });
}

function handleGETError(Error) {
  console.log("Error", Error);
}

fetchRecipes(displayRecipes, handleGETError);
