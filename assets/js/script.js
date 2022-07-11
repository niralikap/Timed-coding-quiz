var timerEl = document.querySelector(".time");
var mainEl = document.querySelector(".main");
var beginEl = document.querySelector(".begin");
var startButton = document.querySelector("#start");
var questionText = document.querySelector(".que_text");
var quizBox = document.querySelector(".quiz_box");
var select1 = document.querySelector("#option1");
var select2 = document.querySelector("#option2");
var select3 = document.querySelector("#option3");
var select4 = document.querySelector("#option4");
var result = document.querySelector("#status");
var questionEl = document.querySelector("#question");
var optionEl = document.querySelector(".option_list");
var currentQuestionIndex = 0;
var timeLeft = 75;


var quiz = [
    {
       question: "Commonly used data types DO NOT Include:",
       answer: "3. alerts",
       options: [
           "1. strings",
           "2. booleans",
           "3. alerts",
           "4. numbers"
       ]
    },
    {
        question: "The condition in an if/else statement is enclosed within ______.",
        answer: "3. parenthesis",
        options: [
            "1. quotes",
            "2. curly brackets",
            "3. parenthesis",
            "4. square brackets"
        ]
    },
    {
        question: "Arrays in Javascript can be used to store _______.",
        answer: "4. all of the above",
        options: [
            "1. numbers and strings",
            "2. other arrays",
            "3. booleans",
            "4. all of the above"
        ]
    },
    {
        question: "String values must be enclosed within _____ when being assigned to variables.",
        answer: "3. quotes",
        options: [
            "1. commas",
            "2. curly brackets",
            "3. quotes",
            "4. parentheses"
        ]
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answer: "4. console log",
        options: [
            "1. Javascript",
            "2. terminal/bash",
            "3. for loops",
            "4. console log"
        ]
    }
];

var currentQuestion = quiz[currentQuestionIndex];

startButton.addEventListener("click", function(event) {
    event.preventDefault();
    beginEl.setAttribute("style", "visibility: hidden");
    //questionText.setAttribute("style", "visibility: visible");
    quizBox.setAttribute("style", "visibility: visible");
    displayQuestions();
}); 

function answerQuestion(event){
    if(event.target.textContent == currentQuestion.answer){
        result.textContent = "Correct Answer!";

    } else{
        result.textContent = "Wrong Answer!";
        timeLeft-=10;
        timerEl.textContent = timeLeft + ' seconds remaining';
    }
currentQuestionIndex++;
displayQuestions();
    /*var finalScore = 0;
    finalScore++;*/
}

function displayQuestions(){

questionEl.textContent = currentQuestion.question;  
select1.textContent = currentQuestion.options[0];
select2.textContent = currentQuestion.options[1];
select3.textContent = currentQuestion.options[2];
select4.textContent = currentQuestion.options[3];

optionEl.addEventListener("click", answerQuestion)
/*for (let i = 0; i <= quiz.length; i++) {
    questionText.textContent = quiz[i];
}*/
}



/*localStorage.setItem("quesCount", JSON.stringify(quesCount));
renderMessage();*/




/*function getQuestion() {
 var currentQuestion = quiz[currentQuestionIndex]
 console.log(currentQuestion.question)
 console.log(currentQuestion.answer)
 console.log(currentQuestion.options[0])
 console.log(currentQuestion.options[1])
 console.log(currentQuestion.options[2])
 console.log(currentQuestion.options[3])
 currentQuestionIndex++
}
getQuestion()*/


function renderMessage() {
    var questionCount = 0;
  var lastGrade = JSON.parse(localStorage.getItem("quesCount"));
  if (lastGrade !== null) {
    document.querySelector(".message").textContent = lastGrade.student + 
    " received a/an " + lastGrade.grade
  }
}

// Timer that counts down from 5
function countdown() {

  // Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
  var timeInterval = setInterval(function () {
    // As long as the `timeLeft` is greater than 1
    if (timeLeft > 1) {
      // Set the `textContent` of `timerEl` to show the remaining seconds
      timerEl.textContent = timeLeft + ' seconds remaining';
      // Decrement `timeLeft` by 1
      timeLeft--;
    } else if (timeLeft === 1) {
      // When `timeLeft` is equal to 1, rename to 'second' instead of 'seconds'
      timerEl.textContent = timeLeft + ' second remaining';
      timeLeft--;
    } else {
      // Once `timeLeft` gets to 0, set `timerEl` to an empty string
      timerEl.textContent = '';
      // Use `clearInterval()` to stop the timer
      clearInterval(timeInterval);
      // Call the `displayMessage()` function
      displayMessage();
    }
  }, 1000);
}

// Displays the message one word at a time
function displayMessage() {
  var Count = 0;

  // Uses the `setInterval()` method to call a function to be executed every 1000 milliseconds
  var msgInterval = setInterval(function () {
    // If there are no more words left in the message
    if (quiz[Count] === undefined) {
      // Use `clearInterval()` to stop the timer
      clearInterval(msgInterval);
    } else {
      // Display one word of the message
      mainEl.textContent = quiz[Count];
      Count++;
    }
  }, 1000);
}

startButton.addEventListener("click", countdown);
