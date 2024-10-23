import { fetchRecipes } from "./components.js";

document.addEventListener("DOMContentLoaded", function () {
  fetchRecipes(displayRecipeContent, handleGETError);
});

// Function to display recipes content
function displayRecipeContent(recipes) {
  // get specific parameters in the url
  const urlParams = new URLSearchParams(window.location.search);
  const recipeName = urlParams.get("name");
  const createdAt = urlParams.get("created_at");

  const recipeDetail = document.querySelector(".detailed-information");
  // find current recipe by name and created time
  const cur_recipe = recipes.find(
    (r) => r.recipe_name === recipeName && r.created_at === createdAt
  );

  if (cur_recipe) {
    // exist
    document.querySelector("header h1").textContent = cur_recipe.recipe_name;
    recipeDetail.innerHTML = `
            <div class="detail-head">
              <div class="detail-info">
                <p><strong>Author:</strong> ${cur_recipe.author}</p>
                <p><strong>Cooking Time:</strong> ${
                  cur_recipe.cooking_time
                } minutes</p>
                <p><strong>Servings:</strong> ${cur_recipe.servings}</p>
                <p><strong>Difficulty:</strong> ${
                  cur_recipe.difficulty_level
                }</p>
              </div>
              <img src="${cur_recipe.image}" alt="${cur_recipe.recipe_name}" />
            </div>
            <div class="detail-body">
              <h3><strong>Ingredients:</strong></h3>
              <ul>
                  ${cur_recipe.ingredients
                    .map((ing) => `<li>${ing.name} (${ing.quantity})</li>`)
                    .join("")}
              </ul>
              <h3><strong>Instructions:</strong></h3>
              <p> ${cur_recipe.instructions}</p>
            </div>
        `;
  } else {
    console.error("Recipe not found");
    recipeDetail.innerHTML = "Recipe not found.";
  }
}

function handleGETError(Error) {
  console.log("Error", Error);
}
