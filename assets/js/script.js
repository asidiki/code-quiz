//array with questions/answers
var questions = [
    {
        title: "Commonly used data types DO NOT include:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    },
    {
        title: "The condition in an if / else statement is enclosed within ____.",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses"
    },
    {
        title: "Arrays in Javascript can be used to store ____.",
        choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        answer: "all of the above"
    },
    {
        title: "String values must be enclosed within ____ when being assigned to variables.",
        choices: ["commas", "curly brackets", "quotes", "parenthesis"],
        answer: "quotes"
    },
    {
        title: "A very useful tool for used during development and debugging for printing content to the debugger is:",
        choices: ["Javascript", "terminal / bash", "for loops", "console log"],
        answer: "console log"
    }
];

//variables
var score = 0;
var questionsIndex = 0;
var currentTime = document.querySelector("#currentTime");
var timer = document.querySelector("#startQuiz");
var questionsDiv = document.querySelector("#questionsDiv");
var main = document.querySelector("#main");
var timeLeft = 80;
var timePenalty = 10;

var createUl = document.createElement("ul");

//start quiz function
function start(questionsIndex) {
    
    //clear existing data
    questionsDiv.innerHTML = "";
    createUl.innerHTML = "";
    
    // questions array for loop
    for (var i = 0; i < questions.length; i++) {
        var displayQuestion = questions[questionsIndex].title;
        questionsDiv.textContent = displayQuestion;

        var possibleAnswers = questions[questionsIndex].choices;
    }

    //display answers for the questions using for each
    possibleAnswers.forEach(function(choice){
        var listItem = document.createElement("li");
        listItem.textContent = choice;
        questionsDiv.appendChild(createUl);
        createUl.appendChild(listItem);
        listItem.addEventListener("click", (checkAnswer));
    });
};

//function for checking the answers
function checkAnswer(event) {
    var selected = event.target;

    if (selected.matches("li")) {
        var answerDiv = document.createElement("div");
        answerDiv.setAttribute("id", "answerDiv");
        //if correct answer
        if (selected.textContent == questions[questionsIndex].answer) {
            score++;
            answerDiv.textContent = "Correct! The answer is: " + questions[questionsIndex].answer;
        //if incorrect answer deduct 10 seconds   
        }else {
            timeLeft = timeLeft - timePenalty;
            answerDiv.textContent = "Wrong! The correct answer is: " + questions[questionsIndex].answer;
        }
    }
    //move on to next question
    questionsIndex++;

    if (questionsIndex >= questions.length) {
        quizComplete();
    }
}

//append the page when quiz ends
function quizComplete() {
    //clear existing data
    questionsDiv.innerHTML = "";
    createUl.innerHTML = "";

}