import { fetchRecipes } from "./components.js";

document.addEventListener("DOMContentLoaded", function () {
  fetchRecipes(displayRecipeContent, handleGETError);

  // Set the back button to navigate to the previous page
  const backButton = document.querySelector(".btn-back");
  backButton.addEventListener("click", function () {
    const prevPage = sessionStorage.getItem("prevPage");
    if (prevPage) {
      window.location.href = prevPage;
    } else {
      window.location.href = "index.html"; // back to home page by default
    }
  });
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

    // use default image if there are no image in the api
    const imageUrl = cur_recipe.image
      ? cur_recipe.image
      : "./source/notAvailable.png";

    recipeDetail.innerHTML = `
            <div class="detail-head">
              <h2>${cur_recipe.recipe_name}</h2>
              </br>
              <div class="detail-info">
                <table>
                  <tr>
                    <th>Author:</th>
                    <td>${cur_recipe.author}</td>
                  </tr>
                  <tr>
                    <th>Cooking Time:</th>
                    <td>${cur_recipe.cooking_time} minutes</td>
                  </tr>
                  <tr>
                    <th>Servings:</th>
                    <td>${cur_recipe.servings}</td>
                  </tr>
                  <tr>
                    <th>Difficulty:</th>
                    <td>${cur_recipe.difficulty_level}</td>
                  </tr>
                </table>
              </div>
              <img src="${imageUrl}" alt="${cur_recipe.recipe_name}" />
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
