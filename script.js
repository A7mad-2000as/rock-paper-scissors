function computerPlay() {
    let randomChoice = Math.floor(Math.random() * 3);

    if (randomChoice === 0) {
        return "ROCK";
    }

    else if (randomChoice === 1) {
        return "PAPER";
    }

    else {
        return "SCISSORS";
    }
}

function playRound(playerSelection, computerSelection) {
    playerSelection = playerSelection.toUpperCase();

    if (playerSelection === computerSelection) {
        return `Draw! Both chose ${playerSelection}`;
    }

    else if (playerSelection === "ROCK" && computerSelection === "SCISSORS" ||
        playerSelection === "PAPER" && computerSelection === "ROCK" ||
        playerSelection === "SCISSORS" && computerSelection === "PAPER"
    ) {
        return `You Win! ${playerSelection} beats ${computerSelection}`;
    }

    else {
        return `You Lose :( ${computerSelection} beats ${playerSelection}`;
    }
}

let playerScore = 0;
let computerScore = 0;

const btns = document.querySelectorAll("button");
btns.forEach(btn => btn.addEventListener("click", selectButton));

function selectButton(e) {

    let result = playRound(e.target.classList.value, computerPlay());

    if (result.substr(4, 4).toUpperCase() === "WIN!") {
        playerScore++;
    }

    else if (result.substr(4, 4).toUpperCase() === "LOSE") {
        computerScore++;
    }

    else {
        playerScore += 0.5;
        computerScore += 0.5;
    }

    const results = document.querySelector(".results");

    
    const roundResult = document.createElement("p");
    roundResult.textContent = result + "\n" + "Player Score: " + playerScore + "\tComputer Score: " + computerScore + "\n";
    results.appendChild(roundResult);

    if (playerScore >= 5 || computerScore >= 5) {
        const gameResult = document.createElement("p");
        
        if (playerScore >= 5 && computerScore >= 5) {
            gameResult.textContent = "Draw! You both have 5 points";
        }
    
        else if (playerScore >= 5) {
            gameResult.textContent = "You won the game! Congratulations";
        }
    
        else if (computerScore >= 5) {
            gameResult.textContent = "You lost the game :( I'm sorry";
        }

        results.appendChild(gameResult);
        finishGame();
    }
}

function finishGame() {
    btns.forEach(btn => btn.removeEventListener("click", selectButton));
    const resetBtn = document.createElement("button");
    resetBtn.textContent = "Reset";
    resetBtn.addEventListener("click", resetGame);
    document.querySelector(".results").appendChild(resetBtn);
}

function resetGame() {
    const results = document.querySelector(".results");
    results.innerHTML = "";

    btns.forEach(btn => btn.addEventListener("click", selectButton));

    playerScore = 0;
    computerScore = 0;
}