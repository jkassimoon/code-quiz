var userScore = 0;
var highScore = 0;
var timeLeft = 100;

var questionNumber = 0;
var inGame = false;

var userName;

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
  },
]

$("#start-button").on("click", function () {

  inGame = true;
  $("#high-score-div").html("<h1>JavaScript Fundamentals Quiz:</h1> <h2>How well do you know your JavaScript?</h2>");
  userScore = 0;

  setInterval(myTimer, 1000);
  
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
    endGame();
    return;
  }

  $("#time-left").html("Time left: " + timeLeft);
  timeLeft--;

}

function nextQuestion() {
  questionNumber++;

  if (questionNumber >= quizQuestions.length) {
        endGame();
        return;
    }

  $("#question-display").empty();
  $("#question-display").html(quizQuestions[questionNumber].question);
  answerButtons();

}

function answerButtons() {
  $("#multi-choices").empty();
  quizQuestions[questionNumber].choices.forEach(function (element) {
    var createButton = $("<button>");
    createButton.addClass("answer-button");
    createButton.html(element);
    createButton.on('click', function () {

      if (element === quizQuestions[questionNumber].answer) {
        userScore = userScore + 10;
        $("#try-again").html("");
        console.log("user score is " + userScore);
        nextQuestion();
      }
      else {
        userScore = userScore - 10;
        timeLeft--;
        $("#try-again").html("Incorrect! Try again.");
        console.log("user score is " + userScore);
      }
      $("#score").html("Score: " + userScore);
    })
    $("#multi-choices").append(createButton);
  });
};

var highScorers = [];

function endGame() {
    var endText = '';
    if (userScore === 50) {
        endText = "Perfect score!";
    } else if (userScore === 0) {
        endText = "You scored exactly 0. Not sure if I should be impressed..";
    } else if (userScore < 0) {
        endText = "Negative score? How could you fail so badly??";
    } else {
        endText = "Good job!";    
    }

    $("#try-again").html(endText);
    
    function nameList () {
        $("#high-score-div").html("<h1>Game Over!</h1> <input id=\"new-username\" type=\"text\" placeholder=\"Your Name\"> <button id=\"submit-button\">Enter</button> <div id=\"name-list\"></div>");
        
        function addName() {

            var newUserName = $("#new-username").val();
            highScorers.push(
                {name: newUserName,
                score: userScore}
            );
            console.log(highScorers);
            $("#name-list").html("");
            for (var i = 0; i < highScorers.length; i++) {
                $("#name-list").append(highScorers[i].name + " - " + highScorers[i].score + "pts <br>");
            }

            // Clear the content of the input box.
            $("#new-username").val("");
        }

        $("button").click(addName);
          
        $("#new-username").keypress(function(event) {
            if (event.which === 13) {
                addName();
            }
        });

        


    }

    nameList();
    // <button id="start-button">Start the Quiz!</button>
    $("#start-button").html("Go Again?");

    inGame = false;
    //   userScore = 0;
    questionNumber = 0;
    timeLeft = 100;
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