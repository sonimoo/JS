const arr = ["radar", "apple", "civic", "banana"];

function filterPalindromes(arr) {
    const newArr = []

    for (let i = 0; i < arr.length; i++) {
        
        let word = arr[i];
        let reversed = word.split("").reverse().join("");
        if (reversed === word) {
            newArr.push(word);
        }
    }
    return newArr;
}


console.log(filterPalindromes(arr))