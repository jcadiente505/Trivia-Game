//questions object array
var questDisney = [
	{
		question: "On what planet, did Luke Skywalker train with Yoda?", 
		choice: ["Tatooine", "Dagobah", "Corellia", "Onderon"],
		answer: 1,
		photo: "assets/images/Yoda-Image.jpg"
	 },
	 {
	 	question: "Ben Solo is also known by what name?", 
		choice: ["Kylo Ren", "Ben Kenobi", "Rey", "Ben Skywalker"],
		answer: 0,
		photo: "assets/images/Ben-Solo-Hand.jpg"
	 }, 
	 {
	 	question: "Who Shot First!?", 
		choice: ["Greedo", "Han Solo", "Chewbacca", "Jabba" ],
		answer: 1,
		photo: "assets/images/Han-Greedo.jpg"
	}, 
	{
		question: "What is the name of Han Solo's ship", 
		choice: ["Destroyer", "Enterprise", "Millenium Falcon", "Kobe Maru" ],
		answer: 2,
		photo: "assets/images/Han-Falcon.jpg"
	}, 
	{
		question: "Who originally built C3P0?", 
		choice: ["Luke Skywalker", "Obi-Wan Kenobi", "Darth Vader", "Anakin Skywalker" ],
		answer: 3,
		photo: "assets/images/C3P0-image.jpg"
	}, 
	{
		question: "Ahsoka Tano was the padawan of which Jedi Knight?", 
		choice: ["Plo Koon", "Anakin Skywalker", "Luminara", "Barris Offee" ],
		answer: 1,
		photo: "assets/images/Darth-Ahsoka.png"
	}, 
	{
		question: "Who was the only redeeming prequel trilogy character?", 
		choice: ["Jar Jar Binks", "Qui Gon Jinn", "Padme Amidala", "Kylo Ren" ],
		answer: 1,
		photo: "assets/images/quigon-image.png"
	}, 
	{
		question: "Who is the actual leader of Rogue Squadron", 
		choice: ["Wedge Antilles", "Biggs Darklighter", "Luke Skywalker", "Poe Dameron" ],
		answer: 0,
		photo: "assets/images/rogue-squadron.jpg"
	}];
// variables too use
var correct = 0;
var wrong = 0;
var unanswered = 0;
var timer = 20;
var intervalId;
var userGuess = "";
var running = false;
var questCounter = questDisney.length;
var pick;
var index;
var newArray = [];
var holder = [];

$("#reset").hide();

$("#disney").on("click", function () {
	$("#disney").hide();
	$("#EU").hide();
	displayQuestion();
	timeStart();
	for(var i = 0; i < questDisney.length; i++) {
		holder.push(questDisney[i]);
		}
})
//functions
// Timer Function: Start
function timeStart(){
	if (!running) {
	intervalId = setInterval(timeDecrease, 1000); 
	running = true;
	}
}
//Timer Decrease
function timeDecrease() {
	$("#timer").html("<h3>Time remaining: " + timer + "</h3>");
	timer --;

	//updated counter if time runs out
	if (timer === 0) {
		unanswered++;
		stop();
		$("#answersection").html("<p>Time is up! The correct answer is: " + pick.choice[pick.answer] + "</p>");
		hidebackground();
	}	
}
// stops timer
function timeStop() {
	running = false;
	clearInterval(intervalId);
}
// Generates the question
function displayQuestion() {
	index = Math.floor(Math.random()*questDisney.length);
	pick = questDisney[index];

		$("#questionsection").html("<h2>" + pick.question + "</h2>");
		for(var i = 0; i < pick.choice.length; i++) {
			var userChoice = $("<div>");
			userChoice.addClass("answerchoice");
			userChoice.html(pick.choice[i]);
			userChoice.attr("data-guessvalue", i);
			$("#answersection").append(userChoice);

			}
	}
// hides picture after 
function hidebackground () {
	$("#questionBackgroundDiv").css("background-image", "url(" + pick.photo + ")");
	newArray.push(pick);
	questDisney.splice(index,1);

	var hideback = setTimeout(function() {
		$("#questionBackgroundDiv").empty();
		timer= 20;

	if ((wrong + correct + unanswered) === questCounter) {
		$("#questionsection").empty();
		$("#questionsection").html("<h3>Game Over!  Here's how you did: </h3>");
		$("#answersection").append("<h4> Correct: " + correct + "</h4>" );
		$("#answersection").append("<h4> Incorrect: " + wrong + "</h4>" );
		$("#answersection").append("<h4> Unanswered: " + unanswered + "</h4>" );
		$("#reset").show();
		correct = 0;
		wrong = 0;
		unanswered = 0;

	} else {
		timeStart();
		displayQuestion();

	}
	}, 3000);

}

$(".answerchoice").on("click", function () {

	userGuess = parseInt($(this).attr("data-guessvalue"));

	if (userGuess === pick.answer) {
		stop();
		correct++;
		userGuess="";
		$("#answersection").html("<p>Correct!</p>");
		hidepicture();

	} else {
		stop();
		wrong++;
		userGuess="";
		$("#answersection").html("<p>Wrong! The correct answer is: " + pick.choice[pick.answer] + "</p>");
		hidebackground();
	}
})

$("#reset").on("click", function() {
	$("#reset").hide();
	$("#answersection").empty();
	$("#questionsection").empty();
	for(var i = 0; i < holder.length; i++) {
		questDisney.push(holder[i]);
	}
	timeStart();
	displayQuestion();
})



