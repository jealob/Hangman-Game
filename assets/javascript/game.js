// JS for the Hangman game.

//Call back for when document is fully render to the browser
$(document).ready(function(){

    // Declare global variables

    // var wordList = ["memo", "paper", "printer", "shelf", "ink", "pen", "conference"];
    var wordList = ["bustarhymes","nicliminaj","rickross","ludacris","kanyewest","thegame","nas","wayne","notoriousbig","jayz","","dmx","warreng","eminem","missyelliot","llcoolj","fiftycent","tupac", "snoppy dog","dr dre"];
    // var wordString = "MERRY";
    var word =[];
    var allGuesses;
    var rightGuesses;
    var wrongGuesses;
    var presentGuess;
    var positionInWord;
    var guessRemain;
    var wins = 0;
    var losses = 0;

    // Start the Hangman game

    startGame();
    var keySound;
    document.onkeyup = function(event) { //keypress callback function
        presentGuess = event.key.toUpperCase(); // Returns pressed key.
        //Check if already guessed and return position in allGuesses
        if (allGuesses.search(presentGuess) === -1) { //make sure not to repeat both right or wrong guesses 
            allGuesses += presentGuess;
            letterChecker();    // Check if guess is right or wrong
            if (rightGuesses === wordString) {
                wins++;
                imageDisplay = rightGuesses;
                startGame();
            }
            if (guessRemain < 1) {
                losses++;
                imageDisplay = "";
                startGame();
            }
        }
        displayGame();
    };

    // Restarts after every round
    function startGame() {w
        allGuesses = "";
        wordString  = (wordList[Math.floor(Math.random() * wordList.length)]).toUpperCase(); //Randomly selects a word from the array wordList
        guessRemain = wordString.length; 
        wrongGuesses = "";
        currentDisplay = [];
        for (var i = 0; i<guessRemain; i++){
            currentDisplay[i] = "_";    // Prints "_" to the screen to place current word
            word[i] = wordString[i];    // Put the selected word into an array 
        }
        displayGame(); //displays the game
        };

    function letterChecker() { // Check if guess is right or wrong
        positionInWord = wordString.search(presentGuess); //Check if in  word and return position in word
        if (positionInWord === -1) { //letter not in word
            isWrong();
        }
        else { //letter in word
            isRight();
        }
    };

    function isWrong() {
        playSound("assets/images/wrong.mp3");
        guessRemain--; // reduce guesses remaining by one
        wrongGuesses += presentGuess + ","; // Add to wronglGuesses. Does not require an array or for loop
        
    }

    function isRight() {
        playSound("assets/images/right.mp3");
        for (var i = 0; i<word.length; i++){
            if (word[i] === presentGuess){
                currentDisplay[i] = presentGuess;
            } 
        }
        rightGuesses = currentDisplay.join(""); // Change the array currentDisplay to string for comparison (somehow my array comparison isn't working???)
    };

    function playSound(s) { // key sounds function
        keySound = document.createElement("audio");
        keySound.setAttribute("src", s);
        keySound.play();
    }

    function displayGame(){
        // Creating a variable to hold our new HTML. Our HTML now keeps track of the user and computer guesses, and wins/losses/ties.
        
        var scoreBoard =
        "<p>PRESS ANY KEY TO GET STARTED!</p>" +
        "<p>WINS</p>" +
        "<p> " + wins + "</p>" +
        "<p>LOSSES</p>" +
        "<p> " + losses + "</p>" +
        "<p>CURRENT WORD</p>" +
        "<p> " + currentDisplay.join(" ") + "</p>" +
        "<p>NUMBER OF GUESSES REMAINING</p>" +
        "<p> " + guessRemain + "</p>" +
        "<p>LETTERS ALREADY GUESSED</p>" +
        "<p> " + wrongGuesses + "</p>";
        
        // var  imagePanel = <
        
        
        // Set the inner HTML contents of the #game div to our html string
        document.querySelector("#game").innerHTML = scoreBoard;

    };

    });



    
    // function displayImage(){ // For game picture display and sound
        
    //     //     switch (key) {
    //     //         case value:
                    
    //     //             break;
            
    //     //         default:
    //     //             break;
    //     //     }
    //     //     document.getElementById("picture").src = "../images/hangman-rap.png";
    //     }
    

    // // document.querySelector("#picture").innerHTML = imagePanel;