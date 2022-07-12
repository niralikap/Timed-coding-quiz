var timerEl = document.querySelector(".time");
var mainEl = document.querySelector(".main");
var beginEl = document.querySelector(".begin");
var startButton = document.querySelector("#start");
var questionText = document.querySelector(".que_text");
var quizBox = document.querySelector(".quiz_box");
var resultBox = document.querySelector("#result_box");
var initialEl = document.querySelector(".initials");
var initialText = document.querySelector("#initials");
var highScoreBox = document.querySelector(".high_score_box");
var highScoresEl = document.querySelector("#highscores");
var headerEl = document.querySelector("#headerText");
var select1 = document.querySelector("#option1");
var select2 = document.querySelector("#option2");
var select3 = document.querySelector("#option3");
var select4 = document.querySelector("#option4");
var result = document.querySelector("#status");
var questionEl = document.querySelector("#question");
var optionEl = document.querySelector(".option_list");
var countEl = document.querySelector("#count");
var submitButton = document.querySelector(".submit");
var submissionResponseEl = document.querySelector("#response");
var goBackButton = document.querySelector("#goBack");
var clearHighScoresButton = document.querySelector("#clear");
var currentQuestionIndex = 0;
var timeLeft = 75;
var timeInterval;

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

var scoreList = document.querySelector("#score-list");
var scoreCountSpan = document.querySelector("#score-count");

var scores = [];

startButton.addEventListener("click", function(event) {
    event.preventDefault();
    beginEl.setAttribute("style", "visibility: hidden");
    resultBox.setAttribute("style", "visibility: hidden");
    initialEl.setAttribute("style", "visibility: hidden");
    quizBox.setAttribute("style", "visibility: visible");
    displayQuestions();
}); 

function answerQuestion(event){
    var currentQuestion = quiz[currentQuestionIndex];
    if(event.target.textContent == currentQuestion.answer){
        result.textContent = "Correct Answer!";
    } else{
        result.textContent = "Wrong Answer!";
        timeLeft-=10;
        timerEl.textContent = timeLeft + ' seconds remaining';
    }
currentQuestionIndex++;
//console.log(currentQuestionIndex, quiz.length);

if(currentQuestionIndex === quiz.length){
clearInterval(timeInterval);
quizBox.setAttribute("style", "visibility: hidden");
resultBox.setAttribute("style", "visibility: visible");
initialEl.setAttribute("style", "visibility: visible");
countEl.textContent = timeLeft;
initialInput = initialText.value;

}
else
{
  displayQuestions();
}
    /*var finalScore = 0;
    finalScore++;*/
}

function displayQuestions(){
var currentQuestion = quiz[currentQuestionIndex];   
questionEl.textContent = currentQuestion.question;  
select1.textContent = currentQuestion.options[0];
select2.textContent = currentQuestion.options[1];
select3.textContent = currentQuestion.options[2];
select4.textContent = currentQuestion.options[3];

optionEl.addEventListener("click", answerQuestion)

}

/*function highScoresInfo(event) {
  // Prevent default action
  event.preventDefault();
  console.log(event);
  if (initialInput === "") {
  displayMessage("error", "Initials cannot be blank");
}
  resultBox.setAttribute("style", "visibility: hidden");
  initialEl.setAttribute("style", "visibility: hidden");
  var response = "Thank you for your submission " + nameInput.value + "! We will reach out to you at " + emailInput.value + ".";
  submissionResponseEl.textContent = response;
}
  
// Add listener to submit element
submitEl.addEventListener("click", showResponse);

/*localStorage.setItem("quesCount", JSON.stringify(quesCount));
renderMessage();*/

/*var count = localStorage.getItem("count");

counter.textContent = count;

function renderLastRegistered() {
  var email = localStorage.getItem("email");
  var password = localStorage.getItem("password");

  if (!email || !password) {
    return;
  }
  initialText.value = initialInput;
  userEmailSpan.textContent = email;
  userPasswordSpan.textContent = password;
}*/

submitButton.addEventListener("click", function(event) {
  event.preventDefault();

  //var email = document.querySelector("#email").value;
  //var password = document.querySelector("#password").value;

  var scoreText = initialText.value.trim();

  // Return from function early if submitted todoText is blank
  if (scoreText === "") {
    return;
  }

   // Add new todoText to todos array, clear the input
   scores.push(scoreText);
   initialText.value = "";
 
   // Store updated todos in localStorage, re-render the list

  resultBox.setAttribute("style", "visibility: hidden");
  initialEl.setAttribute("style", "visibility: hidden");
  headerEl.setAttribute("style", "visibility: hidden");
  highScoreBox.setAttribute("style", "visibility: visible");
  highScoresEl.setAttribute("style", "visibility: visible");
   // localStorage.setItem("email", email);
   // localStorage.setItem("password", password);
   // renderLastRegistered();
   storeScores();
   renderScores();
   //highScoresEl.textContent = scoreCountSpan.value + "." + initialText.value + "-" + timeLeft;
  }
);

clearHighScoresButton.addEventListener("click", function(){

highScoresEl.setAttribute("style", "visibility: hidden");

}
);


// The following function renders items in a todo list as <li> elements
function renderScores() {
  // Clear todoList element and update todoCountSpan
  scoreList.innerHTML = "";
  scoreCountSpan.textContent = scores.length;

  // Render a new li for each todo
  for (var i = 0; i < scores.length; i++) {
    var score = scores[i];

    var li = document.createElement("li");
    li.textContent = score;
    li.setAttribute("data-index", i);

    countEl.textContent = timeLeft;

    li.appendChild(countEl.value);
    scoreList.appendChild(li);
  }
}

// This function is being called below and will run when the page loads.
function init() {
  // Get stored scores from localStorage
  var storedScores = JSON.parse(localStorage.getItem("scores"));

  // If scores were retrieved from localStorage, update the todos array to it
  if (storedScores !== null) {
    scores = storedScores;
  }

  // This is a helper function that will render scores to the DOM
  renderScores();
}

function storeScores() {
  // Stringify and set key in localStorage to scores array
  localStorage.setItem("scores", JSON.stringify(scores));
}


// Calls init to retrieve data and render it to the page on load
init()

/*function renderMessage() {
    var questionCount = 0;
  var lastGrade = JSON.parse(localStorage.getItem("quesCount"));
  if (lastGrade !== null) {
    document.querySelector(".message").textContent = lastGrade.student + 
    " received a/an " + lastGrade.grade
  }
}*/

// Timer that counts down from 5
function countdown() {

  // Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
  timeInterval = setInterval(function () {
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
