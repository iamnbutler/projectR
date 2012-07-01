/***
*
*  Project R - Nathan Butler - iamnbutler@gmail.com
*
*  Scripts and functions
*
***/

/***
*
*  Song System [SONG]
*
***/

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

function calculateAccuracy() {

}

/***
*
*  Score System [SCOR]
*
***/

// Total score points at the end of a song (0 - 999,999)
var score = 0;

// 0 = MISSxTAKE, 1 = STANDARD, 2 = GREAT, 3 = EXCELLENT, 4 = PERFECT
var grade = 0;

var notesTotal = 0;
var notesPassed = 0;
var notePercentage = 0;

// Calculate the percentage of notes hit, and assign grade
function calculateScore() {
	notePercentage = (notesPassed / notesTotal) * 100;

}