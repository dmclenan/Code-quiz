var timeIsleft = document.getElementById("timeisleft");
var runTime = document.getElementById("RunTime");
var startBtn = document.getElementById("start");
var timer = document.getElementById("timer");
var startQuiz = document.getElementById("start-quiz-button");
var questionDev = document.getElementById("questionDev");
var questionTitle = document.getElementById("questionTitle");
var btnA = document.getElementById("btn1");
var btnB = document.getElementById("btn2");
var btnC = document.getElementById("btn3");
var btnD = document.getElementById("btn4");
var answerCheck = document.getElementById("answerCheck");
var review = document.getElementById("summary");
var summitButton = document.getElementById("submitInitialBtn");
var inputType = document.getElementById("initialInput");
var selectAll = document.getElementById("selectAll");
var seeScore = document.getElementById("highScoreSection");
var scoreResult = document.getElementById("finalScore");
var previewButton = document.getElementById("goBackBtn");
var reviewHighScoreButton = document.getElementById("clearHighScoreBtn");
var seeScore = document.getElementById("viewHighScore");
var scoreList = document.getElementById("listOfHighScores");


var rightAnswer = 0;
var questNumber = 0;
var ScoreBoard = 0;
var indexOfquestion = 0;


var totalTime = 100;
function newQuiz() {
    indexOfquestion = 0;
    totalTime = 100;
    timeIsleft.textContent = totalTime;
    inputType.textContent = "";

    startBtn.style.display = "none";
    questionDev.style.display = "block";
    timer.style.display = "block";
    runTime.style.display = "none";

    var startTimer = setInterval(function () {
        totalTime--;
        timeIsleft.textContent = totalTime;
        if (totalTime <= 0) {
            clearInterval(startTimer);
            if (indexOfquestion < questions.length - 1) {
                gameOver();
            }
        }
    }, 1000);

    startQuiz();
};


function startQuiz() {
    Questions();
}

function Questions() {
    questionTitle.textContent = questions[indexOfquestion].question;
    btnA.textContent = questions[indexOfquestion].options[0];
    btnB.textContent = questions[indexOfquestion].options[1];
    btnC.textContent = questions[indexOfquestion].options[2];
    btnD.textContent = questions[indexOfquestion].options[3];
}

function Answers(answer) {

    var lineBreak = document.getElementById("lineBreak");
    lineBreak.style.display = "block";
    answerCheck.style.display = "block";

    if (questions[indexOfquestion].answer === questions[indexOfquestion].options[answer]) {
        rightAnswer++;
        answerCheck.textContent = "Correct!";
    } else {
        totalTime -= 10;
        timeIsleft.textContent = totalTime;
        answerCheck.textContent = "Wrong! The correct answer is: " + questions[indexOfquestion].answer;
    }

    indexOfquestion++;
    if (indexOfquestion < questions.length) {
        Questions();
    } else {
        gameOver();
    }
}

function chooseA() { Answers(0); }
function chooseB() { Answers(1); }
function chooseC() { Answers(2); }
function chooseD() { Answers(3); }

function gameOver() {
    review.style.display = "block";
    questionDev.style.display = "none";
    startBtn.style.display = "none";
    timer.style.display = "none";
    runTime.style.display = "block";

    scoreResult.textContent = rightAnswer;
}


function storeHighScores(event) {
    event.preventDefault();
    if (inputType.value === "") {
        alert("Please enter your initials!");
        return;
    }

    startBtn.style.display = "none";
    timer.style.display = "none";
    runTime.style.display = "none";
    review.style.display = "none";
    seeScore.style.display = "block";


    var savedHighScores = localStorage.getItem("high scores");
    var scoresArray;

    if (savedHighScores === null) {
        scoresArray = [];
    } else {
        scoresArray = JSON.parse(savedHighScores)
    }
    var userScore = {
        initials: inputType.value,
        score: scoreResult.textContent
    };

    console.log(userScore);
    scoresArray.push(userScore);


    var scoresArrayString = JSON.stringify(scoresArray);
    window.localStorage.setItem("high scores", scoresArrayString);
    showHighScores();
}

var i = 0;
function showHighScores() {

    startBtn.style.display = "none";
    timer.style.display = "none";
    questionDev.style.display = "none";
    runTime.style.display = "none";
    review.style.display = "none";
    seeScore.style.display = "block";

    var savedHighScores = localStorage.getItem("high scores");

    if (savedHighScores === null) {
        return;
    }
    console.log(savedHighScores);

    var storedHighScores = JSON.parse(savedHighScores);

    for (; i < storedHighScores.length; i++) {
        var eachNewHighScore = document.createElement("p");
        eachNewHighScore.innerHTML = storedHighScores[i].initials + ": " + storedHighScores[i].score;
        scoreList.appendChild(eachNewHighScore);
    }
}



startQuiz.addEventListener("click", newQuiz);
btnA.addEventListener("click", chooseA);
btnB.addEventListener("click", chooseB);
btnC.addEventListener("click", chooseC);
btnD.addEventListener("click", chooseD);

summitButton.addEventListener("click", function (event) {
    storeHighScores(event);
});

seeScore.addEventListener("click", function (event) {
    showHighScores(event);
});

previewButton.addEventListener("click", function () {
    startBtn.style.display = "block";
    seeScore.style.display = "none";
});

reviewHighScoreButton.addEventListener("click", function () {
    window.localStorage.removeItem("high scores");
    scoreList.innerHTML = "High Scores Cleared!";
    scoreList.setAttribute("style", "font-family: 'Archivo', sans-serif; font-style: italic;")
});

const questions = [
    {
        question: "Which quarterback did Carter Coughlin take down for his first NFL sack?",
        options: ["a. Carson Wentz", "b. Russell Wilson", "c. Baker Mayfield", "d. Tom Brady"],
        correct: "d. Tom Brady"
    },
    {
        question: "Where did Austin Mack attend college? ",
        options: ["a. LSU", "b. Michigan", "c. Ohio State", "d. Indiana"],
        correct: "c. Ohio State"
    },
    {
        question: "Which Giants assistant coach did Tae Crowder play for at Georgia?",
        options: ["a. Kevin Sherrer", "b. Jody Wright", "c. Derek Dooley", "d. Michael Treier"],
        correct: "a. Kevin Sherrer"
    },
    {
        question: "Against which team did Xavier McKinney register his first career interception?",
        options: ["a. Baltimore Ravens", "b. Dallas Cowboys", "c. Cleveland Browns", "d. Arizona Cardinals"],
        correct: "b. Dallas Cowboys"
    },
    {
        question: "With what pick in the third round did the Giants select Matt Peart?",
        options: ["a. 73", "b. 85", "c. 99", "d. 106"],
        correct: "c. 99"
    },
];