$(document).ready(function () {

    var attemptsLeft = 15;
    var lettersGuessed = [];
    var wordToGuessArray = [];
    var showWinArray = [];
    var showWin = "";
    var displayLettersGuessed = "";
    var displayWord = "";
    var word = "";
    var gameStarted = false;
    var guessedBefore = false;
    var guessInWord = false;
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
            guessInWord = false;
            console.log(guessInWord);
            $("#keypress-error").text("");
            for (var i = 0; i < word.length; i++) {
                if (this.event.key === lettersGuessed[i]) {
                    $("#keypress-error").text(this.event.key + " has already been used");
                    guessedBefore = true;
                }
            }
            if(!guessInWord) {
                for(var i = 0; i < word.length; i++) {
                    if(this.event.key === word[i]) {
                        wordToGuessArray.splice(i, 1, word[i]);
                        lettersGuessed.push(this.event.key);
                        goodGuesses++;
                        guessInWord = true;
                        console.log("good guesses " + goodGuesses + " / " + word.length + " word length");
                    }
                }
                $("#word-to-guess").text(wordToGuessArray.join(" "));
            }

            if(!guessedBefore && !guessInWord) {
                    lettersGuessed.push(this.event.key);
                    displayLettersGuessed = lettersGuessed.join(" ");
                    $("#letters-guessed").text(displayLettersGuessed);
                    attemptsLeft--;
                    $("#attempts-left").text(attemptsLeft);
            }
        } else if (this.event.keyCode === 13) {
            console.log("enter was hit");

        } else {
            $("#keypress-error").text("You Cant Use That Key");
            console.log("not valid key");
        }
    }

    function reset() {
        attemptsLeft = 15;
        lettersGuessed = [];
        wordToGuessArray = [];
        showWinArray = [];
        showWin = "";
        displayLettersGuessed = "";
        displayWord = "";
        word = "";
        gameStarted = false;
        guessedBefore = false;
        guessInWord = false;
        gameOver = false;
        goodGuesses = 0;
    }

    document.onkeyup = function (event) {
        if(gameStarted && event.keyCode == 13 && gameOver) {
            console.log("game is finished need to restart now");
            reset();
        }
        if (!gameStarted && event.keyCode === 13) {
            $("#start-game").text("");
            $("#attempts-left").text(attemptsLeft);
            gameStarted = true;
            pickWord();
        }
        if (gameStarted) {
            if (goodGuesses === word.length - 1) {
                console.log("WIN");
                $("#word-to-guess").text(showWin);
                $("#start-game").text("You Won! Press ENTER to Play Again!");
                gameOver = true;
            } else if(attemptsLeft <= 1) {
                console.log("LOSS");
                $("#attempts-left").text("0");
                $("#start-game").text("You Loss... Press ENTER to Play Again!");
                gameOver = true;
            } else {
                letterGuess();
            }
        }
    };

});