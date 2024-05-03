document.addEventListener('DOMContentLoaded', () => {
    const gameContainer = document.getElementById('gameContainer');
    const cards = [];
    const cardValues = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    let attempts = 0;
    let matchesFound = 0;
    let cardOne = null;
    let cardTwo = null;

    // 初始化卡片
    function initCards() {
        cardValues.forEach(value => {
            cards.push(createCard(value));
            cards.push(createCard(value));
        });
        cards.sort(() => 0.5 - Math.random());
        cards.forEach(card => gameContainer.appendChild(card));
    }
    
    // 创建卡片
    function createCard(value) {
        const card = document.createElement('div');
        card.className = 'card';
        const cardValue = document.createElement('span');
        cardValue.className = 'value';
        cardValue.textContent = value;
        card.appendChild(cardValue);
        card.dataset.value = value;
        card.addEventListener('click', flipCard);
        return card;
    }
    
    // 翻转卡片
    function flipCard() {
        if (cardOne && cardTwo) return;
        if (this === cardOne) return;

        this.classList.add('flipped');

        if (!cardOne) {
            cardOne = this;
        } else {
            cardTwo = this;
            attempts++;
            checkForMatch();
        }
    }

    // 检查是否匹配
    function checkForMatch() {
        if (cardOne.dataset.value === cardTwo.dataset.value) {
            disableCards();
            matchesFound++;
            if (matchesFound === cardValues.length) {
                alert(`Game Over! Total Attempts: ${attempts}`);
                resetGame();
            }
        } else {
            unflipCards();
        }
    }

// 如果匹配，禁用卡片
function disableCards() {
    cardOne.classList.add('matched');
    cardTwo.classList.add('matched');
    cardOne.removeEventListener('click', flipCard);
    cardTwo.removeEventListener('click', flipCard);
    resetTurn();
}

// 如果不匹配，翻回卡片
function unflipCards() {
    setTimeout(() => {
        cardOne.classList.remove('flipped');
        cardTwo.classList.remove('flipped');
        resetTurn();
    }, 1000);
}


    // 重置当前回合
    function resetTurn() {
        cardOne = null;
        cardTwo = null;
    }

    // 重置游戏
    function resetGame() {
        cards.forEach(card => {
            card.classList.remove('flipped');
            card.addEventListener('click', flipCard);
        });
        attempts = 0;
        matchesFound = 0;
        cardOne = null;
        cardTwo = null;
        cards.sort(() => 0.5 - Math.random());  // Optionally reshuffle cards
    }

    initCards();
});
