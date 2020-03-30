var userScore = 0;
var timeLeft = 15;

var questionNumber = 0;
var firstGame = true;
var inGame = false;

var quizQuestions = [
  {
    question: "What is NOT a type of value you cannot store in a variable?",
    choices: ["bouillon", "string", "number"],
    answer: "bouillon"
  },
  {
    question: "Which of the following must be closed with a ;?",
    choices: ["if/else", "for loop", "console log"],
    answer: "console log"
  },
  {
    question: "Which of the follow is the correct way to push an element called \"element\" into an array called \"myArray?\"",
    choices: ["element.push.(myArray);", "myArray.push(element);", "push (element, myArray) {}"],
    answer: "myArray.push(element);" 
  },
  {
    question: "Which value type is NOT like the other?",
    choices: ["13", "31", "\"13\""],
    answer: "\"13\""
  },
  {
    question: "How do you generate a random whole number from 1 to 15?",
    choices: ["Math.floor(Math.random() * 15) +1;", "Math.round(Math.random() * 15);", "Math.round(Math.random() * 14) +1;"],
    answer: "Math.floor(Math.random() * 15) +1;"
  }
]

$("#start-button").on("click", function () {

  inGame = true;
  if (firstGame) {
    setInterval(myTimer, 1000);
    firstGame = false;
  }
  
  $("#question-display").html(quizQuestions[questionNumber].question);
  answerButtons();  

  $("#start-button").hide();
  $("#time-left").show()
  $("#score").html("Score: " + userScore);
});


function myTimer() {
  if (!inGame) {
    return;
  }
  if (timeLeft == 0) {
    userScore--;
    nextQuestion();
  }
  $("#time-left").html("Time left: " + timeLeft);

  timeLeft--;

}

function nextQuestion() {
  $("#score").html("Score: " + userScore + "0");

  questionNumber++;
  timeLeft = 15;
  if (questionNumber >= quizQuestions.length) {
    endGame();
    return;
  }

  $("#question-display").empty();
  $("#question-display").html(quizQuestions[questionNumber].question);
  answerButtons();
  timeLeft = 15;

}

function answerButtons() {
  $("#multi-choices").empty();
  quizQuestions[questionNumber].choices.forEach(function (element) {
    var createButton = $("<button>");
    createButton.addClass("answer-button");
    createButton.html(element);
    createButton.on('click', function () {

      if (element === quizQuestions[questionNumber].answer) {
        userScore++
        nextQuestion();
      }
      else {
        userScore--;
        timeLeft--;
        $("#correct-incorrect").html("Incorrect! Try again.");
      }
    })
    $("#multi-choices").append(createButton);
  });
};

function endGame() {
  var endText = '';
  if (userScore === 0) {
    endText = 'You failed! Try again next time.';
  } else if (userScore < 0) {
    endText = 'Negative score? How could you fail so badly?';
  } else if (userScore > 500000000000000000000000) {
    endText = 'High Score!';
  } else {
    endText = 'Great job!';
  }
  $("#correct-incorrect").html(endText);
  inGame = false;
  userScore = 0;
  questionNumber = 0;
  timeLeft = 15;
  $("#multi-choices").empty();
  $("#question-display").empty();
  $("#start-button").show();
  $("#time-left").hide();
}

  //Player clicks start button 
  //start button disappears & question #1 displays
  //user has 15 seconds to answer, decrease 1 second from counter every second.
  //if user selects a correct answer then increase correct counter by 1pt and move on to question #2
  //if user selects an incorrect answer or exhausts all 15 seconds,then it reduces score counter by 1pt and it moves on to question #2
  //when user finishes question 5, then the screen displays final stats.
  //user can click restart with the restart button.