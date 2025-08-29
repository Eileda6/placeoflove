const symbols = ['🍎','🍌','🍇','🍓','🍉','🍒','🍍','🥝'];
let cards = [...symbols, ...symbols]; // 2x chaque symbole
let revealedCards = [];
let lockBoard = false;
let score = 0;

shuffle(cards);

const gameBoard = document.getElementById("gameBoard");

function createCards() {
  gameBoard.innerHTML = "";
  cards.forEach((symbol, index) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.symbol = symbol;
    card.dataset.index = index;
    card.addEventListener("click", handleCardClick);
    gameBoard.appendChild(card);
  });
}

createCards();

function handleCardClick(e) {
  const card = e.target;
  if (lockBoard || card.classList.contains("revealed")) return;

  revealCard(card);
  revealedCards.push(card);

  if (revealedCards.length === 2) {
    score++;
    document.getElementById("score").textContent = score;
    lockBoard = true;

    const [card1, card2] = revealedCards;
    if (card1.dataset.symbol === card2.dataset.symbol) {
      revealedCards = [];
      lockBoard = false;
      checkWin();
    } else {
      setTimeout(() => {
        hideCard(card1);
        hideCard(card2);
        revealedCards = [];
        lockBoard = false;
      }, 1000);
    }
  }
}

function revealCard(card) {
  card.classList.add("revealed");
  card.textContent = card.dataset.symbol;
}

function hideCard(card) {
  card.classList.remove("revealed");
  card.textContent = '';
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function checkWin() {
  if (document.querySelectorAll('.card.revealed').length === cards.length) {
    const playerName = document.getElementById("playerName").value || "Anonyme";
    document.getElementById("finalScore").textContent = score;
    document.getElementById("winScreen").classList.remove("hidden");
    // Optionnel : alert
    alert(`Bravo ${playerName} ! Tu as gagné en ${score} coups ! 🎉`);
  }
}

function restartGame() {
  revealedCards = [];
  lockBoard = false;
  score = 0;
  document.getElementById("score").textContent = score;
  shuffle(cards);
  createCards();
}
