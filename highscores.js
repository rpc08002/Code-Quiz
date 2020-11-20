const highScoresList = document.querySelector('#highScoresList');
const highScores = JSON.parse(localStorage('highScores')) || []

highScoresLiist.innerHTML =
highScores.map(score => {
    return `<li class='high-score'>${score.name} - ${score.score}</li>`
}).join('')