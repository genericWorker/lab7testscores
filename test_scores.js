let names = ["Ben", "Joel", "Judy", "Anne"];
let scores = [88, 98, 77, 88];

var $ = function (id) { return document.getElementById(id); };

let avgScores = scores.reduce((a, b) => a + b) / scores.length;

function getHighScore() {
	let i=0,max=0,len = scores.length;
	let name = '';
	for (i; i < len; i++) {
		if (scores[i] > max) {
			max = scores[i];
			name = names[i];
		}
	}
	return name + ' with score of ' + max;
}

function displayResults(avgScore, highScoreName, highScore) {
	let results = $('results');
	if (results.style.display == 'inline') {
		results.syle.display = 'none';
	}
	else {
		results.style.display = 'inline';
	}
	$('avgScore').innerHTML = avgScores;
	$('highScore').innerHTML = getHighScore();
}

//  insert a new element in the html table after current index.  Assumes, names and scores are updates already.
function insertTableElement(scoresTable, rowIndex) {
	    var rowCount = scoresTable.rows.length;
		let row = scoresTable.insertRow( rowCount );
		let name = row.insertCell( 0 );
		var score = row.insertCell( 1 );
		name.innerHTML = names[rowCount-1];
		score.innerHTML = scores[rowCount-1];
}

// display the scores table if it's not already displayed.  In this case add the table elements to the
// table
function displayScores() {
    if ($("scores").style.display == 'none') {
		$( "scores" ).style.display = "inline";
		for (let i = 0; i < scores.length; i++) {
			insertTableElement( $( "scores_table" ), i );
		}
	}
}

function addScore() {
	if ($('score').value == '' || $('name').value == '') {
		alert("Name and score must have values");
		return;
	}
	displayScores();
	scores.push(parseInt($("score").value));
	names.push($("name").value);
	insertTableElement( $( "scores_table" ), scores.length);
	$("score").value = "";
	$("name").value = "";
	displayResults();
}

window.onload = function () {
	$("add").onclick = addScore;
	$("display_results").onclick = displayResults;
	$("display_scores").onclick = displayScores;
	var name = $("name");
	var score = $("score");

	name.addEventListener("keyup", function(event) {
		if (event.key == "Enter") {
			$("score").focus();
		}
	});
	score.addEventListener("keyup", function(event) {
		if (event.key == "Enter") {
			$("add").click();
		}
	});
};


