$(document).ready(function () {

    var attemptsLeft = 15;
    var lettersGuessed = [];
    var wordToGuessArray = [];
    var showWinArray = [];
    var guessInWord = [];
    var showWin = "";
    var displayLettersGuessed = "";
    var displayWord = "";
    var word = "";
    var gameStarted = false;
    var guessedBefore = false;
    var guessInWordBefore = false;
    var gameOver = false;
    var goodGuesses = 0;

    var wordList = ["javascript", "array", "document", "element", "argument", "function", "variable", "program", "developer", "internet", "coffee", "sleep"];

    function pickWord() {
        word = wordList[Math.floor(Math.random() * wordList.length)];
        for (var i = 0; i < word.length; i++) {
            wordToGuessArray.push("_");
            showWinArray.push(word[i]);
        }
        displayWord = wordToGuessArray.join(" ");
        showWin = showWinArray.join(" ");
        $("#word-to-guess").text(displayWord);
        console.log(word);
    }

    function letterGuess() {
        if (this.event.key.match(/^[a-z]+$/)) {
            guessedBefore = false;
            guessInWordBefore = false;
            $("#keypress-error").text("");
            // Checks if letter has already been used
            for (var i = 0; i < word.length; i++) {
                if (this.event.key === lettersGuessed[i] || this.event.key === guessInWord[i]) {
                    $("#keypress-error").text(this.event.key + " has already been used");
                    guessedBefore = true;
                }
            }
            // If letter has NOT been used then check if letter is in word
            if (!guessInWordBefore && !guessedBefore) {
                for (var i = 0; i < word.length; i++) {
                    if (this.event.key === word[i]) {
                        wordToGuessArray.splice(i, 1, word[i]);
                        guessInWord.push(this.event.key);
                        goodGuesses++;
                        guessInWordBefore = true;
                        console.log("good guesses " + goodGuesses + " / " + word.length + " word length");
                        // Win condition
                        if (goodGuesses === word.length) {
                            $("#word-to-guess").text(showWin);
                            $("#start-game").text("You Won! Press ENTER to Play Again!");
                            gameOver = true;
                        }
                    }
                }
                $("#word-to-guess").text(wordToGuessArray.join(" "));
            }
            // If letter has NOT been used before and letter is NOT in word
            if (!guessedBefore && !guessInWordBefore) {
                lettersGuessed.push(this.event.key);
                displayLettersGuessed = lettersGuessed.join(" ");
                $("#letters-guessed").text(displayLettersGuessed);
                attemptsLeft--;
                $("#attempts-left").text(attemptsLeft);
                // Loss condition
                if (attemptsLeft <= 0) {
                    $("#attempts-left").text("0");
                    $("#start-game").text("You Loss... Press ENTER to Play Again!");
                    gameOver = true;
                }
            }
            // Checks when ENTER was hit after start of game
            // ** THIS IS A BUG ** \\
        } else if (this.event.keyCode === 13) {
            console.log("enter was hit and this is the bug");
        }
        // Checks if an invalid key was pressed
        else {
            $("#keypress-error").text("You Cant Use That Key");
        }
    }

    function reset() {
        attemptsLeft = 15;
        lettersGuessed = [];
        wordToGuessArray = [];
        showWinArray = [];
        guessInWord = [];
        showWin = "";
        displayLettersGuessed = "";
        displayWord = "";
        word = "";
        gameStarted = false;
        guessedBefore = false;
        guessInWordBefore = false;
        gameOver = false;
        goodGuesses = 0;
        $("#letters-guessed").text("");
    }

    document.onkeyup = function (event) {
        if (gameStarted && event.keyCode == 13 && gameOver) {
            console.log("Restarting");
            reset();
        }
        if (!gameStarted && event.keyCode === 13) {
            $("#start-game").text("");
            $("#attempts-left").text(attemptsLeft);
            gameStarted = true;
            pickWord();
        }
        if (gameStarted && !gameOver) {
            letterGuess();
        }
    };

});