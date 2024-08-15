// define
const weatherURL =
  "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m";

// functions for genarate use
async function getWeather(){
    let response = await fetch(weatherURL);
    let data = await response.json();
    return data;
}

// start up code
console.log("Retireving weather data");
console.log(await getWeather())