document.addEventListener('DOMContentLoaded', () => {
    const gameContainer = document.getElementById('snakeGame');
    const scoreElement = document.getElementById('score');
    let score = 0;
    let cells = [];
    const gridSize = 20;
    let snake = [{ x: 10, y: 10 }]; // 初始蛇位置在网格中心
    let food = { x: 5, y: 5 }; // 初始食物位置
    let direction = { x: 0, y: 0 }; // 蛇的移动方向
    let gameSpeed = 200; // 控制游戏更新的速度（毫秒）
    let gameRunning = false; // 新增游戏是否正在运行的标志

    // 初始化网格
    for (let i = 0; i < gridSize * gridSize; i++) {
        let cell = document.createElement('div');
        cell.classList.add('gameCell');
        gameContainer.appendChild(cell);
        cells.push(cell);
    }

    // 绘制蛇和食物
    function drawGame() {
        cells.forEach(cell => cell.style.backgroundColor = 'black');
        snake.forEach(part => cells[part.y * gridSize + part.x].style.backgroundColor = 'green');
        cells[food.y * gridSize + food.x].style.backgroundColor = 'red';
    }
    

    // 更新蛇的位置
    function updateSnake() {
        if (!gameRunning) return; // 如果游戏未开始，则不更新蛇的位置
        const newHead = {
            x: snake[0].x + direction.x,
            y: snake[0].y + direction.y
        };

        // 检查游戏是否结束
        if (newHead.x < 0 || newHead.x >= gridSize || newHead.y < 0 || newHead.y >= gridSize || snake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
            gameRunning = false; // 停止游戏运行
            return alert("Game Over! Your score: " + score);
        }

        // 将新头部添加到蛇的数组中
        snake.unshift(newHead);

        // 检查是否吃到食物
        if (newHead.x === food.x && newHead.y === food.y) {
            score += 10;
            scoreElement.textContent = 'Score: ' + score;
            placeFood();
        } else {
            // 移动蛇：删除最后一段
            snake.pop();
        }

        drawGame();
    }

    // 放置食物
    function placeFood() {
        let foodPosition;
        do {
            foodPosition = {
                x: Math.floor(Math.random() * gridSize),
                y: Math.floor(Math.random() * gridSize)
            };
        } while (snake.some(segment => segment.x === foodPosition.x && segment.y === foodPosition.y));

        food = foodPosition;
    }

    // 监听键盘事件
    document.addEventListener('keydown', e => {
        if (e.key === "Enter" && !gameRunning) {
            gameRunning = true;
            direction = { x: 1, y: 0 }; // Start moving right
            gameLoop();
            document.getElementById('startPrompt').style.display = 'none'; // 隐藏提示
        } else if (gameRunning) {
            switch (e.key) {
                case 'ArrowLeft': if (direction.x === 0) direction = { x: -1, y: 0 }; break;
                case 'ArrowRight': if (direction.x === 0) direction = { x: 1, y: 0 }; break;
                case 'ArrowUp': if (direction.y === 0) direction = { x: 0, y: -1 }; break;
                case 'ArrowDown': if (direction.y === 0) direction = { x: 0, y: 1 }; break;
            }
        }
    });
    

    // 游戏循环
    function gameLoop() {
        setTimeout(() => {
            updateSnake();
            if (gameRunning) gameLoop();
        }, gameSpeed);
    }

    placeFood();
    gameLoop();
});
