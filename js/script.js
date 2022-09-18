var resultArea = false;
var inputAreaEmpty = true;

function analyzer(strExpression) {
   let testReg = /^\-?[0-9]+(\.[0-9]+)?((\+|\-|x|\/|\%)[0-9]+(\.[0-9]+)?)*$/;
   return testReg.test(strExpression);
}

function computFirst(array) {
   let result;
   let testReg = /\+|\-/;
   let counter = 0;
   let computedArray = [];
   computedArray[counter] = [];
   if (array[0] === "") {
      computedArray[counter].push("-" + array[2]);
      for (let i = 3; i < array.length; i++) {
         if (testReg.test(array[i])) {
            counter += 1;
            computedArray[counter] = array[i];
            i += 1;
            counter += 1;
            computedArray[counter] = [];
         }
         computedArray[counter].push(array[i]);
      }
   }
   else {
      for (let i = 0; i < array.length; i++) {
         if (testReg.test(array[i])) {
            counter += 1;
            computedArray[counter] = array[i];
            i += 1;
            counter += 1;
            computedArray[counter] = [];
         }
         computedArray[counter].push(array[i]);
      }
   }
   for (let i = 0; i < computedArray.length; i++) {
      if (Array.isArray(computedArray[i])) {
         console.log(true);
         while (computedArray[i].length > 1) {
            console.log(computedArray[i][1]);
            if (computedArray[i][1] === "x") {
               result = parseFloat(computedArray[i][0]) * parseFloat(computedArray[i][2]);
               computedArray[i].shift();
               computedArray[i].shift();
               computedArray[i][0] = String(result);
            }
            else if (computedArray[i][1] === "/") {
               result = parseFloat(computedArray[i][0]) / parseFloat(computedArray[i][2]);
               computedArray[i].shift();
               computedArray[i].shift();
               computedArray[i][0] = String(result);
            }
            else if (computedArray[i][1] === "%") {
               result = parseFloat(computedArray[i][0]) % parseFloat(computedArray[i][2]);
               computedArray[i].shift();
               computedArray[i].shift();
               computedArray[i][0] = String(result);
            }
         }
      }
   }
   for (let i = 0; i < computedArray.length; i++) {
      if (Array.isArray(computedArray[i])) {
         computedArray[i] = computedArray[i][0];
      }
   }
   console.log(computedArray);
   while (computedArray.length > 1) {
      if (computedArray[1] === "+") {
         result = parseFloat(computedArray[0]) + parseFloat(computedArray[2]);
         computedArray.shift();
         computedArray.shift();
         computedArray[0] = String(result);
      }
      else if (computedArray[1] === "-") {
         result = parseFloat(computedArray[0]) - parseFloat(computedArray[2]);
         computedArray.shift();
         computedArray.shift();
         computedArray[0] = String(result);
      }
   }
   return computedArray[0];
}

function getResult() {
   let calcResult;
   let inputArea = document.getElementById("input-area");
   let outputArea = document.getElementById("output-area");
   let readElem = "";
   let testReg = /[0-9]|\+|\-|x|\/|\%|\./;
   for (let i = 0; i < inputArea.innerHTML.length; i++) {
      if (testReg.test(inputArea.innerHTML[i])) {
         readElem += inputArea.innerHTML[i];
      }
   }
   if (analyzer(readElem)) {
      let digitsOperators = [];
      let digit = "";
      let regTest = /[0-9]+|\./;
      for (let i = 0; i < readElem.length; i++) {
         if (regTest.test(readElem[i])) {
            digit += readElem[i];
         }
         else {
            digitsOperators.push(digit);
            digitsOperators.push(readElem[i]);
            digit = "";
         }
      }
      digitsOperators.push(digit);
      console.log(digitsOperators);
      calcResult = computFirst(digitsOperators);
      inputAreaEmpty = false;
      resultArea = true;
      if (String(calcResult).length > 15) {
         outputArea.style.fontSize = "24px";
      }
      else if (String(calcResult).length > 9) {
         outputArea.style.fontSize = "32px";
      }
      else {
         outputArea.style.fontSize = "50px";
      }
      outputArea.innerHTML = "=" + String(Number(Number.parseFloat(calcResult).toFixed(8)));
   }
   else {
      inputArea.innerHTML = "";
      outputArea.innerHTML = "";
      inputAreaEmpty = true;
      resultArea = false;
      throw new Error(`${readElem} isn't correct expression`);
   }
}

function moveResult(sym) {
   let outputArea = document.getElementById("output-area");
   let inputArea = document.getElementById("input-area");
   let readElem = "";
   let testReg = /[0-9]|\-|\./;
   for (let i = 0; i < outputArea.innerHTML.length; i++) {
      if (testReg.test(outputArea.innerHTML[i])) {
         readElem += outputArea.innerHTML[i];
      }
   }
   if (readElem.length > 0) {
      outputArea.innerHTML = "";
      resultArea = false;
      inputAreaEmpty = false;
      inputArea.innerHTML = readElem + sym;
   }
}

