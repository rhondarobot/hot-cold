$(document).ready(function(){

	/*--- Display information modal box ---*/
  	$(".what").click(function(){
    	$(".overlay").fadeIn(1000);

  	});

  	/*--- Hide information modal box ---*/
  	$("a.close").click(function(){
  		$(".overlay").fadeOut(1000);
  	});
	
	/*--- Variable Declarations ---*/
	var randomNumber;
	var previousGuesses;
	var guessCount;
	var userInput;
	var correctGuess = false;

	/*--- Declaring newGame as a function---*/
	newGame(); //if you delete this, user input number guesses will result in "NaN"

	/*--- Creat new game on click ---*/
  	$(".new").click(function(event){
  		event.preventDefault();
  		newGame(); //need this here or new game button will not work
  	});

	/*--- Creating a new game function ---*/
	function newGame() {
		previousGuesses = true;
		guessCount = 0;
		correctGuess = false;
		$("ul#guessList li").remove();
		setFeedback("Make your Guess!");
		setCount(guessCount);
		randomNumber = generateNumber();
		setFocus();
		clearText();
	}

	/*--- Generate Random Number ---*/
	function generateNumber() {

		var generatedNumber = Math.floor((Math.random()*100)+1);
		console.log("Generated Random Number = "+ generatedNumber);

		return generatedNumber;
	}
	
	/*--- Set focus to the inputbox ---*/
	function setFocus() {
		document.getElementById("userGuess").focus();
	}

	/*--- Clear the text box ---*/
	function clearText() {
		$('#userGuess').val('');
	}

	/*--- Set the guess count ---*/
	function setCount(count) {
		$('#count').text(guessCount);
	}

	/*--- On Submit ---*/
	$("form").submit(function(event){
		
		event.preventDefault();
    	
    	if (!correctGuess) {
				userInput = $('#userGuess').val();
				console.log("User Choice = "+ userInput);
				clearText();
				setFocus();
				previousGuesses = checkChoice(userInput);
			if (!previousGuesses) {
				guessCount++;
				setCount(guessCount);
				$("ul#guessList").append("<li>" + userInput + "</li>");
				previousGuesses	= checkTemperature(Math.abs(randomNumber - userInput));
			};
		} //closing if !correctGuess
		else {
			setFeedback("You Won this game already! You need to start a new game.");
			//disableGuess();
		}; 
	}); //end form submit	

	/*--- Check if the User's Guess meets the rules---*/
	function checkChoice(userInput) {
		if (isNaN(userInput)) {
			setFeedback("No luck! I accept only numbers.");
			return true;
		} else if (userInput < 1 || userInput > 100) {
			setFeedback("Oops! Your guess has to be a number between 1 and 100!");
			return true;
		}else if ($.trim(userInput) == '') {
			setFeedback("Please enter your guess!");
			return true;
		} else {
			return false;
		};
	}

	/*--- Check the temperature for feedback ---*/
	function checkTemperature(tempRange) {

		if (tempRange == 0) {
			setFeedback("Yay! You guessed it!!");
			correctGuess = true;
			return false;
		} else if (tempRange <= 5) {
			setFeedback("Your Guess is getting too hot!");
			return true;
		} else if (tempRange <= 10){
			setFeedback("Your Guess is getting hot!");
			return true;
		} else if (tempRange>=10 && tempRange <= 20) {
			setFeedback("Your Guess is getting Warm!");
			return true;
		} else if (tempRange>=20 && tempRange <= 30) {
			setFeedback("Your Guess is getting cold!");
			return true;
		} else if (tempRange>=30 && tempRange <= 40) {
			setFeedback("Your Guess is getting very cold!");
			return true;
		} else {
			setFeedback("Your Guess is freezing cold!");
			return true;
		}

	}

	/*--- Set the feedback ---*/
	function setFeedback(feedback) {
		$('#feedback').text(feedback);
	}
}); //end of hot/cold app code
