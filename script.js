const calculator = document.querySelector('.calculator');
const keys = document.querySelector('.keys');
const display = document.querySelector('.display');

const getKeyType = (key) => {
  const { action } = key.dataset;
  if (!action) return 'number';
  if (
    action === 'add'
      || action === 'subtract'
      || action === 'multiply'
      || action === 'divide'
  ) return 'operator';
  // For everything else, return the action
  return action;
};

const calculate = (v1, op, v2) => {
  const firstNum = parseFloat(v1);
  const secNum = parseFloat(v2);
  if (op === 'add') return firstNum + secNum;
  if (op === 'substract') return firstNum - secNum;
  if (op === 'multiply') return firstNum * secNum;
  if (op === 'divide') return firstNum / secNum;
  return 0;
};

const createResultString = (key, displayedNum, state) => {
  const keyContent = key.textContent;
  const {
    firstValue,
    modValue,
    operator,
    previousKeyType,
  } = state;
  const removePressed = () => Array.from(key.parentNode.children)
    .forEach((k) => k.classList.remove('is-depressed'));
  const keyType = getKeyType(key);

  if (keyType === 'number') {
    return displayedNum === '0' || previousKeyType === 'operator' || previousKeyType === 'calculate'
      ? keyContent : displayedNum + keyContent;
  }
  if (keyType === 'operator') {
    return firstValue
      && operator
      && previousKeyType !== 'operator'
      && previousKeyType !== 'calculate'
      ? calculate(firstValue, operator, displayedNum) : displayedNum;
  }

  if (keyType === 'decimal') {
    if (!displayedNum.includes('.')) {
      return `${displayedNum}.`;
    }
    if (previousKeyType === 'operator'
      || previousKeyType === 'calculate') {
      return '0.';
    }
    return displayedNum;
  }
  if (keyType === 'clear') return 0;

  if (keyType === 'calculate') {
    if (firstValue) {
      return previousKeyType === 'calculate'
        ? calculate(displayedNum, operator, modValue)
        : calculate(firstValue, operator, displayedNum);
    }

    return displayedNum;
  }
};

keys.addEventListener('click', (e) => {
  if (e.target.matches('button')) return;
  const displayedNum = display.textContent;
  const resultString = createResultString(e.target, displayedNum, calculator.dataset);
  display.textContent = resultString;
  // ...
});
