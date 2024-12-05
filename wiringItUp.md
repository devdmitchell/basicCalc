# Wiring up the calculator

> For this task, we will enhance the calculator developed in the preceding assignment using HTML/CSS by integrating JavaScript functionalities.

## Solution Preview

You can view the final solution in action through this GIF: [Solution GIF](https://i.imgur.com/YpdPMem.mp4)

## Implementation Steps

Follow these steps to integrate JavaScript functionality into your calculator:

1. Begin with your existing HTML/CSS code and create a new file named `main.js` to accommodate your JavaScript code.
2. Utilize a `script` tag in your `index.html` to incorporate your `main.js` file.
3. Proceed to wire up the calculator!

## Expected Features

Your enhanced calculator should exhibit the following functionalities:

- Display a maximum of two numbers and one operation on the screen simultaneously (e.g., `2+3`).
- Upon pressing the equal button, the calculator should compute the result of the expression and exhibit it on the screen.
  - If the expression is incomplete (e.g., no operation has been entered), no action should be taken.
- If an operation is pressed while the calculator already displays two numbers and an operation (e.g., `2+3`), the current expression should be calculated before setting the new operation.
- Pressing an operation button before entering any numbers should not trigger any action.
- The clear button should erase the entire screen.
- The dot button can be utilized to input decimal numbers.

## Suggested Approach

Various strategies can be employed to accomplish this task. You're encouraged to explore your preferred method. However, if you're seeking guidance, consider the functions outlined below for inspiration:

```javascript
// Store the two numbers and one operation as strings to facilitate character addition as users interact with the calculator
let firstNumber = '';
let operation = '';
let secondNumber = '';

// Calculate the result of the current expression, if valid, and display it on the screen
function calcResult() {
  if (firstNumber === '' || secondNumber === '' || operation === '') {
    return; 
  }
  let result;
  let num1 = parseFloat(firstNumber); 
  let num2 = parseFloat(secondNumber);  

  if (operation === '+') {
    result = num1 + num2;
  } else if (operation === '-') {
    result = num1 - num2;
  } else if (operation === 'x') {
    result = num1 * num2;
  } else if (operation === '÷') {
    if (num2 === 0) {
      alert("Error: Division by zero");
      clearScreen(); 
      return;
    }
    result = num1 / num2;
  }

  firstNumber = result.toString();
  secondNumber = '';
  operation = '';

  updateScreen();
}


// Handle operations when operation buttons (+, -, /, *) are pressed
function operationPressed(op) {
  if (firstNumber !== '' && secondNumber !== '') {
    calcResult();
  }
  operation = op;
  updateScreen();
}

// Handle numeric input
function numberPressed(number) {
  if (operation === '') {
    firstNumber += number;
  } else {
    secondNumber += number; 
  }
  updateScreen();

}

// Clear the calculator screen
function clearScreen() {
firstNumber = '';
  secondNumber = '';
  operation = '';
  updateScreen();
}

// Update the screen based on `firstNumber`, `operation`, and `secondNumber`
function updateScreen() {
 const screen = document.getElementById('screen');
  screen.textContent = `${firstNumber} ${operation} ${secondNumber}`;
}

// TODO: Implement query selectors and add event listeners to the calculator buttons
document.querySelectorAll('.button').forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent;

    if (!isNaN(value) || value === '.') {
      numberPressed(value);
    } else if (['+', '-', 'x', '÷'].includes(value)) {
      operationPressed(value);
    } else if (value === '=') {
      calcResult();
    } else if (value === 'C') {
      clearScreen();
    }
  });
});