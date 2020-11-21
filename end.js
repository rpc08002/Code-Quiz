// Declaring constant variables using query selectors to target classes and IDs
const username = document.querySelector('#username');
const saveScoreBtn = document.querySelector('#saveScoreBtn');
const finalScore = document.querySelector('#finalScore');
const mostRecentScore = document.querySelector('mostRecentScore');
// Parses score from string into object
const highScores = JSON.parse(localStorage.getItem('highScores')) || []
// Maximum list of high scores is 5
const MAX_HIGH_SCORES = 5

finalScore.InnerText = mostRecentScore

// Will disable save button if no name is in field
username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value
})
// Function to save high score and prevent default screen when form is submitted
saveHighscore = e => {
    e.preventDefault()

    const score = {
        score: mostRecentScore,
        name: username.value
    }

    highScores.push(score)

    highScores.sort((a,b) => {
        return b.score - a.score
    })

    highScores.splice(5)

    localStorage.setItem('highScores', JSON.stringify(highScores))
    window.location.assign('/')
}