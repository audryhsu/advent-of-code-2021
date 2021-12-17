/*
look at array with all first digits
find most common bit number

loop through bitNums that have commonBit in position i
if yes, posh to result array

Of the remainingBit Nums, loop through each and get the digit in  2nd position
push each digit to array
filter array to find most common bit Num.
filter array of  remaining bitNums for only bitNums with commonDigit in i position

*/


findArraysTargetValue(fileToList('day3_input.txt'), 0, 'most');
findArraysTargetValue(fileToList('day3_input.txt'), 0, 'least');

console.log(binaryToDecimal('101011111111') * binaryToDecimal('010000100011'));



function findArraysTargetValue(binaryArray, digitPosition, mostOrLeast) {
  if (binaryArray.length === 1) {
    console.log(binaryArray.join(""));
    return binaryArray.join("");
  }
  let digitsInScope = binaryArray.map(binNum => binNum[digitPosition]);
  let targetValue;

  if (mostOrLeast === 'most') {
    targetValue = findMostCommonValue(digitsInScope, '1', '0');
  } else {
    targetValue = findLeastCommonValue(digitsInScope, '1', '0')
  }

  let filteredArray = binaryArray.filter(binNum => binNum[digitPosition] === targetValue);
  findArraysTargetValue(filteredArray, digitPosition + 1, mostOrLeast);
}

function findLeastCommonValue(array, val1, val2) {
  let least;
  if (countOfNum(array, val1) < countOfNum(array, val2)) {
    least = val1;
  } else if (countOfNum(array, val1) > countOfNum(array, val2)) {
    least = val2;
  } else {
    least = val2;
  }
  return least;
}

function findMostCommonValue(array, val1, val2) {
  let commonValue;
  if (countOfNum(array, val1) > countOfNum(array, val2)) {
    commonValue = val1;
  } else if (countOfNum(array, val1) < countOfNum(array, val2)) {
    commonValue = val2;
  } else {
    commonValue = val1;
  }
  return commonValue;
}

function createDigitArrays(binaryArray) {
  let result = [];
  binaryArray.forEach((binNum, i) => {
    if (i === 0) {
      for (var x = 0; x < binNum.length; x++) {
        result.push([]);
      }
    }
    // loop through each digit and add to digit to result subarray
    for (var idx = 0; idx < binNum.length; idx++) {
      result[idx].push(binNum[idx]);
    }
  });
  return result;
}
  // //create gamma
  // let gamma = [];
  // result.forEach((digitsArray, i) => {
  //   if (countOfNum(digitsArray, '1') > countOfNum(digitsArray, '0')) {
  //     gamma.push(1);
  //   } else {
  //     gamma.push(0);
  //   }
  // });
  // let epsilon = inverseDigits(gamma.join(""));
  // gamma = binaryToDecimal(Number(gamma));
  // epsilon = binaryToDecimal(Number(epsilon));
  // console.log(gamma * epsilon);
  //


function binaryToDecimal(binaryNum) {
  return binaryNum
    .toString().split("")
    .reduce((accum, currentValue, currentIndex) => {
      let product = Number(currentValue) * Math.pow(2, binaryNum.toString().length - 1 - currentIndex);
      return accum + product;
    } , 0);
}

function countOfNum(array, numDigit) {
  return array.filter(elem => elem === numDigit).length;
}

function inverseDigits(num) {
  return num.split("")
  .map((digit, index) => {
    return Number(digit) === 1 ? 0: 1;
  }).join("");
}

function fileToList(inputFile) {
  const fs = require('fs');
  const data = fs.readFileSync(inputFile, 'utf8');
  let lines = data.split(/\r?\n/);

  // Handle blank lines and filter them out
  return lines.filter(elem => elem !== "");
}
