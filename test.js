array = [1, 2, 3, 4, 5];

function shuffleArray(array) {
    let arrayLength = array.length;
    let indiciesOfArray = arrayLength - 1;
    let randNumber;
    let val1;
    let val2;
    let tempVal;

    for (index = indiciesOfArray; index >= 0; index--) {
        randNumber = Math.floor(Math.random() * indiciesOfArray) + 1;
        val1 = array[randNumber];
        val2 = array[index];
        tempVal = val2;

        array[index] = val1;
        array[randNumber] = tempVal;
    }
    return array;
}

array = console.log(shuffleArray(array));
