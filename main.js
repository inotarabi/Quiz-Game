const difficultyButtonsAll = document.querySelectorAll(".difficulty-buttons");
const easyButton = document.querySelector("#easy-button");
const mediumButton = document.querySelector("#medium-button");
const hardButton = document.querySelector("#hard-button");

const startScreen = document.querySelector("#start-screen");
const questionScreen = document.querySelector("#question-screen");
const endScreen = document.querySelector("#end-screen");
const questionCont = document.querySelector(".question-container");

let arrayQuestions = [];
let isQuizOn = false;

let question = "";
let correctAnswer = "";

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
            arrayQuestions = await fetchAPI(easyAPILink);
            console.log(arrayQuestions);
        } else if (button.textContent.trim() == "medium") {
            arrayQuestions = await fetchAPI(mediumAPILink);
            console.log(arrayQuestions);
        } else if (button.textContent.trim() == "hard") {
            arrayQuestions = await fetchAPI(hardAPILink);
            console.log(arrayQuestions);
        }
        startScreen.style.display = "none";
        questionScreen.style.display = "flex";
        isQuizOn = true;
    });
});

async function fetchAPI(difficultyChosenLink) {
    try {
        const response = await fetch(difficultyChosenLink);
        const data = await response.json();
        arrayQuestions = data.results;

        question = arrayQuestions[0].question;
        correctAnswer = arrayQuestions[0].correct_answer;

        questionCont.textContent = question;

        console.log(question);
        console.log(correctAnswer);

        return arrayQuestions;
    } catch (error) {
        console.error(error);
    }
}

function startQuiz() {}

// async function assignVar(arrayQuestions) {
//     question = arrayQuestions[0].question;
//     correctAnswer = arrayQuestions[0].correct_answer;
//     return question, correctAnswer;
// }
