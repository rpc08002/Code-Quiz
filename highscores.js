// Uses query selector and parsing for high scores, saves to local storage
const highScoresList = document.querySelector('#highScoresList');
const highScores = JSON.parse(localStorage.getItem('highScores')) || []
// Lists names for highscores
highScoresList.innerHTML =
highScores.map(score => {
    return `<li class='high-score'>${score.name} - ${score.score}</li>`
}).join('')