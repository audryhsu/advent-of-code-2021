/*
  - markCoordinate method: check if coordinate is ".", if yes, then set coordinate to 1; else, increment + 1
  - loop through puzzle coordinates, if coordinate.marked >= 2, count
  return count of danger zones
*/
function findDeltaCoordinates(start, end) {
  let results = [];
  let horizontalMove = false;
  let temp = start;
  let coordinate;
  if (start.x === end.x) {
    counter = end.y - start.y
  }
  else if (start.y === end.y) {
    horizontalMove = true;
    counter = end.x - start.x;
  }
  if (counter < 0) {
    counter = Math.abs(counter);
    start = end;
    end = temp;
  }
  // console.log("COUNTER: ", counter);

  if (horizontalMove) {
    for (var i = 0; i <= counter; i++) {
      coordinate = [start.x + i, start.y];
      results.push(coordinate);
    }
  } else {
    for (var i = 0; i <= counter; i++) {
      coordinate = [start.x, start.y + i];
      results.push(coordinate);
    }
  }
  return results;
}

function fileToList(inputFile) {
  const fs = require('fs');
  const data = fs.readFileSync(inputFile, 'utf8');
  let lines = data.split(/\r\n/);
  return lines.filter(elem => elem !== "");
}

function createDirections(array) {
  let result = array.map(stringDirection => {
    strCoordinates = stringDirection.split(' -> ');
    let coordinates = strCoordinates.map((strCoordinate, _) => {
      return strCoordinate.split(",").map((coordinate, i) => {
        return Number(coordinate);
      });
    });
    return coordinates;
  });
  // console.log(result);
  return result;
}

function isNotDiaganol(startCoordinate, endCoordinate) {
  return startCoordinate.x === endCoordinate.x || startCoordinate.y === endCoordinate.y
}


class Puzzle {
  static MATRIX_SIZE = 1000;
  constructor() {
    this.coordinates = {}
    let key = 0;

      for (var row = 0; row < Puzzle.MATRIX_SIZE + 1; row++) {
        for (var col = 0; col < Puzzle.MATRIX_SIZE + 1; col++) {
          if (row > Puzzle.MATRIX_SIZE + 1) break;
          this.coordinates[key] = new Coordinate(row, col);
          key += 1;
        }
      }
  }
  getCountDangerCoordinates() {
    let result = [];
    for (let key in this.coordinates) {
      if (this.coordinates[key]['marked'] >= 2) {
        result.push(this.coordinates[key]);
      }
    }
    return result.length;
  }
  markDeltaCoordinates(array) {
    array.forEach((pair, _) => {
      this.findCoordinate(pair).mark();
    });
  }
  findCoordinate([x,y]) {
    for (let key in this.coordinates) {
      if ((this.coordinates[key]['x'] === x) && this.coordinates[key]['y'] === y) {
        let coordinate = this.coordinates[key];
        if (!coordinate) {
          console.log("QC >>");
          console.log([x, y]);
        }
        return coordinate;
      }
    }
  }
}

class Coordinate {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.marked = 0;
  }
  mark() {
    this.marked += 1;
  }
}

function convertToCoordinates(directionsArray) {
  return directionsArray.map((line, _) => {
    let newLine = [new Coordinate(line[0][0], line[0][1]), new Coordinate(line[1][0], line[1][1])];
    return newLine;
  });
}

let puzzle = new Puzzle();
let input = fileToList('day5_input.txt');
let directionsArray = createDirections(input);
let dangerArray = [];
let coordinateDirections = convertToCoordinates(directionsArray);
// console.log(coordinateDirections.length); //500

// coordinateDirections.forEach((direction, _) => {
//   let startCoordinate = direction[0];
//   let endCoordinate = direction[1]
//
//   if (isNotDiaganol(startCoordinate, endCoordinate)) {
//     dangerArray = dangerArray.concat(findDeltaCoordinates(startCoordinate, endCoordinate));
//   }
// });
// console.log(puzzle.coordinates);
// console.log(dangerArray.length);
puzzle.markDeltaCoordinates(dangerArray);

console.log(puzzle.getCountDangerCoordinates());
