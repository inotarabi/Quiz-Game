// button consts
const difficultyButtonsAll = document.querySelectorAll(".difficulty-buttons");
const easyButton = document.querySelector("#easy-button");
const mediumButton = document.querySelector("#medium-button");
const hardButton = document.querySelector("#hard-button");

// screen consts
const startScreen = document.querySelector("#start-screen");
const questionScreen = document.querySelector("#question-screen");
const endScreen = document.querySelector("#end-screen");

const questionContainer = document.querySelector(".question-container");
const answerChoiceOne = document.querySelector("#option1");
const answerChoiceTwo = document.querySelector("#option2");
const answerChoiceThree = document.querySelector("#option3");
const answerChoiceFour = document.querySelector("#option4");

let arrayOfQuestions = [];
let answerChoices = [];
let actualAnswerChoices = [];
let incorrectAnswerChoices = [];
let isQuizOn = false;

let question = "";
let correctAnswer = "";
let option1 = "";
let option2 = "";
let option3 = "";
let option4 = "";

// API links based on difficulty
easyAPILink =
    "https://opentdb.com/api.php?amount=10&category=22&difficulty=easy&type=multiple";
mediumAPILink =
    "https://opentdb.com/api.php?amount=10&category=22&difficulty=medium&type=multiple";
hardAPILink =
    "https://opentdb.com/api.php?amount=10&category=22&difficulty=hard&type=multiple";

difficultyButtonsAll.forEach((button) => {
    button.addEventListener("click", async () => {
        console.log("Hello World");
        if (button.textContent.trim() == "easy") {
            arrayOfQuestions = await fetchAPIGetData(easyAPILink);
            console.log(arrayOfQuestions);
        } else if (button.textContent.trim() == "medium") {
            arrayOfQuestions = await fetchAPIGetData(mediumAPILink);
            console.log(arrayOfQuestions);
        } else if (button.textContent.trim() == "hard") {
            arrayOfQuestions = await fetchAPIGetData(hardAPILink);
            console.log(arrayOfQuestions);
        }
        // change screens
        startScreen.style.display = "none";
        questionScreen.style.display = "flex";
        isQuizOn = true;
    });
});

async function fetchAPIGetData(difficultyChosenLink) {
    try {
        const response = await fetch(difficultyChosenLink);
        const data = await response.json();
        arrayOfQuestions = data.results;

        question = arrayOfQuestions[0].question;
        correctAnswer = arrayOfQuestions[0].correct_answer;
        incorrectAnswerChoices = arrayOfQuestions[0].incorrect_answers;

        answerChoices = incorrectAnswerChoices.slice();
        answerChoices.push(correctAnswer);
        answerChoices = shuffleArray(answerChoices).slice();

        displayQuestionComponents();

        // for test purposes
        console.log(question);
        console.log(correctAnswer);
        console.log(incorrectAnswerChoices);
        console.log(answerChoices);

        return arrayOfQuestions;
    } catch (error) {
        console.error(error);
    }
}

function displayQuestionComponents() {
    option1 = answerChoices[0];
    option2 = answerChoices[1];
    option3 = answerChoices[2];
    option4 = answerChoices[3];

    questionContainer.textContent = question;
    answerChoiceOne.textContent = `A ${option1}`;
    answerChoiceTwo.textContent = `B ${option2}`;
    answerChoiceThree.textContent = `C ${option3}`;
    answerChoiceFour.textContent = `D ${option4}`;
}

function startQuiz() {}

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
