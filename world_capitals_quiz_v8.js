//WORLD CAPITALS QUIZ

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
var usedCountries = [];
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
restartQuiz();

//generate random number 
function randomNumberGenerator (){
	var random1 = Math.floor(Math.random() * (capitalsAfrica.length));		
	return random1;
}

//pass random number to display a country
function showQuestions() {
	//call random number function
	randomNumberGenerator();
	//push that random number into usedCountries array
	usedCountries.push(randIndexNum);
	//test if value of random number in array, if in used country array, generate a new random number
	while ($.inArray(randIndexNum, usedCountries) !== -1) {	
		//if the random number is in the array, generate a new random number
		randomNumberGenerator();		
		//reset randIndexNum to value of new random number
		randIndexNum = randomNumberGenerator();		
	}	
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
	restartQuiz();
	if (maxQuestions < 10) {
		var question = showQuestions();
		var answer = holdAnswers();
	//			
	}
//	maxQuestions++;	
}

//store value of responses as third element in array when you click enter and show the next question
//function saveAnswers(){
	$("#submit").mousedown(function(){
		var input = $("#textBox").val();
		capitalsAfrica[randIndexNum].push(input);
		maxQuestions++;
		$('#quiz').empty();	
		//store the correct and wrong answers in separate arrays
		if( capitalsAfrica[randIndexNum].length === 3) {
			if(input.toUpperCase() === capitalsAfrica[randIndexNum][1].toUpperCase()) {
				correctResp.push(input);

			} else {
				//var correctAnswer = capitalsAfrica[randIndexNum][1];
				var wrongRespArr = new Array();
				wrongRespArr.push(randomCountry);
				wrongRespArr.push(randomCapital);
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
				printResults += ("<table id='wrongResultsTable'><tr><th>Country</th><th>Correct Answer</th><th>Your Answer</th></tr>");
				for (x = 0; x < wrongResp.length; x++) {
					printResults += ("<tr>");
					printResults += ("<td>" + wrongResp[x][0] + "</td><td>" + wrongResp[x][1] + "</td><td>" + wrongResp[x][2] + "</td>");
					printResults += ("</tr>");	
				}
				printResults += ("</table></p>");
				$("body").append(printResults);
			}
	}
});

function restartQuiz () {
	$("#restart").mousedown(function(){
		capitalsAfrica = capitalsAfrica.map(function(item){
			return item.splice(0, 2);	
		});
		scoreAfrica = 0;
		correctResp = [];
		wrongResp = [];
		maxQuestions = 0;
	});
}

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