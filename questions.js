const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull =document.querySelector('#progressBarFull');

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0; // Score is starting at zero
let questionCounter = 0; // Question is startiing at zero
let availableQuestions = []

let questions = [
    {
        question: 'Which of the following is not JavaScript Data Types?',
        choice1: 'Undefined',
        choice2: 'Number',
        choice3: 'Boolean',
        choice4: 'Float',
        answer: 4,
    },
    {
        question: 'Which of them is not the looping structures in JavaScript?',
        choice1: 'for',
        choice2: 'while',
        choice3: 'forwhich',
        choice4: 'dowhile',
        answer: 2
    },
    {
        question: 'What are the types of Pop up boxes available in JavaScript?',
        choice1: 'Alert',
        choice2: 'Prompt',
        choice3: 'Confirm',
        choice4: 'All of the above',
        answer: 4
    },
    {
        question: 'Which company developed JavaScript?',
        choice1: 'Netscape',
        choice2: 'Bell Labs',
        choice3: 'Sun Microsystems',
        choice4: 'IBM',
        answer: 1
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 4

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return 

        acceptingAnswers = false 
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }


        selectedChoice.parentElement.classList.add(classToApply)
        
        // Whenever we click on an answer, right or wrong, it will have time to show us
        setTimeout( () => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num;
    scoreText.innerText = score;
}

startGame()