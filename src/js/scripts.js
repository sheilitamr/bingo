/* 
    Crear 3 contenedores, cartón usuario, números del bingo, cartón ordenador
    Función que genere un número aleatorio entre 1 y 99
    Función que genere 15 números aleatorios que no se repitan y los guarde en un array
    Usar esa función para rellenar los 2 cartones dentro de otra función
    Rellenar el bingo con números del 1 al 99
    Función que seleccione un número aleatorio entre el 1 y el 99 para marcarlo en el cartón de bingo cada X segundos
    Marcar el número que ha salido en el cartón del bingo
    Buscar en los cartones de los jugadores coincidencias para marcarlo
    Cada vez que busquemos coincidencias comprobar si ya están todos marcados o no
*/

const cardboardBingoNumbers = document.getElementById(
  'cardboard-bingo-numbers'
);

const cardboardPlayer = document.getElementById('cardboard-player');
const cardboardPc = document.getElementById('cardboard-pc');

const winPlayer = document.getElementById('win-player');
const winPc = document.getElementById('win-pc');

// Arrays para guardar los 15 números para rellenar los cartones de los jugadores
let arrayCardboardPlayer = [];
let arrayCardboardPc = [];

let inGame = false;
let interval;

const startButton = document.getElementById('start-button');

// array con los números para jugar (bombo del bingo)
let numbersToPlay = Array(99)
  .fill()
  .map((value, index) => index + 1);

// Función rellenar cartón bingo número 1 a 99
const fillBingo = () => {
  for (let i = 1; i <= 99; i++) {
    const spanNumber = document.createElement('span');
    spanNumber.id = `bingo-number-${i}`;
    spanNumber.textContent = i;
    cardboardBingoNumbers.append(spanNumber);
  }
};
fillBingo();

// Función que genera un números aleatorios entre 1 y 99
const randomNumber = () => {
  const randomNumberBingo = Math.floor(Math.random() * 99 + 1);
  return randomNumberBingo;
};
randomNumber();

// Función generar 15 números aleatorios sin repetir.
const randomNumberCardboard = array => {
  while (array.length < 15) {
    const randomCardNumber = randomNumber();
    if (!array.includes(randomCardNumber)) {
      array.push(randomCardNumber);
    }
  }

  return array;
};

// Función para rellenar los cartones de los jugadores
const fillCardboardUsers = (cardboard, array) => {
  const fragment = document.createDocumentFragment();
  randomNumberCardboard(array);
  for (const number of array) {
    const newSpan = document.createElement('span');
    if (cardboard.id === 'cardboard-player') {
      newSpan.id = `player-number-${number}`;
    } else {
      newSpan.id = `pc-number-${number}`;
    }
    newSpan.textContent = number;
    fragment.append(newSpan);
  }
  cardboard.append(fragment);
};

const extractNumber = () => {
  const randomPosition = Math.floor(Math.random() * numbersToPlay.length);
  const randomNumber = numbersToPlay[randomPosition];
  numbersToPlay = numbersToPlay.filter(number => {
    return number !== randomNumber;
  });
  markNumber(randomNumber);
};

const markNumber = number => {
  const numberBingoToPaint = document.getElementById(`bingo-number-${number}`);
  const numberPlayerToPaint = document.getElementById(
    `player-number-${number}`
  );
  const numberPcToPaint = document.getElementById(`pc-number-${number}`);
  numberBingoToPaint.classList.add('marked');
  if (numberPlayerToPaint) {
    numberPlayerToPaint.classList.add('marked');
  }
  if (numberPcToPaint) {
    numberPcToPaint.classList.add('marked');
  }
  checkWin();
};

const printTextWin = winner => {
  if (winner === 'player') {
    winPlayer.textContent = 'Player Win';
  } else {
    winPc.textContent = 'Pc Win';
  }
};

const checkWin = () => {
  const playerNumbers = document.querySelectorAll(
    '#cardboard-player span.marked'
  );

  const pcNumbers = document.querySelectorAll('#cardboard-pc span.marked');

  if (playerNumbers.length === 15) {
    printTextWin('player');
    clearInterval(interval);
  }
  if (pcNumbers.length === 15) {
    printTextWin('pc');

    clearInterval(interval);
  }
};

const startGame = () => {
  inGame = true;
  if (inGame) {
    interval = setInterval(() => {
      extractNumber();
    }, 100);
  }
};

startButton.addEventListener('click', startGame);

fillCardboardUsers(cardboardPlayer, arrayCardboardPlayer);
fillCardboardUsers(cardboardPc, arrayCardboardPc);
