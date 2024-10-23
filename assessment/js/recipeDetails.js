import { fetchRecipes } from "./components.js";

// get specific parameters in the url
const urlParams = new URLSearchParams(window.location.search);
const recipeName = urlParams.get("name");
const createdAt = urlParams.get("created_at");

// Function to display recipes content
function displayRecipeContent(recipes) {
  const recipeDetail = document.querySelector(".detailed-information");
  // find current recipe by name and created time
  const cur_recipe = recipes.find(
    (r) => r.recipe_name === recipeName && r.created_at === createdAt
  );

  if (cur_recipe) {
    document.getElementById(
      "header"
    ).innerHTML = `<h1>${cur_recipe.recipe_name}</h1>`;
    // exist
  } else {
    console.error("Recipe not found");
    recipeDetail.innerHTML = "Recipe not found.";
  }
}

function handleGETError(Error) {
  console.log("Error", Error);
}

fetchRecipes(displayRecipeContent, handleGETError);
