
function fileToList(inputFile) {
  const fs = require('fs');
  const data = fs.readFileSync(inputFile, 'utf8');
  let lines = data.split(/\r\n/);
  return lines.filter(elem => elem !== "");
}

function createBingoNums(inputArray) {
  return inputArray[0].split(",").map((stringNum) => Number(stringNum));
}

function getBoardNumbers(inputArray) {
  inputArray = inputArray.slice(1)
  let boardNumbers = [];
  let counter = 0;
  let board = [];

  for (var i = 0; i < inputArray.length + 1; i++) {
    if (counter === 5) {
      boardNumbers.push(board.flat());
      board = [];
      counter = 0;
    }
    if (i < inputArray.length) {
      let numArr = inputArray[i]
      .split(" ")
      .filter(elem => elem !== "")
      .map(stringNum => Number(stringNum));
      board.push(numArr);
      counter += 1;
    }
  }
  return boardNumbers;
}

function createBoards(boardNumbers) {
  return boardNumbers.map(numbersArray => new Board(numbersArray));
}

class Game {
  static POSSIBLE_WINNING_ROWS = [
    [0, 1, 2, 3, 4],
    [5, 6, 7, 8, 9],
    [10, 11, 12, 13, 14],
    [15,16,17,18,19],
    [20,21,22,23,24],
    [0,5,10,15,20],
    [1,6,11,16,21],
    [2,7,12,17,22],
    [3,8,13,18,23],
    [4,9,14,19,24],
  ]
  constructor() {
    let cleanArray = fileToList('day4_input.txt');
    let boardNumbers = getBoardNumbers(cleanArray);

    this.bingoNums = createBingoNums(cleanArray);
    this.bingoNumber = null;
    this.boards = createBoards(boardNumbers);
    this.winningBoard = null;
    this.score = null;
    this.winningBoards = [];
    this.loserBoard = null;
    this.remaining = this.boards;
  }
  play() {
    this.drawFirstFiveBingoNumbers();
    while (!this.isLastBoard()) {
      this.drawBingoNumber();
      this.updateBoards();
      this.addWinningBoards();
      this.getRemainingBoards();
    }
    // this.winningBoard = this.getBingoBoard();

    this.getLastWinningBoard();
    while (!this.loserBoard.hasBingo()) {
      this.drawBingoNumber()
      this.updateBoards();
    }
    this.calculateScore(this.loserBoard);
    console.log("SCORE: ", this.score);
  }
  drawBingoNumber() {
    this.bingoNumber = this.bingoNums.shift();
    return this.bingoNumber;
  }
  updateBoards() {
    this.remaining.forEach(board => {
      board.update(this.bingoNumber);
    });
  }
  getBingoBoard() {
    let winningBoard = this.boards.filter(board => board.hasBingo())[0];
    if (!winningBoard || winningBoard.length < 1) return false;
    return winningBoard;
  }
  isLastBoard() {
    return this.remaining.length === 1;
  }
  getRemainingBoards() {
    this.remaining = this.boards.filter(board => board.won === false);
  }
  addWinningBoards() {
    let winners = this.remaining.filter(board => board.hasBingo());
  }

  calculateScore(board) {
    this.score = board.calculateSumOfSquares() * this.bingoNumber;
  }
  drawFirstFiveBingoNumbers() {
    for (var i = 0; i < 5; i++) {
      this.drawBingoNumber();
      this.updateBoards();
    }
  }
  getLastWinningBoard() {
    if (this.isLastBoard() && this.remaining.length === 1) {
      this.loserBoard = this.remaining[0];
    }
  }
}

class Board {
  constructor(numbersArray) {
    this.squares = {};
    this.won = false;
    for (let counter = 0; counter < 25; counter += 1) {
      this.squares[String(counter)] = new Square(numbersArray[counter]);
    }
  }
  hasBingo() {
    for (var i = 0; i < Game.POSSIBLE_WINNING_ROWS.length; i++) {
      let row = Game.POSSIBLE_WINNING_ROWS[i];
      let allMarked = row.filter(key => this.squares[key]['value'] === Square.MARKED);
      if (allMarked.length === 5) {
        this.won = true;
        return true;
      }
    }
    return false;
  }
  update(bingoNumber) {
    for (let key in this.squares) {
      if (this.squares[key]['value'] === bingoNumber) {
        this.squares[key].mark();
      }
    }
  }
  getUnmarkedValues() {
    let result = [];
    for (let key in this.squares) {
      if (this.squares[key].isUnmarked()) result.push(this.squares[key]['value'])
    }
    return result;
  }
  calculateSumOfSquares() {
    return this.getUnmarkedValues().reduce((accum, currentValue) => accum + currentValue , 0);
  }
}
class Square {
  static MARKED = null;
  constructor(value) {
    this.value = value;
  }
  isUnmarked() {
    return this.value !== Square.MARKED;
  }
  mark() {
    this.value = Square.MARKED;
  }
}

let game = new Game();
game.play();
