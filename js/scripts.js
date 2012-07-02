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
*        Long ("Hold") Notes
*
*    ?.? Module System
*        PV Playback
*        UI Themes
*
***/

$(document).ready(function(){

	/***
	*
	*  Song System [SONG]
	*
	***/

	var songTitle = "";
	var mode = 0;
	var difficulty = 0;
	var tempo = 0;

	/***
	*
	*  Note System [NOTE]
	*
	***/

	var noteId = 0;

	var noteStart = [0, 0];
	var noteEnd = [0, 0];

	var noteSpawnTime = 0;
	var notePressTime = 0;
	var noteAccuracy = 0;
		
		// WORST
		var noteAccLevel0 = 0;

		// SAD
		var noteAccLevel1 = 0;

		// SAFE
		var noteAccLevel2 = 0;

		// FINE
		var noteAccLevel3 = 0;

		// COOL
		var noteAccLevel4 = 0;

	// 0 = regular note, 1 = long note, 2 = "arrow" note
	var noteType = 0;

	// 0 = triangle (up), 1 = circle (right), 2 = x (down), 3 = square (left)
	var noteButton = 0;

	function destroyNote() {
		noteAccuracy = (noteSpawnTime - notePressTime) / tempo;

		// Button Press check

		// Note type check
			// Regular note hit function
			// Long note hit function
			// Arrow note hit function

		// Note Accuracy check
			// Add score value to score
				// Assign score to appropriate score section (Song score, chance score) and check for combo
			// Add note accuracy levels to total

		// Note hit effect

		// Combo check
			// Add to current combo
			// OR break current combo

		// Show combo counter AND Accuracy level above note

		console.log('The destroyNote function just ran');

	};

	function createNote(noteSpawnTime, noteType, noteButton, noteStart, noteEnd, tempo) {
		setTimeout(function(){

			// Start "if hack", basically this if is here so I can target the children using $(this).children. Is there a better way to do this?
			if ($('#note-container').is(':visible')) {
				
				/***
				*  
				*  Note Syntax 
				*
				*  <div class="note-wrap">
				*    <div class="note"></div>
				*    <div class="note-target"></div>
				*  </div>
				*
				***/

				// Create the note semantics, assign a unique note ID using the noteId variable				
				$('#note-container').append('<div id="note-' + noteId + '" class="note-wrap"><div class="note"></div><div class="note-target"></div></div>');

				// Detect note type and create appropriate note and placeholder
				if (noteType == 0) {
					// Regular note
					$('.note').addClass('reg');

					// Spawn regular gray target
					$('.note-target').addClass('reg-target');
				} else if (noteType == 1) {
					// Long Note
					$('.note').addClass('long');

					// Spawn note target with border
					$('.note-target').addClass('long-target');

					// Spawn long note trail

					// Spawn second note at end of trail
				} else {
					// Arrow note
					$(this).children('.note').addClass('arrow');

					// Spawn arrow target
					$(this).children('.note-target').addClass('arrow-target');
				};

				// Detect note button and assign background to button and target
				if (noteButton == 0) {
					// Triangle (up) note
					$(this).children('.note').addClass('ui-note-triangle');
					$(this).children('.note-target').addClass('ui-note-triangle-target');
				} else if (noteButton == 1) {
					// Circle (right) note
					$('.note').addClass('ui-note-circle');
					$('.note-target').addClass('ui-note-circle-target');
				} else if (noteButton == 2) {
					// X (down) note
					$(this).children('.note').addClass('ui-note-x');
					$(this).children('.note-target').addClass('ui-note-x-target');
				} else {
					// Square (left) note
					$(this).children('.note').addClass('ui-note-square');
					$(this).children('.note-target').addClass('ui-note-square-target');
				};
			
				// Position the note and animate to the target using the tempo multiplied by a constant as animation speed
				$('#note-' + noteId).children('.note').css('left', noteStart[0] + '%');
				$('#note-' + noteId).children('.note').css('top', noteStart[1] + '%');
				$('#note-' + noteId).children('.note').animate({
					left: noteEnd[0] + '%',
					top: noteEnd[1] + '%'
				}, tempo * 15);

				// Positon the note target
				$('#note-' + noteId).children('.note-target').css('left', noteEnd[0] + '%');
				$('#note-' + noteId).children('.note-target').css('top', noteEnd[1] + '%');
				
				// Clock hand animation
				// When the note is pressed while the clock hand is at the top of the element, COOL is awarded

				/* Log all variables for testing
				console.log('noteSpawnTime: ' + noteSpawnTime);
				console.log('noteType: ' + noteType);
				console.log('noteButton: ' + noteButton);
				console.log('noteStart: ' + noteStart);
				console.log('noteEnd: ' + noteEnd);
				console.log('tempo: ' + tempo);
				console.log('noteId: ' + noteId); */

				// Call the destroy function just before the note ID changes
				destroyNote();

				// At the end of the function increase the note ID by one, creating a unique note
				noteId = noteId + 1;

				// All functions should come before the note ID changing (the line above This)

			// End if hack
			};
		}, (noteSpawnTime * 1000));
	};

	// createNote variables: noteSpawnTime, noteType, noteButton, noteStart, noteEnd, tempo
	createNote(1,0,1,[0,0],[39,24],127);
	createNote(2,0,1,[0,0],[43,24],127);
	createNote(3,0,1,[0,0],[47,24],127);
	createNote(4,0,1,[0,0],[51,24],127);
	createNote(5,0,1,[0,0],[55,24],127);
	createNote(6,0,1,[0,0],[59,24],127);

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

});