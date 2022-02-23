const numberButtons = document.querySelectorAll(".num");
const operationButtons = document.querySelectorAll(".operator");
const equalsButton = document.querySelector(".equal");
const acButton = document.querySelector(".ac");
const pmButton = document.querySelector(".pm");
const percentButton = document.querySelector(".percent");
const prevDisp = document.querySelector(".previous-display");
const currDisp = document.querySelector(".current-display");

let previousOperand = "";
let currentOperand = "";
let operation = "";

let equalOrPercentBtnPressed = false;

numberButtons.forEach((number) => {
  number.addEventListener("click", () => {
    appendNumber(number.textContent);
    updateDisplay();
  });
});

operationButtons.forEach((op) => {
  op.addEventListener("click", () => {
    chooseOperator(op.textContent);
    updateDisplay();
  });
});

equalsButton.addEventListener("click", () => {
  compute();
  updateDisplay();
  equalOrPercentBtnPressed = true;
});

acButton.addEventListener("click", () => {
  clear();
  updateDisplay();
});

pmButton.addEventListener("click", () => {
  plusMinus();
  updateDisplay();
});

percentButton.addEventListener("click", () => {
  percent();
  updateDisplay();
  equalOrPercentBtnPressed = true;
});

const appendNumber = (num) => {
  if (num === "." && currentOperand.includes(".")) return;

  if (currentOperand === "0" && num === "0") return;
  if (num == "." && currDisp.innerText.includes("") && currentOperand != '0' && currentOperand != '0.' && currDisp.innerText == 0) num = '0.';
  
  if (currentOperand === "0" && num !== "0" && num !== ".") {
    currentOperand = num;
    return;
  }

  if (currentOperand.length > 10) return;

  if (equalOrPercentBtnPressed) {
    equalOrPercentBtnPressed = false; 
    currentOperand = num;
    return;
  }

  currentOperand += num;
};


const updateDisplay = () => {

  if (currentOperand.toString().length > 12) {
    currentOperand = currentOperand.toString().slice(0, 12);
  }
  currDisp.textContent = currentOperand;

  if (operation != null) {
    if(previousOperand[previousOperand.length-1] == '.') {
      previousOperand = previousOperand.slice(0, -1);
    }

    prevDisp.textContent = `${previousOperand} ${operation}`;
  } else {
    prevDisp.textContent = "";
  }
};
const chooseOperator = (op) => {
  if (currentOperand === "") return;

  if (previousOperand) {
    compute();
  }
  
  operation = op;
  previousOperand = currentOperand;
  currentOperand = "";
};

const compute = () => {
  let computation;
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  if (isNaN(prev) || isNaN(current)) return;
  switch (operation) {
    case "+":
      computation = prev + current;
      break;
    case "-":
      computation = prev - current;
      break;
    case "x":
      computation = prev * current;
      break;
    case "÷":
      computation = prev / current;
      break;
    default:
      return;
  }
  currentOperand = computation;
  operation = "";
  previousOperand = "";
  
};

const clear = () => {
  operation = "";
  previousOperand = "";
  currentOperand = "0";
  updateDisplay()
};

const plusMinus = () => {
  if (!currentOperand && currentOperand != '0') return;
  currentOperand = currentOperand * -1;
};

const percent = () => {
  if (!currentOperand) return;
  currentOperand = currentOperand / 100;
};