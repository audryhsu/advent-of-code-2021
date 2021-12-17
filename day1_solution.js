const fs = require('fs');

/*
read the file
create first 3m window - 0, 1, 2 --- line[0], 0 + 1, 0 + 2.
create second 3m window - 1, 2,  3  --- line[1], n + 1, n + 2
  // second window startIdx will always be n + 1 from first start window.
  // keep track of first window's indx
get sum of each window
compare sums
  if increased, add to counter
create next windows by incrementing start elem by one.
continue until not enough measurements to create a new 3m sum.
  - second 3m window - if any of the elements is 'undefined' or if the sum
*/

function getMeasurementArray(inputFile) {
  const data = fs.readFileSync(inputFile, 'utf8');
  let lines = data.split(/\r?\n/);

  // Handle blank lines and filter them out
  lines = lines.map(elem => {
    if (elem === "") return NaN;
    return Number(elem)
  });
  return lines.filter(elem => !Number.isNaN(elem));
}

function depthIncreased(firstMeasurement, secondMeasurement) {
  return secondMeasurement - firstMeasurement > 0;
}

function getWindow(array, startIndx) {
  return [array[startIndx], array[startIndx + 1], array[startIndx + 2]];
}

function sumOfWindow(windowArray) {
  return windowArray.reduce((accum, currentValue) => accum + currentValue , 0);
}

function isInvalidWindow(windowArray) {
  return windowArray.some(measurement => !Number.isInteger(measurement))
}

function countIncreasingDepth(inputFile) {
  let lines = getMeasurementArray(inputFile);
  let firstWindow;
  let secondWindow;
  let counter = 0;
  for (var i = 0; i < lines.length; i++) {
    firstWindow = getWindow(lines, i);
    secondWindow = getWindow(lines, i + 1);
    if (isInvalidWindow(secondWindow)) break;
    if (depthIncreased(sumOfWindow(firstWindow), sumOfWindow(secondWindow))) counter += 1;
  }
  console.log(counter);
  return counter;
}

// countIncreasingDepth('day1_test.txt');
countIncreasingDepth('day1_input.txt');
