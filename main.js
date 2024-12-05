
const screen = document.getElementById('screen');
const buttons = document.querySelectorAll('.button');
const operators = ['+', '-', 'x', '÷'];
let currentInput = '';
let operator = '';
let firstValue = '';
let secondValue = '';

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.innerText;

        if (value === 'C') {
            clearScreen();
        } else if (value === '=') {
            calculateResult();
        } else if (operators.includes(value)) {
            setOperator(value);
        } else {
            updateScreen(value);
        }
    });
});

function updateScreen(value) {
    currentInput += value;
    screen.innerText = currentInput;
}

function clearScreen() {
    currentInput = '';
    firstValue = '';
    secondValue = '';
    operator = '';
    screen.innerText = '';
}

function setOperator(op) {
    if (currentInput === '') return; 
    firstValue = currentInput;
    operator = op;
    currentInput = '';
}

function calculateResult() {
    if (currentInput === '' || firstValue === '') return;
    secondValue = currentInput;

    let result;
    switch (operator) {
        case '+':
            result = parseFloat(firstValue) + parseFloat(secondValue);
            break;
        case '-':
            result = parseFloat(firstValue) - parseFloat(secondValue);
            break;
        case 'x':
            result = parseFloat(firstValue) * parseFloat(secondValue);
            break;
        case '÷':
            result = parseFloat(secondValue) !== 0 ? parseFloat(firstValue) / parseFloat(secondValue) : 'Error';
            break;
        default:
            result = 'Error';
    }

    screen.innerText = result;

    currentInput = result.toString();
    firstValue = '';
    secondValue = '';
    operator = '';
}