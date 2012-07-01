/***
*
*  Project R - Nathan Butler - iamnbutler@gmail.com
*
*  Scripts and functions
*
***/

/***
*
*  Function development order:
*    1.0 Note System
*        Song System
*        Score System
*        Control System
*
*    1.1 Item System
*        Currency System
*        Control Options
*        General Options
*
*    ?.? Module System
*        PV Playback
*        UI Themes
*
***/

/***
*
*  Song System [SONG]
*
***/

var songTitle = ""
var mode = 0;
var difficulty = 0;
var tempo = 0;

/***
*
*  Note System [NOTE]
*
***/

var noteStart = [0, 0];
var noteEnd = [0, 0];

var noteSpawnTime = 0;
var notePressTime = 0;
var noteAccuracy = 0;
	
	// WORST
	noteAccLevel0 = 0;

	// SAD
	noteAccLevel1 = 0;

	// SAFE
	noteAccLevel2 = 0;

	// FINE
	noteAccLevel3 = 0;

	// COOL
	noteAccLevel4 = 0;

function createNote(noteStart, noteEnd, tempo) {

}

function destroyNote() {
	noteAccuracy = (noteSpawnTime - notePressTime) / tempo;

}

/***
*
*  Score System [SCOR]
*
***/

// Total score points at the end of a song (0 - 999,999)
var score = 0;

	// Stage sub-scores
	var stageScore = 0;
	var comboBonus = 0;
	var chanceScore = 0;

var highScore = 0;

// 0 = MISSxTAKE, 1 = STANDARD, 2 = GREAT, 3 = EXCELLENT, 4 = PERFECT
var grade = 0;

var notesTotal = 0;
var notesPassed = 0;
var notePercentage = 0;

// Calculate the percentage of notes hit, and assign grade
function calculateScore(notesPassed, notesTotal) {
	// Calculate the percentage of notes hit. This value will always be rounded down to the nearest percent.
	notePercentage = (Math.floor(notesPassed / notesTotal) * 100);

	if (notePercentage >= 85) {
		grade = 1;
	} else if (notePercentage >= 95) {
		grade = 2;
	} else if (notePercentage >= 97) {
		grade = 3;
	} else if (notePercentage = 100) {
		grade = 4;
	} else {
		// Song failed, assign MISSxTAKE grade
		grade = 0;
	}

	// Calculate total score
	score = (stageScore + comboBonus + chanceScore)

	// Compare score agains high score
	if (score > highScore) {
		highScore = score;
	}
}

/***
*
*  Currency System [CURR]
*
***/