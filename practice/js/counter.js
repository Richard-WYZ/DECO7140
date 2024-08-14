let count = 0;

function increment(){
    count++;
}

function getCount(){
    return count;
}

export default {"increment":increment, "getCount":getCount};