function update(sym) {
   let outputArea = document.getElementById("output-area");
   outputArea.innerHTML = "";
   let inputArea = document.getElementById("input-area");
   let readElem = "";
   let testReg = /[0-9]|\+|\-|x|\/|\%|\./;
   for (let i = 0; i < inputArea.innerHTML.length; i++) {
      if (testReg.test(inputArea.innerHTML[i])) {
         readElem += inputArea.innerHTML[i];
      }
   }
   if (resultArea) {
      readElem = "";
   }
   readElem += sym;
   if (readElem.length > 80) {
      inputArea.style.fontSize = "24px";
   }
   else {
      inputArea.style.fontSize = "32px";
   }
   inputArea.innerHTML = readElem;
   inputAreaEmpty = false;
   resultArea = false;
}

function updateOperator(sym) {
   let inputArea = document.getElementById("input-area");
   let readElem = "";
   let testReg = /[0-9]|\+|\-|x|\/|\%|\./;
   for (let i = 0; i < inputArea.innerHTML.length; i++) {
      if (testReg.test(inputArea.innerHTML[i])) {
         readElem += inputArea.innerHTML[i];
      }
   }
   let testOperator = /\+|\-|x|\/|\%|\./;
   if (testOperator.test(readElem[readElem.length - 1])) {
      let resultStr = "";
      let newLength = readElem.length - 1;
      for (let i = 0; i < newLength; i++) {
         resultStr += readElem[i];
      }
      resultStr += sym;
      if (resultStr.length > 80) {
         inputArea.style.fontSize = "24px";
      }
      else {
         inputArea.style.fontSize = "32px";
      }
      inputArea.innerHTML = resultStr;
   }
   else {
      readElem += sym;
      if (readElem.length > 80) {
         inputArea.style.fontSize = "24px";
      }
      else {
         inputArea.style.fontSize = "32px";
      }
      inputArea.innerHTML = readElem;
   }
}

function clean() {
   let inputArea = document.getElementById("input-area");
   let outputArea = document.getElementById("output-area");
   inputAreaEmpty = true;
   resultArea = false;
   inputArea.innerHTML = "";
   outputArea.innerHTML = "";
}

function deleteSym() {
   let inputArea = document.getElementById("input-area");
   let readElem = "";
   let testReg = /[0-9]|\+|\-|x|\/|\%|\./;
   for (let i = 0; i < inputArea.innerHTML.length; i++) {
      if (testReg.test(inputArea.innerHTML[i])) {
         readElem += inputArea.innerHTML[i];
      }
   }
   if (readElem.length >= 1) {
      if (readElem.length === 1) {
         inputAreaEmpty = true;
      }
      let resultAfterDelete = "";
      let newLength = readElem.length - 1;
      for (let i = 0; i < newLength; i++) {
         resultAfterDelete += readElem[i];
      }
      inputArea.innerHTML = resultAfterDelete;
   }
}

let buttonOne = document.getElementById("1");
buttonOne.onclick = function () {
   update("1");
}
let buttonTwo = document.getElementById("2");
buttonTwo.onclick = function () {
   update("2");
}
let buttonThree = document.getElementById("3");
buttonThree.onclick = function () {
   update("3");
}
let buttonFour = document.getElementById("4");
buttonFour.onclick = function () {
   update("4");
}
let buttonFive = document.getElementById("5");
buttonFive.onclick = function () {
   update("5");
}
let buttonSix = document.getElementById("6");
buttonSix.onclick = function () {
   update("6");
}
let buttonSeven = document.getElementById("7");
buttonSeven.onclick = function () {
   update("7");
}
let buttonEight = document.getElementById("8");
buttonEight.onclick = function () {
   update("8");
}
let buttonNine = document.getElementById("9");
buttonNine.onclick = function () {
   update("9");
}
let buttonZero = document.getElementById("0");
buttonZero.onclick = function () {
   update("0");
}

let buttonClean = document.getElementById("clean");
buttonClean.onclick = function () {
   clean();
}
let buttonDelete = document.getElementById("delete");
buttonDelete.onclick = function () {
   deleteSym();
}

let buttonPoint = document.getElementById("point");
buttonPoint.onclick = function () {
   if (resultArea && !inputAreaEmpty) {
      moveResult(".");
   }
   else if (!inputAreaEmpty) {
      updateOperator(".");
   }
}
let buttonPlus = document.getElementById("plus");
buttonPlus.onclick = function () {
   if (resultArea && !inputAreaEmpty) {
      moveResult("+");
   }
   else if (!inputAreaEmpty) {
      updateOperator("+");
   }
}
let buttonMinus = document.getElementById("minus");
buttonMinus.onclick = function () {
   if (resultArea && !inputAreaEmpty) {
      moveResult("-");
   }
   updateOperator("-");
}
let buttonMultiply = document.getElementById("multiply");
buttonMultiply.onclick = function () {
   if (resultArea && !inputAreaEmpty) {
      moveResult("x");
   }
   else if (!inputAreaEmpty) {
      updateOperator("x");
   }
}
let buttonDivision = document.getElementById("division");
buttonDivision.onclick = function () {
   if (resultArea && !inputAreaEmpty) {
      moveResult("/");
   }
   else if (!inputAreaEmpty) {
      updateOperator("/");
   }
}
let buttonPercent = document.getElementById("percent");
buttonPercent.onclick = function () {
   if (resultArea && !inputAreaEmpty) {
      moveResult("%");
   }
   else if (!inputAreaEmpty) {
      updateOperator("%");
   }
}

let buttonEqual = document.getElementById("equal");
buttonEqual.onclick = function () {
   if (!inputAreaEmpty) {
      getResult();
   }
}


