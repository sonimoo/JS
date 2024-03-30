function removeVowels(str) {
    const vowels = ["a", "e","i","o","u","A","E","I","O","U"];
    let result = "";

    for (let char of str) {
        if (!vowels.includes(char)){
            result += char;
        }
    }
    return result;
}

console.log(removeVowels("This website is for losers LOL!"))