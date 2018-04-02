// JS for the Hangman game.

//Call back for when document is fully render to the browser
$(document).ready(function(){

    // Declare global variables
    alphabet = 'abcdefghijklmnopqrstuvwxyz'.toUpperCase();
    //  var wordList = ["memo", "paper", "printer", "shelf", "ink", "pen", "conference"];
    var wordList = ["bustarhymes","nicKiminaj","rickross","ludacris","kanyewest","thegame","nas","lilwayne","notoriousbig","jayz","","dmx","warreng","eminem","missyelliott","llcoolj","fiftycent","tupac", "snoopdogg","drdre","icecube", "beyonce", "aliciakeys", "coolio", "rihanna"];
    // var wordString = "MERRY";
    var word =[];
    var allGuesses;
    var rightGuesses;
    var wrongGuesses = '';
    var presentGuess;
    var positionInWord;
    var guessRemain;
    var wins = 0;
    var losses = 0;
    var rapImage;
    var rapSong;
    var stopSongRef;

    // Start the Hangman game
    startGame();
    document.onkeyup = function(event) { //keypress callback function
        presentGuess = event.key.toUpperCase(); // Returns pressed key.
        //Check if it is an alphabet and it already guessed and return position in allGuesses, make sure not to repeat both right or wrong guesses 
        if ((alphabet.search(presentGuess) !== -1) && (allGuesses.search(presentGuess) === -1)) { 
            allGuesses += presentGuess;
            letterChecker();    // Check if guess is right or wrong
            displayGame();
            if (rightGuesses === wordString) { 
                wins++;
                document.querySelector("#rapper").innerHTML = "<p>Guessed Right</p>" + rightGuesses;
                rapImage = "assets/images/" + rightGuesses + ".jpg";
                rapSong = "assets/images/" + rightGuesses + ".mp3";
                imageDisplay(rapImage, rightGuesses);
                if (stopSongRef !== undefined) { // Check if a song is playing
                    stopSongRef.pause();
                }
                stopSongRef = playSong(rapSong);
                setTimeout(function() {
                    startGame();
                },500);               
            }
            if (guessRemain < 1) {
                losses++;
                imageDisplay("hangman.png", hanged);
                document.querySelector("#rapper").innerHTML = "<p>Wrong</p>" + "<p>Hanged!!!</p>";
                playSong("assets/images/fail.mp3");
                setTimeout(function() {
                    startGame();
                },500);
            }
        }    
    };

    // Restarts after every round
    function startGame() {
        wrongGuesses = ' ';
        allGuesses = "";
        currentDisplay = [];
        //Randomly selects a word from the array wordList
        wordString  = (wordList[Math.floor(Math.random() * wordList.length)]).toUpperCase(); 
        // Put the selected word into an array
        word = wordString.split('');  
        guessRemain = wordString.length; 
        for (var i = 0; i < guessRemain; i++){
            currentDisplay[i] = "_";    
            //displays the game
        }
        displayGame(); 
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
        keySound("assets/images/wrong.mp3");
        guessRemain--;
        wrongGuesses += presentGuess + ","; // Add to wronglGuesses. Does not require an array or for loop
        
    };

    function isRight() {
        keySound("assets/images/right.mp3");
        for (var i = 0; i<word.length; i++){
            if (word[i] === presentGuess){
                currentDisplay[i] = presentGuess;
            } 
        }
        rightGuesses = currentDisplay.join(""); // Change the array currentDisplay to string for comparison (somehow my array comparison isn't working???)
    };

    function playSong(s) { // key sounds function 
        x = document.createElement("audio");
        x.setAttribute("src", s);
        x.play();
        return x;
    };

    function keySound(s) { // key sounds function 
        x = document.createElement("audio");
        x.setAttribute("src", s);
        x.play();
    };


    function displayGame(){
        // Creating a variable to hold our new HTML. Our HTML now keeps track of the user input
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
        
        
        // Set the inner HTML contents of the #game div to our html string
        document.querySelector("#game").innerHTML = scoreBoard;
        // document.querySelector("#image").innerHTML = rapImage;
    };

    function imageDisplay(pic, name) {
        var x = document.getElementById("image");
        x.setAttribute("src", pic);
        x.setAttribute("alt", name);
    }

});
