let wins = 0;
let losses = 0;
let draws = 0; 
let myOpacity = 0;
let scoreOpacity = 1;

function getPlayerSelection(){
    let selection = prompt("Enter your selection: [R] Rock, [P] Paper" +
            ", or [S] Scissors").toUpperCase().trim();
    while (!(selection === 'R' || 
             selection === 'P' || 
             selection === 'S' ||
             selection === 'ROCK' || 
             selection === 'PAPER' || 
             selection === 'SCISSORS')) {
        selection = prompt("Wrong input. Enter your selection: [R]" + 
                " Rock, [P] Paper, or [S] Scissors");
        selection = selection.toUpperCase().trim();
    }
    return selection.charAt(0);
}

function getRandomInt(max) {
    return Math.floor(Math.random()*max);
}

function computerPlay() {
    switch (getRandomInt(3)){
        case 0:
            return "R";
        case 1:
            return "P";
        case 2:
            return "S";
    }
}

function play(e){
    console.log(e.target.id);

}

function playRound(e,computerSelection){
    computerSelection = computerPlay();
    if (e.target.id === "R" && computerSelection === "S"){
        wins++;
        return 'You win! Rock beats Scissors';
    } else if (e.target.id === "P" && computerSelection === "R"){
        wins++;
        return 'You win! Paper beats Rock';
    } else if (e.target.id === "S" && computerSelection === "P"){
        wins++;
        return 'You win! Scissors beats Paper';
    } else if (computerSelection === "S" && e.target.id === "P"){
        losses++;
        return 'You lose! Scissors beats Paper';
    } else if (computerSelection === "P" && e.target.id === "R"){
        losses++;
        return 'You lose! Paper beats Rock';
    } else if (computerSelection === "R" && e.target.id === "S"){
        losses++;
        return 'You lose! Rock beats Scissors';
    } else {
        draws++;
        return 'It\'s a draw';
    }
}

function getIds() {

    playerScore = document.querySelector("#player");
    player = document.querySelector("#player-title");

    machineScore = document.querySelector("#machine");
    machine = document.querySelector("#machine-title");


    drawScore = document.querySelector("#draws");
    winnerText = document.querySelector('#winner')

    rockButton = document.querySelector('#R');
    paperButton = document.querySelector('#P');
    scissorButton = document.querySelector('#S');


    return [playerScore, machineScore, drawScore, player, machine, winnerText,
            rockButton, paperButton, scissorButton];


}

function finishGame(winner) {

    ids = getIds();
    playerScore = ids[0];
    machineScore = ids[1];
    player = ids[3];
    machine = ids[4];
    winnerText = ids[5];
    rockButton = ids[6];
    paperButton = ids[7];
    scissorButton = ids[8];

    if (winner === 'player'){
        playerScore.classList.add('win');
        player.classList.add('win');
        winnerText.textContent = 'The player wins!'; 
    } else if (winner === 'machine'){
        machineScore.classList.add('win');
        machine.classList.add('win');
        winnerText.textContent = 'The machine wins!';
    }

    rockButton.classList.add('disable');
    rockButton.disabled = true;

    paperButton.classList.add('disable');
    paperButton.disabled = true;

    scissorButton.classList.add('disable');
    scissorButton.disabled = true;

    fadeOut();
    myTimer = setTimeout(() => {fadeIn(); }, 1500);

}

function resetAll(){
    clearTimeout(myTimer);
    document.getElementById('winner').style.opacity = 0;
    document.getElementById('score-title').style.opacity = 1;
    myOpacity = 0;
    scoreOpacity = 1;

    ids = getIds();
    playerScore = ids[0];
    machineScore = ids[1];
    drawScore = ids[2];
    player = ids[3];
    machine = ids[4];
    rockButton = ids[6];
    paperButton = ids[7];
    scissorButton = ids[8];

    playerScore.textContent = '0';
    machineScore.textContent = '0';
    drawScore.textContent = '0';
    wins = 0;
    draws = 0;
    losses = 0;
    player.classList.remove('win');
    playerScore.classList.remove('win');
    machineScore.classList.remove('win');
    machine.classList.remove('win');

    rockButton.classList.remove('disable');
    paperButton.classList.remove('disable');
    scissorButton.classList.remove('disable');

    rockButton.disabled = false;
    paperButton.disabled = false;
    scissorButton.disabled = false;

}

function updateScore(e){

    if (e.target.id==='reset'){
        resetAll();
        return;
    }

    if(+wins===5){
        finishGame('player');
    }else if (+losses===5){
        finishGame('machine')
    }

    ids = getIds();
    playerScore = ids[0];
    machineScore = ids[1];
    drawScore = ids[2];

    playerScore.textContent = wins;
    machineScore.textContent = losses;
    drawScore.textContent = draws;


}

buttons = document.querySelectorAll('.btn');
buttons.forEach(button => button.addEventListener('click', playRound));
buttons.forEach(button => button.addEventListener('click', updateScore));

function fadeIn() {
    let increment = 0.01;
    if (myOpacity<1){
        myOpacity += increment;
        setTimeout(function(){fadeIn()},5);
    }
    document.getElementById('winner').style.opacity = myOpacity;
}

function fadeOut() {
    let decrement = 0.01;
    if (scoreOpacity>0){
        scoreOpacity -= decrement;
        setTimeout(function(){fadeOut()},5);
    }
    document.getElementById('score-title').style.opacity = scoreOpacity;
}