var triviaQuestions = [{
	question : 'Who\'s the only character that shares his name with the exact name of the actor (full name)?',
	answerList: ["Pam Beesly", "Creed Bratton", "Michael Scott", "Kelly Kapoor"],
	answer: 1
},{
	question: 'Michael accidentally gets high at whose concert?',
	answerList: ["Alicia Keys", "Justin Bieber", "AC/DC", "Bob Marley"],
	answer: 0
},{
	question : 'Who has a heart attack in the office?',
	answerList: ["Stanley", "Phyllis", "Dwight", "Darryl"],
	answer: 0
},{
	question : 'What is the name of the security guard at the Scranton branch?',
	answerList: ["Daniel", "Harold", "Hank", "Thomas"],
	answer: 2
},{
	question : 'Instead of hiring a stripper, who does Jim get?',
	answerList: ["Magician", "The City of Scranton Mayor", "An actual Maid", "Ben Franklin Impersonator"],
	answer: 3
},{
	question: "Dwight Schrute plays which of the following musical instruments?",
	answerList: ["Recorder", "Banjo", "Piano", "None"],
	answer: 0
},{
	question: "Which Dunder Mifflin salesman did Pam date before Jim?",
	answerList: ["Clark Green", "Danny Cordray", "Lloyd Gross", "Todd Packer"],
	answer: 1
},{
	question: "What is the name of Jim and Pam's eldest child?",
	answerList: ["Deedee", "Bebe", "CeCe", "FiFi"],
	answer: 2
},{
	question: "What boy's name was Michael's pick for Jan's unborn child?",
	answerList: ["Steve", "Chevy", "Gary", "Ford"],
	answer: 1
},{
	question: "Which of the following is NOT a theme of one of the guest rooms at Schrute Farms?",
	answerList: ["Goats", "Nighttime", "America", "Irrigation"],
	answer: 0
}];

var gifArray = ['question1', 'question2', 'question3', 'question4', 'question5', 'question6', 'question7', 'question8', 'question9', 'question10'];
var currentQuestion; var correctAnswer; var incorrectAnswer; var unanswered; var seconds; var time; var answered; var userSelect;
var messages = {
	correct: "Yes, that's right!",
	incorrect: "No, that's not it.",
	endTime: "Out of time!",
	finished: "Alright! Let's see how well you did."
}

$('#startBtn').on('click', function(){
	$(this).hide();
	newGame();
});

$('#startOverBtn').on('click', function(){
	$(this).hide();
	newGame();
});

function newGame(){
	$('#finalMessage').empty();
	$('#correctAnswers').empty();
	$('#incorrectAnswers').empty();
	$('#unanswered').empty();
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	newQuestion();
}

function newQuestion(){
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();
	answered = true;
	
	//sets up new questions & answerList
	$('#currentQuestion').html('Question #'+(currentQuestion+1)+'/'+triviaQuestions.length);
	$('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
	for(var i = 0; i < 4; i++){
		var choices = $('<div>');
		choices.text(triviaQuestions[currentQuestion].answerList[i]);
		choices.attr({'data-index': i });
		choices.addClass('thisChoice');
		$('.answerList').append(choices);
	}
	countdown();
	//clicking an answer will pause the time and setup answerPage
	$('.thisChoice').on('click',function(){
		userSelect = $(this).data('index');
		clearInterval(time);
		answerPage();
	});
}

function countdown(){
	seconds = 15;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	answered = true;
	//sets timer to go down
	time = setInterval(showCountdown, 1000);
}

function showCountdown(){
	seconds--;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

function answerPage(){
	$('#currentQuestion').empty();
	$('.thisChoice').empty(); //Clears question page
	$('.question').empty();

	var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
	$('#gif').html('<img src = "assets/images/'+ gifArray[currentQuestion] +'.gif" width = "400px">');
	//checks to see correct, incorrect, or unanswered
	if((userSelect == rightAnswerIndex) && (answered == true)){
		correctAnswer++;
		$('#message').html(messages.correct);
	} else if((userSelect != rightAnswerIndex) && (answered == true)){
		incorrectAnswer++;
		$('#message').html(messages.incorrect);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
	} else{
		unanswered++;
		$('#message').html(messages.endTime);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
		answered = true;
	}
	
	if(currentQuestion == (triviaQuestions.length-1)){
		setTimeout(scoreboard, 5000)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 5000);
	}	
}

function scoreboard(){
	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();

	$('#finalMessage').html(messages.finished);
	$('#correctAnswers').html("Correct Answers: " + correctAnswer);
	$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#startOverBtn').addClass('reset');
	$('#startOverBtn').show();
	$('#startOverBtn').html('Start Over?');
}
