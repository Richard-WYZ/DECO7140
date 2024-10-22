import { postRecipes, fetchRecipes } from "./components.js";

function displayRecipes(Result) {
  console.log(Result);
}

function handleGETError(Error) {
  console.log("Error");
}

function handleSuccess(Result) {
  const messageDiv = document.getElementById("submitResponse");
  messageDiv.textContent = "Thanks! ${Result.event_name} was posted!";
  messageDiv.style.color = "green";
  console.log(Result);
}

function handleError(Error) {
  const messageDiv = document.getElementById("submitResponse");
  messageDiv.textContent = "There was a problem. Please try again!";
  messageDiv.style.color = "red";
  console.log("Error");
}

function cancelSubmission() {
  document.getElementById("recipe-form").reset();
}

fetchRecipes(displayRecipes, handleGETError);
