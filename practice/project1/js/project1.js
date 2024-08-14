import counter from "../../js/counter.js";

// attach event listeners to elements
document.getElementById("voteBtn").addEventListener("click", upVote)

// functions
function upVote(){
    counter.increment()
    console.log(counter.getCount())
    document.getElementById("voteValue").innerText = counter.getCount()
}