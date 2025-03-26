
const rows = 20;
const cols = 20;
let snake = [{ x: 10, y: 10 }];
let direction = { x: 0, y: 0 };
let food = { x: 15, y: 15 };
let count = 0;
let bonusFood = null;
let bonusTimeout = null;
let bonusTimerInterval = null;


let scores = JSON.parse(localStorage.getItem('scores')) || [];
let highScore = Math.max(...scores, 0); 

window.onload = function() {
    createTable();
    placeFood();
    updateHighScoreDisplay();

    let speed = 100;
    setInterval(gameLoop, speed);
    document.addEventListener('keydown', changeDirection);
};


function updateHighScoreDisplay() {
    document.getElementById('highScore').innerText = `High Score: ${highScore}`;
}

function saveScore() {
    scores.push(count); 
    localStorage.setItem('scores', JSON.stringify(scores)); 
    highScore = Math.max(...scores); 
    updateHighScoreDisplay();
}

function endGame() {
    saveScore();
    if (count > highScore) {
        alert(`Congratulations! New High Score: ${count}`);
    } else {
        alert(`Game Over! Your score: ${count}\nHigh Score: ${highScore}`);
    }
    window.location.href = 'gameover.html'; 
}

function createTable() {
    const gameTable = document.getElementById('gameTable');
    for (let i = 0; i < rows; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < cols; j++) {
            const cell = document.createElement('td');
            cell.className = `cell-${i}-${j}`;
            row.appendChild(cell);
        }
        gameTable.appendChild(row);
    }
}

function placeFood() {
    food = {
        x: Math.floor(Math.random() * cols),
        y: Math.floor(Math.random() * rows)
    };
}

function placeBonusFood() {
    bonusFood = {
        x: Math.floor(Math.random() * cols),
        y: Math.floor(Math.random() * rows)
    };
    const bonusCell = document.querySelector(`.cell-${bonusFood.y}-${bonusFood.x}`);
    if (bonusCell) {
        bonusCell.classList.add('bonus');

    }

    showBonusTimer(5);
    bonusTimeout = setTimeout(removeBonusFood, 5000);
}

function removeBonusFood() {
    if (bonusFood) {
        const bonusCell = document.querySelector(`.cell-${bonusFood.y}-${bonusFood.x}`);
        if (bonusCell) {
            bonusCell.classList.remove('bonus');
            bonusCell.style.backgroundImage = '';
        }
        bonusFood = null;
        hideBonusTimer();
    }
}

function showBonusTimer(seconds) {
    const bonusTimer = document.getElementById('bonusTimer');
    bonusTimer.style.display = 'block';
    bonusTimer.innerText = `Bonus time left: ${seconds} seconds`;
    
    let timeLeft = seconds;
    bonusTimerInterval = setInterval(() => {
        timeLeft--;
        bonusTimer.innerText = `Bonus time left: ${timeLeft} seconds`;
        if (timeLeft <= 0) {
            clearInterval(bonusTimerInterval);
        }
    }, 1000);
}

function hideBonusTimer() {
    const bonusTimer = document.getElementById('bonusTimer');
    bonusTimer.style.display = 'none';
    clearInterval(bonusTimerInterval);
}

function changeDirection(event) {
    switch (event.key) {
        case 'ArrowUp':
            if (direction.y === 0) direction = { x: 0, y: -1 };
            break;
        case 'ArrowDown':
            if (direction.y === 0) direction = { x: 0, y: 1 };
            break;
        case 'ArrowLeft':
            if (direction.x === 0) direction = { x: -1, y: 0 };
            break;
        case 'ArrowRight':
            if (direction.x === 0) direction = { x: 1, y: 0 };
            break;
    }
}

function gameLoop() {
    moveSnake();
    if (isGameOver()) {
        endGame(); 
    }
    updateTable();
}

function moveSnake() {
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        placeFood();
        count += 5;
        updateScore();
        if (count % 20 === 0) {
            placeBonusFood();
        }
    } 
    else {
        snake.pop();
    }

    checkBonusFoodCollision();
}

function checkBonusFoodCollision() {
    if (bonusFood && snake[0].x === bonusFood.x && snake[0].y === bonusFood.y) {
        count += 20;
        updateScore();
        removeBonusFood();
    }
}

function isGameOver() {
    const head = snake[0];
    if (head.x < 0 || head.x >= cols || head.y < 0 || head.y >= rows) {
        return true;
    }
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === head.x && snake[i].y === head.y) {
            return true;
        }
    }
    return false;
}

function updateTable() {
    const gameTable = document.getElementById('gameTable');
    const cells = gameTable.getElementsByTagName('td');
    for (let cell of cells) {
        cell.className = cell.className.replace(/snake|snake-head|food|bonus/, '');
        cell.style.backgroundImage = '';
    }

    snake.forEach((segment, index) => {
        const cell = gameTable.querySelector(`.cell-${segment.y}-${segment.x}`);
        if (cell) {
            cell.classList.add(index === 0 ? 'snake-head' : 'snake');
        }
    });

    const foodCell = gameTable.querySelector(`.cell-${food.y}-${food.x}`);
    if (foodCell) {
        foodCell.classList.add('food');
        
    }

    if (bonusFood) {
        const bonusCell = gameTable.querySelector(`.cell-${bonusFood.y}-${bonusFood.x}`);
        if (bonusCell) {
            bonusCell.classList.add('bonus');
            
        }
    }
}

function updateScore() {
    document.getElementById('score').innerText = `Score: ${count}`;
}
