let displayValue = '';
let operatorValue = '';
let num1 = 0, num2 = 0, result = 0, decimal = 0, dCounter = 0;
const display = document.querySelector('#calc__inOutput');
const buttons = document.querySelectorAll('.toDisplay');
const operators = document.querySelectorAll('.operator');
const clearButton = document.querySelector('.clear');
const equalButton = document.querySelector('.equal');
const backspaceButton = document.querySelector('.backspace');

buttons.forEach(b => b.addEventListener('click', saveInput));
operators.forEach(b => b.addEventListener('click', operator));
equalButton.addEventListener('click', equal);
clearButton.addEventListener('click', clear);
backspaceButton.addEventListener('click', back);

function operator(e) {
    decimal = 0;
    if (operatorValue != '') {
        equal();
        num1 = result;
        operatorValue = this.textContent;
        return;
    }
    operatorValue = this.textContent;
    num1 = Number(displayValue);
    displayValue = '';
}
function saveInput(e) {
    if (this.textContent == '.') {
        if (decimal == 1) {
            return;
        }
        decimal = 1;
        dCounter++;
    }
    displayValue += this.textContent;
    display.textContent = displayValue;
}
function clear(e) {
    num1 = 0, num2 = 0, displayValue = '', operatorValue = '', result = 0, display.textContent = '0';
}
function back(e) {
    if (num2 == 0 && operatorValue != '') {
        return;
    }
    if (Number(displayValue) >= 10 || Number(displayValue) <= -10) {
        displayValue = displayValue.slice(0, -1);
        display.textContent = displayValue;
    } else {
        displayValue = '';
        display.textContent = '0';
    }

}
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => b == 0 ? 'ERROR. Division by 0.' : a / b;
function equal() {
    if (displayValue == '') {
        return;
    }
    if (operatorValue == '+' || operatorValue == '−' || operatorValue == '×' || operatorValue == '÷') {
        num2 = Number(displayValue);
        result = operate(operatorValue, num1, num2);
        if (dCounter > 0) {
            display.textContent = result.toFixed(2);
        } else {
            display.textContent = result;
        }
        displayValue = '';
        operatorValue = '';
        num1 = 0, num2 = 0, dCounter = 0;
    }
}
const operate = (operator, a, b) => operator == '+' ? add(a, b) : operator == '−' ? subtract(a, b) : operator == '×' ? multiply(a, b) : divide(a, b);


function inputFromKeyboard(e) {
    keyName = e.key;
    if (keyName == "Enter") keyName = "=";
    const key = document.querySelector(`button[name='${keyName}']`);
    if (key) key.click();
}
window.addEventListener('keydown', inputFromKeyboard);