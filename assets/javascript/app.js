var correct = 0;
var incorrect = 0;

var questionsLeft = 7;
var timeLeft = 10;

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
    question: "Which of the follow is the correct way to push an element called \"e1\" into an array called \"myArray?\"",
    choices: ["e1.push.(myArray);", "myArray.push(e1);", "push (e1, myArray) {}"],
    answer: "myArray.push(e1);" 
  },
  {
    question: "Which value type is NOT like the other?",
    choices: ["13", "\"13\"", "31"],
    answer: "...but that's none of my business"
  },
  {
    question: "Test1",
    choices: ["Success Kid", "Determined Kid", "Yes Kid"],
    answer: "Success Kid"
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
  $("#correct-counter").html("correct: " + correct);
  $("#incorrect-counter").html("incorrect: " + incorrect);
});


function myTimer() {
  if (!inGame) {
    return;
  }
  if (timeLeft == 0) {
    incorrect++;
    nextQuestion();
  }
  $("#time-left").html("Time left: " + timeLeft);

  timeLeft--;

}

function nextQuestion() {
  $("#correct-counter").html("correct: " + correct);
  $("#incorrect-counter").html("incorrect: " + incorrect);

  questionNumber++;
  timeLeft = 10;
  if (questionNumber >= quizQuestions.length) {
    endGame();
    return;
  }

  $("#question-display").empty();
  $("#question-display").html(quizQuestions[questionNumber].question);
  answerButtons();
  timeLeft = 10;

}

function answerButtons() {
  $("#multi-choices").empty();
  quizQuestions[questionNumber].choices.forEach(function (element) {
    var createButton = $("<button>");
    createButton.addClass("answer-button");
    createButton.html(element);
    createButton.on('click', function () {

      if (element === quizQuestions[questionNumber].answer) {
        correct++
      }
      else {
        incorrect++;
      }
      nextQuestion();
    })
    $("#multi-choices").append(createButton);
  });
};

function endGame() {
  var endText = '';
  if (incorrect === 0) {
    endText = 'Perfect! A++';
  } else if (correct > incorrect) {
    endText = 'You did alright.';
  } else {
    endText = 'You bring great dishonor.';
  }
  $("#correct-incorrect").html(endText);
  inGame = false;
  correct = 0;
  incorrect = 0;
  questionNumber = 0;
  questionsLeft = 7;
  timeLeft = 10;
  $("#multi-choices").empty();
  $("#question-display").empty();
  $("#start-button").show();
  $("#time-left").hide();
}

  //Player clicks start button 
  //start button disappears & question #1 displays
  //user has 15 seconds to answer, decrease 1 second from counter every second.
  //if user selects a correct answer then increase correct counter by 1pt and move on to question #2
  //if user selects an incorrect answer or exhausts all 10 seconds,then it increases incorrect counter by 1pt and it moves on to question #2
  //when user finishes question 7, (the questions left counter turns 0) then the screen displays final stats.
  //user can click restart with the restart button.