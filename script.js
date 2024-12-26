const grid = document.getElementById('puzzleGrid');
const shuffleButton = document.getElementById('shuffleButton');
const size = 3; // 3x3 grid
let tiles = [];

// Initialiser les tuiles
function initPuzzle() {
  tiles = [...Array(size * size).keys()];
  shuffleTiles();
  renderGrid();
}

// Mélanger les tuiles
function shuffleTiles() {
  for (let i = tiles.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
  }
}

// Afficher la grille
function renderGrid() {
  grid.innerHTML = '';
  tiles.forEach((tile, index) => {
    const tileElement = document.createElement('div');
    tileElement.classList.add('tile');
    tileElement.draggable = true;

    const row = Math.floor(tile / size);
    const col = tile % size;

    // Positionner l'image de la tuile
    tileElement.style.backgroundPosition = `-${col * 341}px -${row * 341}px`;
    tileElement.dataset.index = index;

    // Gestion du glisser-déposer
    tileElement.addEventListener('dragstart', handleDragStart);
    tileElement.addEventListener('dragover', handleDragOver);
    tileElement.addEventListener('drop', handleDrop);

    grid.appendChild(tileElement);
  });
}

// Variables pour le glisser-déposer
let draggedTileIndex = null;

// Gestion du début du glisser
function handleDragStart(event) {
  draggedTileIndex = event.target.dataset.index;
}

// Permettre le glisser au-dessus d'une autre tuile
function handleDragOver(event) {
  event.preventDefault();
}

// Gestion du dépôt de la tuile
function handleDrop(event) {
  const targetIndex = event.target.dataset.index;
  [tiles[draggedTileIndex], tiles[targetIndex]] = [
    tiles[targetIndex],
    tiles[draggedTileIndex],
  ];
  renderGrid();
  checkWin();
}

// Vérifie si le puzzle est résolu
function checkWin() {
  if (tiles.every((tile, index) => tile === index)) {
    alert('Félicitations ! Vous avez résolu le puzzle !');
  }
}

// Bouton de mélange
shuffleButton.addEventListener('click', () => {
  shuffleTiles();
  renderGrid();
});

// Initialiser le puzzle
initPuzzle();
