/*
down INCREASES depth
up DECREASES depth
for each instruction, split it by space into new "tuple"
  tuple[0] = direction
  tuple[1] = units

  switch (direction) {
    case down:
      submarine.down(units)
      break;
    case up:
      submarine.up(units);
      break;
    case forward:
      submarine.forward(units);
  }
*/

function fileToList(inputFile) {
  const fs = require('fs');
  const data = fs.readFileSync(inputFile, 'utf8');
  let lines = data.split(/\r?\n/);

  // Handle blank lines and filter them out
  return lines.filter(elem => elem !== "");
}

class Submarine {
  constructor() {
    this.hposition = 0;
    this.depth = 0;
    this.aim = 0;
  }
  forward(num) {
    this.hposition += num;
    this.depth += this.aim * num;
  }
  up(num) {
    this.aim -= num;
  }
  down(num) {
    this.aim += num;
  }
  multiplyFinalPosition() {
    return this.hposition * this.depth;
  }
  move(arrayOfDirections) {
    arrayOfDirections.forEach(element => {
      let direction = element.split(" ")[0];
      let units = Number(element.split(" ")[1]);

      switch (direction) {
        case 'down':
        this.down(units)
        break;
        case 'up':
        this.up(units);
        break;
        case 'forward':
        this.forward(units);
      }
    });
  }
}

let submarine = new Submarine();
submarine.move(fileToList('day2_input.txt'));
// submarine.move(fileToList('day2_test.txt'));
console.log(submarine.multiplyFinalPosition());
