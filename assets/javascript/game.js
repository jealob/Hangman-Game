// JS for the Hangman game.

//Call back for when document is fully render to the browser
$(document).ready(function(){

    // Declare global variables

    var wordList = ["memo", "paper", "printer", "shelf", "ink", "pen", "conference"];
    // var wordList = ["busta rhymes","nicli minaj","rick ross","ludacris","kanye west","the game","nas","wayne","notorious big","jay z","","dmx","warren g","eminem","missy elliot","ll cool j","fifty cent","tupac", "snoppy dog","dr dre"];
    var word= "MERRY";
    // var wordDisplay;
    var allGuesses;
    var rightGuesses;
    var wrongGuesses;
    var presentGuess;
    var positionInWord;
    // var positionInGuesses;
    // var positionInDisplay;
    var currentWord;
    var guessRemain;
    var wins = 0;
    var losses = 0;

    // Start the Hangman game

    startGame();
        
    document.onkeypress = function(event) { //keypress callback function
        // debugger;
        presentGuess = event.key.toUpperCase(); // Returns pressed key.
        
        //Check if already guessed and return position in allGuesses
        if (allGuesses.search(presentGuess) === -1) { //make sure not to repeat both right or wrong guesses 
            allGuesses += presentGuess;
            console.log("all guesses: " + allGuesses);
            letterChecker();    // Check if guess is right or wrong
            if (word === rightGuesses) {
                //debugger;
                wins++;
                console.log("Wins!!! Next Round");
                startGame();
            }

            if (guessRemain < 1) {
                losses++;
                console.log("Lose!!! Next Round");
                startGame();
            }
        }
        displayGame();
    };

    function startGame() {
        // debugger;
        // wordDisplay =  "";
        allGuesses = "";
        wrongGuesses = "";
        //word  = (wordList[Math.floor(Math.random() * wordList.length)]).toUpperCase();
        guessRemain = word.length;
        currentWord  = (" " * guessRemain);
        rightGuesses = "";
        //return guessRemain;
    };

    function letterChecker() { // Check if guess is right or wrong
        positionInWord = word.search(presentGuess); //Check if in  word and return position in word
        if (positionInWord === -1) { //letter not in word
            isWrong();
        }
        else { //letter in word
            isRight(positionInWord);
        }
        console.log(guessRemain);
    };

    function isRight(pos) {
        // rightGuesses = rightGuesses.splice(positionInWord, 0, presentGuess);
        // debugger;   
        for (var i =  pos; i < word.length; i++){
            if (word[i] === presentGuess){
                console.log("double letter found");
                rightGuesses = insert(rightGuesses, pos, presentGuess);
                // rightGuesses = word[i];
            }
        }
        console.log("right guesses: " + rightGuesses);
        return rightGuesses;
    };

    function isWrong() {
        guessRemain--; // reduce guesses remaining by one 
        wrongGuesses += presentGuess + " ";  // Add to wronglGuesses. Does not require an array or for loop
        console.log("wrong guesses: " + wrongGuesses);
        return wrongGuesses;
    };

    function insert(str, index, value) {
    return str.substr(0, index) + value + str.substr(index);
    }   
    function displayGame(){
        // Creating a variable to hold our new HTML. Our HTML now keeps track of the user and computer guesses, and wins/losses/ties.
        
        var html =
        "<p>PRESS ANY KEY TO GET STARTED!</p>" +
        "<p>WINS</p>" +
        "<p> " + wins + "</p>" +
        "<p>LOSSES</p>" +
        "<p> " + losses + "</p>" +
        "<p>CURRENT WORD</p>" +
        "<p> " + currentWord + "</p>" +
        "<p>NUMBER OF GUESSES REMAINING</p>" +
        "<p> " + guessRemain + "</p>" +
        "<p>LETTERS ALREADY GUESSED</p>" +
        "<p> " + wrongGuesses + "</p>";

        // Set the inner HTML contents of the #game div to our html string
        document.querySelector("#game").innerHTML = html;
    };

    });