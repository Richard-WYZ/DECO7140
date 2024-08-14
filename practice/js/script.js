import counter from "./counter.js";

// start-up code that that runs at or during page load
console.log(counter.getCount());
counter.increment();
console.log(counter.getCount());
counter.increment();
console.log(counter.getCount());
