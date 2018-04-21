$(document).ready(function () {

    var attemptsLeft = 15;
    var lettersGuessed = [];
    var wordToGuessArray = [];
    var displayLettersGuessed = "";
    var displayWord = "";
    var word = "";
    var gameStarted = false;
    var guessed = false;
    var goodGuesses = 0;

    var wordList = ["javascript", "array", "document", "element", "argument", "function", "variable", "program", "developer", "internet", "coffee", "sleep"];

    function pickWord() {
        word = wordList[Math.floor(Math.random() * wordList.length)];
        for (var i = 0; i < word.length; i++) {
            wordToGuessArray.push("-");
        }
        displayWord = wordToGuessArray.join(" ");
        $("#word-to-guess").text(displayWord);
    }

    function letterGuess() {
        if (this.event.key.match(/^[a-z]+$/)) {
            for (var i = 0; i < word.length; i++) {
                if (this.event.key === lettersGuessed[i]) {
                    console.log(this.event.key + " has been used");
                    guessed = true;
                }
            }
            if(!guessed) {
                lettersGuessed.push(this.event.key);
                displayLettersGuessed = lettersGuessed.join(" ");
                $("#letters-guessed").text(displayLettersGuessed);
            }

        } else if (this.event.keyCode === 13) {
            console.log("enter was hit");

        } else {
            console.log("not valid key");
        }
    }










    document.onkeyup = function (event) {
        if (!gameStarted && event.keyCode === 13) {
            $("#start-game").text("");
            gameStarted = true;
            pickWord();
        }
        if (gameStarted) {
            if (goodGuesses === word.length) {
                console.log("WIN");
            } else {
                letterGuess();
            }
        }
    };

});