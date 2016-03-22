//Create a game that tests people's knowledge of national capitols, there will be a timer to see how long it takes
//First, open on a screen with the games, have an enter button, when button clicked, overlay disappears
//Map is shown with instructions to click on the region you would like to be quizzed on
//When the region is selected, the questions begin
//Each question will be submitted without saying what is correct
//Counter adds up correct answers
//Timer times the game, WILL THE TIMER MAX OUT?
//Once all questions have been asked, reveals page with score and time, option to return to the main map



var capitalsAfrica = [
["Algeria", "Algiers"],
["Angola", "Luanda"],
["Benin", "Porto-Novo"],
["Botswana", "Gaborone"],
["Burkina Faso", "Ouagadougou"],
["Burundi", "Bujumbura"],
["Cameroon", "Yaounde"],
["Cape Verde", "Praia"],
["Central African Republic", "Bangui"],
["Chad", "N'Djamena"],
["Comoros", "Moroni"],
["Democratic Republic of the Congo", "Kinshasa"],
["Republic of the Congo", "Brazzaville"],
["Cote d'Ivoire", "Yamoussoukro"],
["Djibouti", "Djibouti"],
["Egypt", "Cairo"],
["Equatorial Guinea", "Malabo"],
["Eritrea", "Asmara"],
["Ethiopia", "Addis Ababa"],
["Gabon", "Libreville"],
["Gambia", "Banjul"],
["Ghana", "Accra"],
["Guinea", "Conakry"],
["Guinea-Bissau", "Bissau"],
["Kenya", "Nairobi"],
["Lesotho", "Maseru"],
["Liberia", "Monrovia"],
["Libya", "Tripoli"],
["Madagascar", "Antananarivo"],
["Malawi", "Lilongwe"],
["Mali", "Bamako"],
["Mauritania", "Nouakchott"],
["Mauritius", "Port Louis"],
["Morocco", "Rabat"],
["Mozambique", "Maputo"],
["Namibia", "Windhoek"],
["Niger", "Niamey"],
["Nigeria", "Abuja"],
["Rwanda", "Kigali"],
["Sao Tome and Principe", "Sao Tome"],
["Senegal", "Dakar"],
["Seychelles", "Victoria"],
["Sierra Leone", "Freetown"],
["Somalia", "Mogadishu"],
["South Africa", "Pretoria"],
["Sudan", "Khartoum"],
["South Sudan", "Juba"],
["Swaziland", "Mbabane"],
["Tanzania", "Dar es Salaam"],
["Togo", "Lome"],
["Tunisia", "Tunis"],
["Uganda", "Kampala"],
["Western Sahara", "no capital"],
["Zambia", "Lusaka"],
["Zimbabwe", "Harare"], 
];

//hold random number
var randIndexNum = randomNumberGenerator();
var randomCountry = capitalsAfrica[randIndexNum][0];
var randomCapital = capitalsAfrica[randIndexNum][1];
var randomResponse = capitalsAfrica[randIndexNum][2];
var correctResp = [];
var wrongResp = [];
var scoreAfrica = 0;
var quiz = $("#quiz");
var buttons = $("#quizButtons");
var maxQuestions = 0;
var $overlay = $("<div id='overlay'></div>");
var $startButton = $("<button id='startButton' type='button'>Ready to begin?</button>");

($overlay).append($startButton);
$("body").append($overlay);
($startButton).click(function(event){
	$overlay.hide('slow');
	
});
displayNextCountry();

//print function
function print(message){
	document.write(message);
}

//generate random number 
function randomNumberGenerator (){
	var random1 = Math.floor((Math.random() * (capitalsAfrica.length)));
	return random1;
}

//pass random number to display a country
function showQuestions() {
	randIndexNum = randomNumberGenerator();
	randomCountry = capitalsAfrica[randIndexNum][0];
	var showQuestion = ("<p>What is the capital of " + randomCountry + "?</p>");
	$("#quiz").append(showQuestion);
}

//create text box that holds answers of questions
function holdAnswers(){
	randomCapital = capitalsAfrica[randIndexNum][1];
	var showTextbox = ("<input type='text' id='textBox'></input>");
	$("#quiz").append(showTextbox);
}

//display the next question
function displayNextCountry (){
	if (maxQuestions < 10) {
		var question = showQuestions();
		var answer = holdAnswers();
		maxQuestions++;			
	}
}

//store value of responses as third element in array when you hit enter and show the next question
//function saveAnswers(){
	$("#submit").mousedown(function(){
		var input = $("#textBox").val();
		capitalsAfrica[randIndexNum].push(input);
		$('#quiz').empty();	
		//store the correct and wrong answers in separate arrays
		if( capitalsAfrica[randIndexNum].length === 3) {
			if(input.toUpperCase() === capitalsAfrica[randIndexNum][1].toUpperCase()) {
				correctResp.push(input);
			} else {
				var wrongRespArr = new Array();
				wrongRespArr.push(randomCountry);
				wrongRespArr.push(input);
				wrongResp.push(wrongRespArr);
			}
		} else {}
		displayNextCountry();
		//show results on screen
		if (maxQuestions === 9) {
			$("#submitLink").click(this).css("color", "#FF7800");
		}

		if (maxQuestions === 10) { 
			scoreAfrica = correctResp.length;
			$(".quiz").hide("slow");
			$(".button").hide("slow");
				if ( scoreAfrica === 1 ) {
				$("body").append("<p class='score'>Your score for the capitals of Africa is <br><h2>" + scoreAfrica + " point.</h2></p>");	
			} else {
				$("body").append("<p class='score'>Your score for the capitals of Africa is <br><h2>" + scoreAfrica + " points.</h2></p>");
			}
			if (scoreAfrica < capitalsAfrica.length) {
				var printResults = ("<p>You guessed the following country capitals incorrectly: <br>");
				printResults += ("<table id='wrongResultsTable'>");
				for (x = 0; x < wrongResp.length; x++) {
					printResults += ("<tr>");
					printResults += ("<td>" + wrongResp[x][0] + "</td><td>" + wrongResp[x][1] + "</td>");
					printResults += ("</tr>");	
				}
				printResults += ("</table>");
				
				///printResults += (wrongResp.join(", "));
				//printResults += ("</p>");
				$("body").append(printResults);
			}
	}
});
/*
var timeInSeconds = 60;
var startTime = Date.parse(new Date());
var timeLeft = new Date (startTime + timeInSeconds*1000 );
var t;
var seconds;

function getTimeRemaining(endtime){
	t = Date.parse(endtime) - Date.parse(new Date());
	seconds = Math.floor(t/1000 % 60);
	return { 
		'total': t,
		'seconds': seconds
	};
}

function initializeTimer(id, endtime) {
	var clock = document.getElementById(id);
	var timeInterval = setInterval(function(){
		clock.innerHTML = 'seconds' + t.seconds;
		if (t.total <= 0){
			clearInterval(timeInterval);
		}
	}, 1000);
}

initializeTimer('clockdiv', timeLeft);
		
*/