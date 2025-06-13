document.addEventListener('DOMContentLoaded', () => {
    const puzzleContainer = document.getElementById('puzzle');
    const shuffleBtn = document.getElementById('shuffle-btn');
    const movesDisplay = document.getElementById('moves');
    const timeDisplay = document.getElementById('time');
    const gameOverSection = document.getElementById('game-over');
    const finalMovesDisplay = document.getElementById('final-moves');
    const finalTimeDisplay = document.getElementById('final-time');
    
    let tiles = [];
    let emptyIndex = 15;
    let moves = 0;
    let seconds = 0;
    let timer = null;
    let isGameStarted = false;
    
    // Inicializar el rompecabezas
    function initPuzzle() {
        puzzleContainer.innerHTML = '';
        tiles = [];
        
        // Crear fichas ordenadas (1-15) + espacio vacío
        for (let i = 1; i <= 16; i++) {
            const tile = document.createElement('div');
            tile.className = 'tile';
            
            if (i === 16) {
                tile.classList.add('empty');
                tile.textContent = '';
            } else {
                tile.textContent = i;
            }
            
            tile.dataset.index = i - 1;
            tile.addEventListener('click', handleTileClick);
            puzzleContainer.appendChild(tile);
            tiles.push(tile);
        }
        
        emptyIndex = 15;
        moves = 0;
        seconds = 0;
        movesDisplay.textContent = '0';
        timeDisplay.textContent = '0';
        gameOverSection.style.display = 'none';
        isGameStarted = false;
        
        if (timer) {
            clearInterval(timer);
            timer = null;
        }
    }
    
    // Mezclar las fichas
    function shuffleTiles() {
        // Algoritmo de mezcla válido (solo permutaciones pares)
        do {
            // Realizar movimientos aleatorios válidos
            for (let i = 0; i < 1000; i++) {
                const possibleMoves = getPossibleMoves(emptyIndex);
                const randomMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
                swapTiles(randomMove, emptyIndex);
                emptyIndex = randomMove;
            }
        } while (isPuzzleSolved()); // Si por casualidad queda resuelto, mezclar de nuevo
        
        moves = 0;
        seconds = 0;
        movesDisplay.textContent = '0';
        timeDisplay.textContent = '0';
        isGameStarted = false;
        
        if (timer) {
            clearInterval(timer);
            timer = null;
        }
    }
    
    // Manejar clic en una ficha
    function handleTileClick(e) {
        const clickedIndex = parseInt(e.target.dataset.index);
        const possibleMoves = getPossibleMoves(emptyIndex);
        
        if (possibleMoves.includes(clickedIndex)) {
            if (!isGameStarted) {
                startGame();
            }
            
            swapTiles(clickedIndex, emptyIndex);
            emptyIndex = clickedIndex;
            moves++;
            movesDisplay.textContent = moves;
            
            if (isPuzzleSolved()) {
                endGame();
            }
        }
    }
    
    // Obtener movimientos posibles
    function getPossibleMoves(emptyPos) {
        const moves = [];
        const row = Math.floor(emptyPos / 4);
        const col = emptyPos % 4;
        
        // Arriba
        if (row > 0) moves.push(emptyPos - 4);
        // Abajo
        if (row < 3) moves.push(emptyPos + 4);
        // Izquierda
        if (col > 0) moves.push(emptyPos - 1);
        // Derecha
        if (col < 3) moves.push(emptyPos + 1);
        
        return moves;
    }
    
    // Intercambiar fichas
    function swapTiles(index1, index2) {
        const tempText = tiles[index1].textContent;
        tiles[index1].textContent = tiles[index2].textContent;
        tiles[index2].textContent = tempText;
        
        tiles[index1].classList.toggle('empty', tiles[index1].textContent === '');
        tiles[index2].classList.toggle('empty', tiles[index2].textContent === '');
    }
    
    // Comprobar si el rompecabezas está resuelto
    function isPuzzleSolved() {
        for (let i = 0; i < tiles.length - 1; i++) {
            if (tiles[i].textContent !== (i + 1).toString()) {
                return false;
            }
        }
        return tiles[tiles.length - 1].textContent === '';
    }
    
    // Iniciar el juego (y el temporizador)
    function startGame() {
        isGameStarted = true;
        timer = setInterval(() => {
            seconds++;
            timeDisplay.textContent = seconds;
        }, 1000);
    }
    
    // Finalizar el juego
    function endGame() {
        clearInterval(timer);
        finalMovesDisplay.textContent = moves;
        finalTimeDisplay.textContent = seconds;
        gameOverSection.style.display = 'block';
    }
    
    // Event listeners
    shuffleBtn.addEventListener('click', () => {
        initPuzzle();
        shuffleTiles();
    });
    
    // Inicializar el juego al cargar la página
    initPuzzle();
    shuffleTiles();
});