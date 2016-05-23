
/* **** Global Variables **** */
// try to elminate these global variables in your project, these are here just to start.

var playersGuess
var winningNumber = generateWinningNumber();
var guesses = [];
var maxGuesses = 8;
var guessesLeft = 8;

/* **** Guessing Game Functions **** */

// Generate the Winning Number

function generateWinningNumber(){
	// add code here
	return Math.floor((Math.random() * 100) + 1);
}

// Fetch the Players Guess

function playersGuessSubmission(){
	// add code here
	/*
	$('.section-mid').on('click', 'a', function(event){
		event.preventDefault();
		var playerGuess = +$(('.section-mid')).find('#guess').val();
		//console.log(playerGuess);
		$(this).closest('.section-mid').find('#guess').text("");
		//return playerGuess;
	});
	*/

	/*NOTE: I couldn't get the return key functionality to work*/

	function getPlayerGuess() {
		event.preventDefault();
		var guess = $('.section-mid').find('#guess');
		playersGuess = +guess.val();
		//console.log(playersGuess);
		guess.val("");
		checkGuess();
	}

	getPlayerGuess();


	$('input').keypress(function(e) {
    if(e.which == 13) {
        console.log("pressed enter");
		$('#submit').trigger("click");
		}
    });


}

// Determine if the next guess should be a lower or higher number

function lowerOrHigher(){
	// add code here
	var msg;
	var difference = Math.abs(playersGuess - winningNumber);
	var distance = Math.ceil(difference/5)*5;
	if (playersGuess > winningNumber){
		msg = "Your guess was higher than the winning number within " + distance + " digits";
	} else if (playersGuess < winningNumber) {
		msg = "Your guess was lower than the winning number within " + distance + " digits";
	}
	console.log(msg);
	var displayLowerHigher = $('.section-mid').find('#lowerHigher').text(msg);
}

// Check if the Player's Guess is the winning number 

function checkGuess(){
	// add code here
	var result;
	if(guesses.indexOf(playersGuess) == -1) {
			guesses.push(playersGuess);
			guessesLeft --;
	}

	if (playersGuess == winningNumber){
		result = "<font class='win'>You win!</font> <br><br>It took you " + (maxGuesses - guessesLeft) + " guesses";
		$('.section-mid').find('#lowerHigher').text("");
		$('.section-mid').find('#hint').text("");
		$('.section-mid').find('a').hide();
		$('.section-mid').find('input').hide();
	} else if (guessesLeft == 0){
		result = "<font class='lost'>Sorry, you lost.</font><br><br> Correct answer was " + winningNumber + ".";
		$('.section-mid').find('a').hide();
		$('.section-mid').find('input').hide();
		$('.section-mid').find('#lowerHigher').text("");
	} else {
		result = "Nope, try again. You have " + guessesLeft + " guesses left.";
		lowerOrHigher();
	}
	
	$('.section-mid').find('#results').html(result);

}

// Create a provide hint button that provides additional clues to the "Player"

function provideHint(){
	// add code here
	event.preventDefault();
	var hints = [];
	for (var i = 0; i < 2; i++) {
		do {
			var num = generateWinningNumber();
		} while((num == playersGuess) && (num == winningNumber))
		hints.push(num);
	}
	hints.push(winningNumber);
	console.log(hints);
	$('.section-mid').find('#hint').text("One of these is the corrent number: " + hints);

}

// Allow the "Player" to Play Again

function playAgain(){
	// add code here
	winningNumber = generateWinningNumber();
	guesses = [];
	var maxGuesses = 8;
	var guessesLeft = 8;
	playersGuess = null;
	$('.section-mid').find('a').show();
	$('.section-mid').find('input').show();
	$('.section-mid').find('#results').text("");
	$('.section-mid').find('#lowerHigher').text("");
	$('.section-mid').find('#hint').text("");
}

