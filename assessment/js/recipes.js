import { postRecipes, fetchRecipes } from "./components.js";

function displayRecipes(Result) {
  console.log(Result);
}

function handleGETError(Error) {
  console.log("Error");
}

function handleSuccess(Result) {
  console.log(Result);
}

function handleError(Error) {
  console.log("Error");
}

fetchRecipes(displayRecipes, handleGETError);
