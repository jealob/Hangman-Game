// JS for the Hangman game.

alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
console.log(alphabet);
var tarDiv = document.getElementById("current-word");
// var word = document.createElement("div");
// word.textContent = alphabet;
// tarDiv.appendChild(word);
tarDiv.innerHTML = alphabet;

// Call back for when the page is ready...
$(document).ready(function() {
    var wins  = 0;
    var guessLetter = "";
    var guessWord = [];
    var guessRemain = 12;
    var currentWord;
    var wordList = ["memo", "paper", "printer", "shelf", "ink", "pen", "conference"];
    // var wordList = ["busta rhymes","nicli minaj","rick ross","ludacris","kanye west","the game","nas","wayne","notorious big","jay z","","dmx","warren g","eminem","missy elliot","ll cool j","fifty cent","tupac", "snoppy dog","dr dre"];
    startGame(wordList);
    function startGame(wordList) {
        currentWord  = wordList[Math.floor(Math.random() * wordList.length)];
        console.log(currentWord);
    }

//Call back for when document is fully render to the browser
$(document).ready(function(){
    // Declare global variables
    var currentWord;
    var currentWordDisplay;
    var allGuesses;
    var presentGuess;
    var positionInWord;
    var positionInGuesses;
    var positionInDisplay;
    var wordList = ["memo", "paper", "printer", "shelf", "ink", "pen", "conference"];
    var guessRemain;
    // Start the Hangman game
    // debugger;
    startGame(wordList);
    // This function is run whenever the user presses a key.
    // for (var i = 0; i < guessRemain; i--){
        // debugger;
    document.onkeypress = function(event) {    
    checkGuessRemain();    // Check if round is over on a keyup event
    };
    // }

    function startGame(bank) {
        // debugger;
        currentWordDisplay =  "";
        allGuesses = "";
        currentWord  = (bank[Math.floor(Math.random() * bank.length)]).toUpperCase();
        guessRemain = currentWord.length;
        return guessRemain;
    }

    function letterCheck() {
        if (positionInWord === -1) { //letter not in word
            console.log("Not Found");
            // console.log("all geusses: " + allGuesses);
            positionInGuesses = allGuesses.search(presentGuess);//Check if already guessed and return position in allGuesses
            if (positionInGuesses === -1) {
                guessRemain --; // reduce guesses remaining by one 
                allGuesses += presentGuess + ' '; // Add to allGuesses already made. Does not require an array or for loop
                console.log("add to guesses");
                console.log("all geusses: " + allGuesses);
            }
            else {
                console.log("don't add to guesses");
                console.log("all geusses: " + allGuesses);
                // guessRemain--; Do not need to reduce guesses here as it might affect future accidental key press of correct key guesses.
                }
            }
        else { // letter in word
            console.log("Found");
            positionInDisplay = currentWordDisplay.search(presentGuess);
            if (positionInDisplay === -1) {
                currentWordDisplay += presentGuess + ' '; // For loop to go through array    
                console.log("current word display: " + currentWordDisplay);
                // break; 
            }
            else {
                console.log("current word display: " + currentWordDisplay);
            }
            
        }
    }
    function checkGuessRemain() { // Check if round is over
        while (guessRemain >= 1) {
            presentGuess = event.key.toUpperCase(); // Returns pressed key.
            console.log(presentGuess);
            positionInWord = currentWord.search(presentGuess); //Check if in current word and return position in currentWord
            letterCheck();
            console.log(guessRemain);
        }
        // else {
            // console.log("Game Over");
            startGame(wordList);
        // }
    }

});


});