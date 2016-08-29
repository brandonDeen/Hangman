var WORD = '', BLANK = [], GUESSES = [], WRONG = 0;

function getWord(){
    var requestStr = "http://randomword.setgetgo.com/get.php";

    $.ajax({
        type: "GET",
        url: requestStr,
        dataType: "jsonp",
        jsonpCallback: 'RandomWordComplete'
    });
}

function RandomWordComplete(data) {
    WORD = data.Word.toUpperCase();
    // console.log(WORD);

    for(var i=0; i<WORD.length; i++){ BLANK.push( '_' ); }

	//build blank spaces
	updateWordArea();
}

function updateWordArea(){
	$('#word_area').empty();
	for(var i=0; i<WORD.length; i++){
		$('#word_area').append("\t" + BLANK[i]);
	}

	if( BLANK.indexOf('_')==-1){
		$('#playagain').toggle();
	}
}

function handleGuess(){
	var guess = $('#guessbox').val().toUpperCase();
	if( isValid(guess) ){
		//add to guessed letters
		addGuess(guess);

		//if right show letters
		if(WORD.indexOf(guess) != -1){
			for(var i=0; i<WORD.length; i++){
				if(WORD[i] == guess){
					BLANK[i] = guess;
				}
			}
			updateWordArea();
		
			//if done show link to definition of word
			if( BLANK.indexOf('_') == -1 ){
				//show modal
				alert('You Win')
			}
		}
		//if wrong add to hangman
		else{
			WRONG++;
			//next hangman picture
			var src = "resources/" + WRONG + ".png";
			$('#gallows').attr('src', src);

			//if hangman complete show modal
			if(WRONG >= 7){
				alert('You Lose');
				BLANK = WORD.split('');
				updateWordArea();
			}
		}
		

			
	}
	else { 
		alert("Invalid Guess"); 
	}
	
}

function isValid(guess){
	return ( guess.match(/[A-Z]/) && GUESSES.indexOf(guess) == -1);
}

function addGuess(guess){
	GUESSES.push(guess);
	$('#guessed_letters').empty();
	for(var i=0; i<GUESSES.length; i++){
		$('#guessed_letters').append(GUESSES[i] + ", ");
	}
}


$(document).ready(function(){
	// get random word
	getWord();	
});