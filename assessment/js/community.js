import { postRecipes } from "./components.js";

document
  .getElementById("recipeForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission behaviour

    // Get the form element
    const form = document.getElementById("recipeForm");

    // Create FormData from the form
    const formData = new FormData(form);

    // change form content into correct format
    const ingredientsText = formData.get("ingredients");
    const ingredientsJson = ingredientsText.split("\n").map((ingredient) => {
      const [name, quantity] = ingredient.split(",");
      return { name: name.trim(), quantity: quantity.trim() };
    });

    // Set the formatted ingredients back to FormData
    formData.set("ingredients", JSON.stringify(ingredientsJson));

    // post request
    postRecipes(formData, handleSuccess, handleError);
  });

function handleSuccess(result) {
  console.log(result); // Log the result to the console
  document.getElementById("submitResponse").innerText =
    "Recipe uploaded successfully!";
}

function handleError(error) {
  console.error("Error:", error);
  document.getElementById("submitResponse").innerText =
    "Error uploading recipe.";
}

function cancelSubmission() {
  document.getElementById("recipeForm").reset(); // Reset the form fields
}
