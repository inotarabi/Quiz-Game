// diffuculty button consts
const difficultyButtonsAll = document.querySelectorAll(".difficulty-buttons");
const easyButton = document.querySelector("#easy-button");
const mediumButton = document.querySelector("#med-button");
const hardButton = document.querySelector("#hard-button");

// screen consts
const startScreen = document.querySelector("#start-screen");
const questionScreen = document.querySelector("#question-screen");
const endScreen = document.querySelector("#end-screen");

//input field consts
const usernameInput = document.getElementById("username-input");
const infoSubmit = document.getElementById("user-submit");

// end screen consts
const viewLeader = document.getElementById("leaderboard-button");
const playAgain = document.getElementById("play-again");

let userInfoArray = [];
let currentUserInfoArray = [
    {
        username: "",
        scoreVal: "",
    },
];
// question consts
const questionContainer = document.querySelector(".question-container");
const currentQuestionNumber = document.querySelector(".question-number");

// answer choice consts
const answerChoicesAll = document.querySelectorAll(".answer-options");
const answerChoiceOne = document.querySelector("#option1");
const answerChoiceTwo = document.querySelector("#option2");
const answerChoiceThree = document.querySelector("#option3");
const answerChoiceFour = document.querySelector("#option4");

// score consts
const score = document.querySelector(".score");
const finalScore = document.querySelector(".final-score");

// start screen cards
const instructionsCard = document.querySelector(".instructions-card");
const difficultyCard = document.querySelector(".difficulty-card");

// timer variables
const timer1 = document.querySelector(".timer");
let timerMins = 0;
let seconds = 0;
let timerSecondsOnes = 0;
let timerSecondsTens = 0;
let currentTimerId;
let gameMode = "";

// choice arrays
let arrayOfQuestions = [];
let answerChoices = [];
let actualAnswerChoices = [];
let incorrectAnswerChoices = [];
let isQuestionDone = false;

// question vars
let currentScore = 0;
let question = "";
let correctAnswer = "";
let option1 = "";
let option2 = "";
let option3 = "";
let option4 = "";
let chosenChoice = "";
let currentQuestionIndex = 0;

// API links based on difficulty
easyAPILink = "https://opentdb.com/api.php?amount=10&category=22&difficulty=easy&type=multiple";
mediumAPILink = "https://opentdb.com/api.php?amount=10&category=22&difficulty=medium&type=multiple";
hardAPILink = "https://opentdb.com/api.php?amount=10&category=22&difficulty=hard&type=multiple";

difficultyButtonsAll.forEach((button) => {
    button.addEventListener("click", async () => {
        console.log("Hello World");
        if (button.textContent.trim() == "EASY") {
            arrayOfQuestions = await fetchAPIGetData(easyAPILink);
            gameMode = "EASY";
            console.log(arrayOfQuestions);
        } else if (button.textContent.trim() == "MEDIUM") {
            arrayOfQuestions = await fetchAPIGetData(mediumAPILink);
            gameMode = "MEDIUM";

            console.log(arrayOfQuestions);
        } else if (button.textContent.trim() == "HARD") {
            arrayOfQuestions = await fetchAPIGetData(hardAPILink);
            gameMode = "HARD";
            console.log(arrayOfQuestions);
        }
        // change screens
        startScreen.style.display = "none";
        questionScreen.style.display = "flex";

        setVariables(arrayOfQuestions, currentQuestionIndex);
        displayQuestionComponents();
        checkGameModeAssignTime();
        timerTick();
    });
});

answerChoicesAll.forEach((button) => {
    button.addEventListener("click", () => {
        if (isQuestionDone) {
            return;
        }

        if (button.textContent.substring(2) === correctAnswer) {
            clearTimeout(currentTimerId);
            button.style.backgroundColor = "green";

            scoreCalc();
        } else {
            button.style.backgroundColor = "red";
            clearTimeout(currentTimerId);
            highlightCorrectAnswer();
        }

        isQuestionDone = true;

        setTimeout(() => {
            currentQuestionIndex++;
            isQuestionDone = false;
            displayNextQuestion();
        }, 2000);
    });
});

playAgain.addEventListener("click", () => {
    endScreen.style.display = "none";
    startScreen.style.display = "flex";
    resetGame();
});

