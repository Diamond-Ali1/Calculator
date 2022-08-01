/*
------Andriod Phone Calculator Clone made by Diamond Ali-------
*/

//Declaration of variables
const numbers = Array.from(document.querySelectorAll("[data-number]"));
let workSpace = document.querySelector("#workSpace");  
const reset = document.querySelector(".clear");
const backspace = document.querySelector(".backspace");
const equalTo = document.querySelector(".equalTo");
const text = document.querySelector(".text");
const percentage = document.querySelector(".percentage");
const body = document.querySelector("body");
const decimalPoint = document.querySelector(".decimalPoint");
const darkMode = document.querySelector(".dark");
const keys = document.querySelector("#keys")
const  lightMode = document.querySelector(".light");
const whites = document.querySelectorAll(".white");
const black = document.querySelector(".black");
const confirmationMessage = document.querySelector(".confirmationMessage");
const cancel = document.querySelector(".choice .cancel");
const okay = document.querySelector(".choice .okay");
let displayValue = "0", 
firstNum = "0", 
secondNum = null, 
waitingForNextNumber = false, 
firstOperator = null, 
result, 
dataOperator, 
test = false, 
clickedEqualTo = false, 
dark = true;
//operator class
class Operators{
  constructor(selector) {
    this.selector = selector;
  }
  create() {
    const newButton = document.querySelector(this.selector);
    return newButton;
  }
}
//operator array
const operators = [
  new Operators(".divide").create(),
  new Operators(".plus").create(),
  new Operators(".minus").create(),
  new Operators(".times").create()
]
//reset screen button
function clearScreen() {
  displayValue = "0";
  firstNum = "0";
  secondNum = "0";
  waitingForNextNumber = false;
  test = false;
  increaseFontSize("4em");
}
//increases or decreaseas font-size
function increaseFontSize(size) {
  workSpace.style.transition = "0.3s";
  workSpace.style.fontSize = size;
}
function controlFontSize() {
  if (displayValue.length > 7 && displayValue.length < 11) {
    increaseFontSize("3em")
  } else if (displayValue.length > 10) {
    increaseFontSize("2.3em")
  } else {
    increaseFontSize("4em")
  }
}
//delete button
function backSpace() {
  displayValue.length === 1 ? displayValue = "0" : displayValue = displayValue.slice(0, displayValue.length - 1)
  controlFontSize()
}
//blinks the screen when an operator is clicked 
function blink() {
  workSpace.style.display = "none";
  setTimeout(() => {
    workSpace.style.display = "block";
  }, 100)
}
//activates dark mode
function turnOnDark() {
		body.style.background = "#121212";
		keys.style.background = "#252525";
		keys
		workSpace.style.background = "#121212";
		confirmationMessage.style.background = "white";
    black.style.color = "black";
    lightMode.style.display = "block";
    darkMode.style.display = "none";
    for (white of whites) {
      white.style.color = "white";
    }
}
//activates dark mode
function turnOnLight() {
		body.style.background = "#fafafa";
		keys.style.background = "white";
		keys
		workSpace.style.background = "#fafafa";
		confirmationMessage.style.background = "#252525";
    black.style.color = "white";
    darkMode.style.display = "block";
    lightMode.style.display = "none";
    for (white of whites) {
      white.style.color = "black";
    }
}
//adds event listener to the window to updates changes at all times 
addEventListener("click", () => {
  dark ? turnOnDark() : turnOnLight();
  for (let i = 0; i < displayValue.length ; i++) {
   if (displayValue.length > 1 && displayValue[0] == 0 && displayValue[1] !== ".") {
      displayValue = displayValue.slice(1);
    } 
  }
  workSpace.value = displayValue;
})
//Adds event listener on the number and on the decimal point 
numbers.map(number => {
  number.addEventListener("click", () => {
    if (waitingForNextNumber) {
      displayValue = "";
      test = true;
    }
    clickedEqualTo ? displayValue = "" + number.getAttribute("data-number")  : displayValue += number.getAttribute("data-number");
    waitingForNextNumber = false;
    clickedEqualTo = false;
    controlFontSize();
  })
})
decimalPoint.addEventListener("click", () => {
  if (displayValue.length != "" && displayValue.indexOf(".") == -1) {
      displayValue += ".";
      clickedEqualTo = false;
      controlFontSize();
  }
})
// makes updates when that dark mode icon is clicked
darkMode.addEventListener("click", () => {
  confirmationMessage.style.display = "block";
  text.innerHTML = "Turn on dark mode";
})
//makes updates when the light mode icon is clicked
lightMode.addEventListener("click", () => {
  confirmationMessage.style.display = "block";
  text.innerHTML = "Turn on light mode";
})
//prevents the change of the theme
cancel.addEventListener("click", () => {
  confirmationMessage.style.display = "none";
})
//changes the theme
okay.addEventListener("click", () => {
  dark ? dark = false : dark = true ;
  confirmationMessage.style.display = "none";
})
backspace.addEventListener("click", backSpace)
reset.addEventListener("click", clearScreen);
//makes updates when any mathematical operator is clicked
operators.map(operator => {
  operator.addEventListener("click", () => {
    blink();
    controlFontSize()
     dataOperator = operator.getAttribute("data-operator"); 
    if (test) {
      secondNum = displayValue;
      test = false;
      switch (firstOperator) {
        case "+":
          result = Number(firstNum) + Number(secondNum);
          break;
        case "-":
          result = Number(firstNum) - Number(secondNum);
          break;
        case "*":
          `${Number(firstNum) * Number(secondNum)}`.indexOf(".") ==  -1 ? result = `${Number(firstNum) * Number(secondNum)}` :  result = `${Number(firstNum) * Number(secondNum)}`.slice(0,8);
          break;
        case "/":
          `${Number(firstNum) / Number(secondNum)}`.indexOf(".") ==  -1 ? result = `${Number(firstNum) / Number(secondNum)}` :  result = `${Number(firstNum) / Number(secondNum)}`.slice(0,8);
          break;
      }
      displayValue = result;
      firstOperator = dataOperator;
      firstNum = result
      secondNum = null;
    } else {
      firstOperator = dataOperator;
      firstNum = displayValue;
    }
    waitingForNextNumber = true;
  })
})
percentage.addEventListener("click", () => {
  firstOperator = dataOperator;
  firstNum = displayValue;
  displayValue = Number(firstNum)/100;
})
equalTo.addEventListener("click", () => {
   controlFontSize(); 
  secondNum = displayValue
  test = false;
  switch (dataOperator) {
    case "+":
      result = Number(firstNum) + Number(secondNum);
      break;
    case "-":
      result = Number(firstNum) - Number(secondNum);
      break;
    case "*":
      `${Number(firstNum) * Number(secondNum)}`.indexOf(".") ==  -1 ? result = `${Number(firstNum) * Number(secondNum)}` :  result = `${Number(firstNum) * Number(secondNum)}`.slice(0,8)
      break;
    case "/":
      `${Number(firstNum) / Number(secondNum)}`.indexOf(".") ==  -1 ? result = `${Number(firstNum) / Number(secondNum)}` :  result = `${Number(firstNum) / Number(secondNum)}`.slice(0,8);
      break;
  }
  clickedEqualTo = true;
  displayValue = result;
  dataOperator = "";
  secondNum = null;
})
