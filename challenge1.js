/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/



var scores, roundScore, activePlayer, gameplayed, i, winningScore;

init();

var lastRoll, lastRoll2;

//////////////////////
// Roll button
document.querySelector(".btn-roll").addEventListener("click", function(){
	if (gameplayed){
		// 1. Drop a random number
		var dice = Math.floor(Math.random() * 6) + 1;
		var dice2 = Math.floor(Math.random() * 6) + 1;
		
		
		// 2. display result
		document.querySelector("#dice-1").style.display = "block";
		document.querySelector("#dice-1").src = "dice-" + dice + ".png";
		console.log(dice);

		document.querySelector("#dice-2").style.display = "block";
		document.querySelector("#dice-2").src = "dice-" + dice2 + ".png";
		console.log(dice2);

		console.log(dice + dice2);
		// 3. Update/print OR LOOSE the score IF the rolled number was NOT 1 OR double 6
		if (dice === 6 && dice2 === 6) {
			scores[activePlayer] = 0;
			document.getElementById("score-" + activePlayer).textContent = scores[activePlayer];
			setTimeout(function(){ nextPlayer(); }, 1000);	
		}
		else if (dice !== 1 && dice2 !== 1){
			//Add Score
			roundScore += dice + dice2;
			document.querySelector("#current-" + activePlayer).textContent = roundScore;
		}
		else {
			//Next player
			setTimeout(function(){ nextPlayer(); }, 1000);	
		}
		lastRoll = dice;
		lastRoll2 = dice2;
	}
});

//////////////////
// Hold button
document.querySelector(".btn-hold").addEventListener("click", function(){
	if (gameplayed) {
		//1. Add current score to global score
		scores[activePlayer] += roundScore;

		//2. Update UI 
		document.getElementById("score-" + activePlayer).textContent = scores[activePlayer];

		var input = document.querySelector("#numberInput").value;
		var winningScore;
		// undefined nill or 0 is COERCED to false
		// Anything else is corced to true
		if (input) {
			winningScore = input;
		} else {
			winningScore = 20;
		}


		//3. check if player has won
		if (scores[activePlayer] >= winningScore) {
			document.getElementById("name-" + activePlayer).textContent = "WINNER!";
			document.querySelector("#dice-1").style.display = "none";
			document.querySelector("#dice-2").style.display = "none";
			document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
			document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
			document.getElementById("current-" + activePlayer).textContent = 0;
			gameplayed = false;
		} 
		else {
			nextPlayer();
		}
	}	
});


//////////////////
// New button
document.querySelector(".btn-new").addEventListener("click", init);

/*
//////////////////
// Input listener
document.querySelector("#numberInput").addEventListener("change", function(){
	// 1.) retrieving value
	var inputValue = document.querySelector("#numberInput").value;
	// 2.) passing it over winningScore value
	init();
	winningScore = Number(inputValue);
	// 3.) Setting initital value in case of changing it during the game
	
});
*/




function nextPlayer(){
activePlayer === 0 ? activePlayer = 1 : activePlayer = 0; //TERNIARY OPERATOR IT IS LIKE AN IF STATEMENT
roundScore = 0;
lastRoll = 0;
lastRoll2 = 0;

document.getElementById("current-0").textContent = 0;
document.getElementById("current-1").textContent = 0;
	
document.querySelector(".player-0-panel").classList.toggle("active");
document.querySelector(".player-1-panel").classList.toggle("active");
document.querySelector("#dice-1").style.display = "none";
document.querySelector("#dice-2").style.display = "none";

}


function init() {
	scores = [0, 0];
	roundScore = 0;
	activePlayer = 0;
	gameplayed = true;
	winningScore;

	document.querySelector("#dice-1").style.display = "none";
	document.querySelector("#dice-2").style.display = "none";
	document.getElementById("score-0").textContent = 0;
	document.getElementById("current-0").textContent = 0;
	document.getElementById("score-1").textContent = 0;
	document.getElementById("current-1").textContent = 0;
	document.getElementById("name-0").textContent = "Player 1";
	document.getElementById("name-1").textContent = "Player 2";

	document.querySelector(".player-0-panel").classList.remove("winner");
	document.querySelector(".player-1-panel").classList.remove("winner");
	document.querySelector(".player-0-panel").classList.remove("active");
	document.querySelector(".player-1-panel").classList.remove("active");
	document.querySelector(".player-0-panel").classList.add("active");
}