infoSubmit.addEventListener("click", (event) => {
    event.preventDefault();
    const username = usernameInput.value;
    const newUser = {
        username: username,
        scoreVal: currentScore,
    };
    console.log(newUser);
    addUserData(newUser);
    console.log(localStorage);
    console.log(localStorage.userData);
    usernameInput.value = "";
});

viewLeader.addEventListener("click", () => {
    endScreen.style.display = "none";
    viewLeader.style.display = "flex";
});

function getUserData() {
    const userData = localStorage.getItem("userData");
    return userData ? JSON.parse(userData) : [];
}

function addUserData(newUser) {
    const existingData = getUserData();
    existingData.push(newUser);
    localStorage.setItem("userData", JSON.stringify(existingData));
}

function checkGameModeAssignTime() {
    if (gameMode === "EASY") {
        seconds = 10;
    } else if (gameMode === "MEDIUM") {
        seconds = 20;
    } else if (gameMode === "HARD") {
        seconds = 30;
    }
}

function timerTick() {
    timerSecondsTens = Math.floor(seconds / 10);
    timerSecondsOnes = seconds % 10;

    timer1.textContent = `${timerMins}:${timerSecondsTens}${timerSecondsOnes}`;

    seconds--;

    if (seconds < 0) {
        return;
    }

    currentTimerId = setTimeout(timerTick, 1000);
}

function highlightCorrectAnswer() {
    answerChoicesAll.forEach((button) => {
        if (button.textContent.substring(2) === correctAnswer) {
            button.style.backgroundColor = "green";
        }
    });
}

function scoreCalc() {
    answerChoicesAll.forEach((button) => {
        if (button.style.backgroundColor == "green") {
            currentScore++;
            score.textContent = `Score: ${currentScore}`;
            console.log(currentScore);
        }
    });
}

function displayNextQuestion() {
    checkGameModeAssignTime();
    if (currentQuestionIndex >= arrayOfQuestions.length) {
        endQuiz();
        return;
    }

    setVariables(arrayOfQuestions, currentQuestionIndex);
    displayQuestionComponents();
    clearTimeout(currentTimerId);
    timerTick();
    resetAnswerStyles();
}

function resetAnswerStyles() {
    answerChoicesAll.forEach((button) => {
        button.style.backgroundColor = "";
    });
}

function endQuiz() {
    questionScreen.style.display = "none";
    endScreen.style.display = "flex";
    finalScore.textContent = currentScore;
}

function resetGame() {
    currentScore = 0;
    currentQuestionIndex = 0;
    arrayOfQuestions = [];
    isQuestionDone = false;
    score.textContent = "Score: 0";
    resetAnswerStyles();
}

async function fetchAPIGetData(difficultyChosenLink) {
    try {
        const response = await fetch(difficultyChosenLink);
        const data = await response.json();
        arrayOfQuestions = data.results;
        return arrayOfQuestions;
    } catch (error) {
        console.error(error);
    }
}

function setVariables(questionArray, nextQuestion) {
    question = questionArray[nextQuestion].question;
    correctAnswer = questionArray[nextQuestion].correct_answer;
    incorrectAnswerChoices = questionArray[nextQuestion].incorrect_answers;

    answerChoices = incorrectAnswerChoices.slice();
    answerChoices.push(correctAnswer);
    answerChoices = shuffleArray(answerChoices).slice();
}

function displayQuestionComponents() {
    option1 = answerChoices[0];
    option2 = answerChoices[1];
    option3 = answerChoices[2];
    option4 = answerChoices[3];

    currentQuestionNumber.textContent = `Question: ${currentQuestionIndex + 1}`;
    questionContainer.textContent = question;
    answerChoiceOne.textContent = `A ${option1}`;
    answerChoiceTwo.textContent = `B ${option2}`;
    answerChoiceThree.textContent = `C ${option3}`;
    answerChoiceFour.textContent = `D ${option4}`;
}

function shuffleArray(array) {
    let arrayLength = array.length;
    let indiciesOfArray = arrayLength - 1;
    let randNumber;
    let val1;
    let val2;
    let tempVal;

    for (index = indiciesOfArray; index >= 0; index--) {
        randNumber = Math.floor(Math.random() * indiciesOfArray) + 1;
        val1 = array[randNumber];
        val2 = array[index];
        tempVal = val2;

        array[index] = val1;
        array[randNumber] = tempVal;
    }
    return array;
}
