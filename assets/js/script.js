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
        title: "A very useful tool for use during development and debugging for printing content to the debugger is:",
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
var holdInterval = 0
var createUl = document.createElement("ul");

timer.addEventListener("click", function () {
    // We are checking zero because its originally set to zero
    if (holdInterval === 0) {
        holdInterval = setInterval(function () {
            timeLeft--;
            currentTime.textContent = "Time: " + timeLeft;

            if (timeLeft <= 0) {
                clearInterval(holdInterval);
                quizComplete();
                currentTime.textContent = "Time's up!";
            }
        }, 1000);
    }
    start(questionsIndex);
});

//start quiz function
function start(questionsIndex) {
    
    //clear existing data
    questionsDiv.innerHTML = "";
    createUl.innerHTML = "";
    
    // questions array for loop
    for (var i = 0; i < questions.length; i++) {
        var displayQuestion = questions[questionsIndex].title;
        var possibleAnswers = questions[questionsIndex].choices;

        questionsDiv.textContent = displayQuestion;

        
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
        // All done will append last page with user stats
        quizComplete();
        answerDiv.textContent = "End of quiz!" + " " + "You got  " + score + "/" + questions.length + " Correct!";
    } else {
        start(questionsIndex);
    }
    questionsDiv.appendChild(answerDiv);

}

//append the page when quiz ends
function quizComplete() {
    //clear existing data
    questionsDiv.innerHTML = "";
    createUl.innerHTML = "";

    //create heading
    var createdH1 = document.createElement("h1");
    createdH1.setAttribute("id", "createdh1");
    createdH1.textContent = "All done!"

    questionsDiv.appendChild(createdH1);

    //create p
    var createdP = document.createElement("p");
    createdP.setAttribute("id", "createdP");

    questionsDiv.appendChild(createdP);

    //calculate score
    if (timeLeft >= 0) {
        var timeRemaining = timeLeft;
        var createdP2 = document.createElement("p");
        clearInterval(0);
        createdP.textContent = "Your final score is: " + timeRemaining;
        
        questionsDiv.appendChild(createdP2);
    }

    //create Label
    var createdLabel = document.createElement("label");
    createdLabel.setAttribute("id", "createdLabel");
    createdLabel.textContent = "Enter your initials: ";

    questionsDiv.appendChild(createdLabel);

    //usr input textbox
    var createdInput = document.createElement("input")
    createdInput.setAttribute("type", "text");
    createdInput.setAttribute("id", "initials");
    createdInput.textContent = "";

    questionsDiv.appendChild(createdInput);

    //create submit button
    var createdSubmit = document.createElement("button");
    createdSubmit.setAttribute("type", "submit");
    createdSubmit.setAttribute("id", "submit");
    createdSubmit.textContent = "Submit";

    questionsDiv.appendChild(createdSubmit);


    //event listener and local storage for initials
    createdSubmit.addEventListener("click", function() {
        var initials = createdInput.value;

        while (!initials) {
            initials = window.prompt("initials must be entered!")
        }
    

        if (initials) {
            var finalScore = {
                initials: initials,
                score: timeRemaining
            }
        }

        var allScores = localStorage.getItem("allScores");
        if (allScores === null) {
            allScores = [];

        } else {
            allScores = JSON.parse(allScores);
        }

        allScores.push(finalScore);
        var newScore = JSON.stringify(allScores);
        localStorage.setItem("allScores", newScore);
        window.location.replace("assets/highscores.html");

    });

    

}