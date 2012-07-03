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
*        Multi-language support
*
***/

$(document).ready(function(){

	/***
	*
	*  UI System [UI]
	*
	***/

	// Three letter language code - "eng", "jpn" - This variable should select the appropriate songTitle and lyric track for the song system
	var language = "";

	/***
	*
	*  Control System [CTRL]
	*
	***/

	// Menu controls
	function menuControls() {

	};
	

	/***
	*
	*  Song System [SONG]
	*
	***/

	// "Electric Angel", "Ai Kotoba", etc
	var songTitle = "";

	//  0 = Easy, 1 = Normal, 2 = Hard, 3 = Extreme, 4 = Insane - This variable should be able to go past 4 to add new modes
	var mode = 0;

	// 1 - 10 - used to show difficulty stars in the menu, calculate currency difficulty bonus/penalty
	var difficulty = 0;

	// Tempo in bpm, E.x. 178 - used in the spawnNote functions
	var tempo = 0;

	var lyrics = [lyricTime, lyricString];

		// Each of these variables is an array, one holds the time in seconds (5.32...), the other holds the lyric string ("Some sappy lyrics...") - THe two are put together in the lyric variable
		var lyricTime = [0];
		var lyricString = [""];

	function songInfo(songTitle, mode) {

		$('#song-title').html(songTitle);

		if (mode == 0) {
			$('#song-mode').html('Easy');
		} else if (mode == 1) {
			$('#song-mode').html('Normal');
		} else if (mode == 2) {
			$('#song-mode').html('Hard');
		} else if (mode == 3) {
			$('#song-mode').html('Extreme');
		} else if (mode == 4) {
			$('#song-mode').html('Insane');
		};

		// Lyrics to be added later

	};

	songInfo("Ai Kotoba", 1);

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

		// "Length" of long note trail, in seconds (5.432..)
		var longNoteTrail = 0;

	// 0 = triangle (up), 1 = circle (right), 2 = x (down), 3 = square (left)
	var noteButton = 0;

	// Create counter to define noteSpawnTime and notePress time
	// Is it more resource conservative to compare against the system clock? How to do that?
	var counter = 0;

	function countUp() {
		setInterval(function(){
			counter = counter + 100;
		}, 100);
	};

	// Run the counter
	countUp();

	function destroyNote() {

		// Button Press check

		// Note type check
			// Regular note hit function
			// Long note hit function
			// Arrow note hit function

		// Note Accuracy check
		
			// Add score value to score
				// Assign score to appropriate score section (Song score, chance score) and check for combo
				// Print score to the #song-score element
			// Add note accuracy levels to total

		// Note hit effect

		// Combo check
			// Add to current combo
			// OR break current combo

		// Show combo counter AND Accuracy level above note

		// Destroy Note
		$('#note-' + noteId).remove();

		/* console.log('The destroyNote function just ran'); */

	};

	function createNote(noteSpawnTime, noteType, noteButton, noteStart, noteEnd, tempo) {
		setTimeout(function(){

			// Start "if hack", basically this if is here so I can target the children using $(this).children. Is there a better way to do this?
			if ($('#note-container').is(':visible')) {

				// Create the note semantics, assign a unique note ID using the noteId variable				
				$('#note-container').append('<div id="note-' + noteId + '" class="note-wrap"><div class="note"></div><div class="note-target"></div></div>');

				// Detect note type and create appropriate note and placeholder
				if (noteType == 0) {
					// Regular note
					$('#note-' + noteId).children('.note').addClass('reg');

					// Spawn regular gray target
					$('#note-' + noteId).children('.note-target').addClass('reg-target');
				} else if (noteType == 1) {
					// Long Note
					$('#note-' + noteId).children('.note').addClass('long');

					// Spawn note target with border
					$('#note-' + noteId).children('.note-target').addClass('long-target');

					// Spawn long note trail

					// Spawn second note at end of trail
				} else {
					// Arrow note
					$('#note-' + noteId).children('.note').addClass('arrow');

					// Spawn arrow target
					$('#note-' + noteId).children('.note-target').addClass('arrow-target');
				};

				// Detect note button and assign background to button and target
				if (noteButton == 0) {
					// Triangle (up) note
					$('#note-' + noteId).children('.note').addClass('ui-note-triangle');
					$('#note-' + noteId).children('.note-target').addClass('ui-note-triangle-target');
				} else if (noteButton == 1) {
					// Circle (right) note
					$('#note-' + noteId).children('.note').addClass('ui-note-circle');
					$('#note-' + noteId).children('.note-target').addClass('ui-note-circle-target');
				} else if (noteButton == 2) {
					// X (down) note
					$('#note-' + noteId).children('.note').addClass('ui-note-x');
					$('#note-' + noteId).children('.note-target').addClass('ui-note-x-target');
				} else {
					// Square (left) note
					$('#note-' + noteId).children('.note').addClass('ui-note-square');
					$('#note-' + noteId).children('.note-target').addClass('ui-note-square-target');
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

				// Controls

				// Bind up key

				// Song system controls
				function songControls() {
					$(document).bind('keydown', 'up',function (){
						notePressTime = counter;
						noteAccuracy = notePressTime / (noteSpawnTime + (tempo * 15));
						/* console.log('notePressTime: ' + notePressTime);
						console.log('noteSpawnTime: ' + noteSpawnTime);
						console.log('tempo: ' + tempo); */
						console.log('noteAcc: ' + noteAccuracy);

						// Call the destroy function just before the note ID changes
						$('#note-' + (noteId - 1)).remove();

						return false; 
					});

					// Bind right key
					$(document).bind('keydown', 'right',function (){
						return false; 
					});

					// Bind down key
					$(document).bind('keydown', 'down',function (){
						return false; 
					});

					// Bind left key
					$(document).bind('keydown', 'left',function (){
						return false; 
					});


				};
				songControls();

				// At the end of the function increase the note ID by one, creating a unique note
				noteId = noteId + 1;

				// All functions should come before the note ID changing (the line above This)

			// End if hack
			};
		}, (noteSpawnTime));
	};

	// createNote variables: noteSpawnTime, noteType, noteButton, noteStart, noteEnd, tempo
	createNote(1500,0,1,[10,0],[15,66],136);
	createNote(3500,0,1,[25,100],[30,33],136);
	createNote(5500,0,1,[40,0],[45,66],136);
	createNote(7500,0,1,[50,100],[55,33],136);
	createNote(9500,0,1,[65,0],[70,66],136);

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
		score = (stageScore + comboBonus + chanceScore);

		// Compare score agains high score
		if (score > highScore) {
			highScore = score;
		};
	};

	/***
	*
	*  Currency System [CURR]
	*
	***/

});