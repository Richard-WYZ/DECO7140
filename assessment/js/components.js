const studentNumber = "s4901843";
const uqcloudZoneID = "2ec50a01";

const myheaders = new Headers();
myheaders.append("student_number", studentNumber);
myheaders.append("uqcloud_zone_id", uqcloudZoneID);

// post recipes into API
function postRecipes(recipesData, handleSuccess, handleError) {
  fetch(
    "https://damp-castle-86239-1b70ee448fbd.herokuapp.com/decoapi/genericrecipe/",
    {
      method: "POST",
      headers: myheaders,
      body: recipesData,
    }
  )
    .then((response) => {
      if (!response.ok) {
        return response.json().then((err) => {
          console.error("Server Error response: ", err);
          throw new Error(err.detail || "Something went wrong!");
        });
      }
      return response.json();
    })
    .then((Result) => {
      console.log("Event Created: ", Result);
      handleSuccess(Result);
    })
    .catch((Error) => {
      console.error("Error: ", Error.message);
      handleError(Error);
    });
}

// get recipes from API
function fetchRecipes(displayRecipes, handleGETError) {
  fetch(
    "https://damp-castle-86239-1b70ee448fbd.herokuapp.com/decoapi/genericrecipe/",
    {
      method: "GET",
      headers: myheaders,
      redirect: "follow",
    }
  )
    .then((response) => {
      if (!response.ok) {
        return response.json().then((err) => {
          console.error("Server Error response: ", err);
          throw new Error(err.detail || "Something went wrong!");
        });
      }
      return response.json();
    })
    .then((Result) => {
      console.log("Event Created: ", Result);
      displayRecipes(Result);
    })
    .catch((Error) => {
      console.error("Error: ", Error.massage);
      handleGETError(Error);
    });
}

export { postRecipes, fetchRecipes };
