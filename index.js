let players = [];
let turn = 0;
let gameover = false;
let board = [];
let dimension = parseInt(document.getElementById("dimensions").value);
document
  .getElementById("dimensions")
  .addEventListener(
    "change",
    (event) => (dimension = parseInt(event.target.value))
  );

const startGame = () => {
  let input1 = document.getElementById("p1");
  let input2 = document.getElementById("p2");
  let select = document.getElementById("dimensions");
  let start = document.getElementById("game-start");
  let player1 = input1.value;
  let player2 = input2.value;

  if (isEmpty(player1) || isEmpty(player2)) {
    swal({
      text: "Please Enter Players Name",
      icon: "error",
      button: "Ok!"
    });
    return;
  }

  input1.setAttribute("disabled", true);
  input2.setAttribute("disabled", true);
  select.setAttribute("disabled", true);
  let game = document.getElementById("game-container");
  start.classList.add("hide");
  game.classList.remove("hide");

  players.push(player1);
  players.push(player2);

  document.getElementById("turn").innerHTML = player1 + "'s turn";

  initGame();
};

const initGame = () => {
  let gamecontainer = document.getElementById("game-container");

  for (let i = 0; i < dimension; i++) {
    let row = document.createElement("div");
    row.classList.add("row");
    let arr = [];
    for (let j = 0; j < dimension; j++) {
      let cell = document.createElement("div");
      cell.setAttribute("id", i.toString() + j.toString());
      cell.classList.add("cell");
      cell.addEventListener("click", (event) => handleClick(event, i, j));
      row.appendChild(cell);
      arr.push("");
    }
    gamecontainer.appendChild(row);
    board.push(arr);
  }
};
const handleClick = (event, i, j) => {
  let el = event.target;
  if (el.innerHTML !== "" || gameover) {
    return;
  }
  board[i][j] = turn % 2 === 0 ? "X" : "0";
  if (board[i][j] === "0") el.classList.add("text-white");
  el.innerHTML = board[i][j];
  el.innerHTML = turn % 2 === 0 ? "X" : "O";

  if (calculateWinner()) {
    swal({
      title: "YAAAAA HOOOOOO!",
      text: players[turn % 2] + " won"
    }).then(function () {
      window.location.href = "index.html";
      console.log("The Ok Button was clicked.");
    });
    gameover = true;
    return;
  }
  turn++;
  document.getElementById("turn").innerHTML = players[turn % 2] + "'s turn";
  if (turn === dimension * dimension) {
    swal({
      title: "Match Draw",

      icon: "Warning"
    }).then(function () {
      window.location.href = "index.html";
      console.log("The Ok Button was clicked.");
    });
    gameover = true;
    return;
  }
};

const isEmpty = (value) => !value || !value.trim();

const calculateWinner = () => {
  let len = board.length;
  if (turn < len) {
    return false;
  }
  for (let i = 0; i < len; i++) {
    if (board[i].every((el) => el === board[i][0] && el !== "")) {
      return true;
    }
    let start_col_val = board[0][i];
    let count = 1;
    for (let j = 1; j < len; j++) {
      if (start_col_val === board[j][i] && start_col_val !== "") {
        count++;
      }
    }
    if (count === len) {
      return true;
    }
  }
  let i = board[0][0];
  let j = 0;
  while (j < len) {
    if (board[0][0] === "") {
      break;
    }
    if (board[j][j] !== i) {
      break;
    } else {
      j++;
    }
  }
  if (j === len) {
    return true;
  }
  let rev_i = 0;
  let rev_j = len - 1;
  let rev_val = board[rev_i][rev_j];
  while (rev_i < len) {
    if (board[rev_i][rev_j] === "") {
      break;
    }
    if (rev_val !== board[rev_i][rev_j]) {
      break;
    } else {
      rev_i++;
      rev_j--;
    }
  }
  if (rev_i === len) {
    return true;
  }
  return false;
};
