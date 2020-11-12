const calculator = document.querySelector(".calculator");
const keys = document.querySelector(".keys");
const display = document.querySelector(".display");


keys.addEventListener('click', e => {
    if (e.target.matches('button')) {
        const key = e.target;
        const action = key.dataset.action;
        const keyContent = key.textContent;
        const displayedNum = display.textContent;
        const previousKeyType = calculator.dataset.previousKeyType;
        const removePressed = () => {
            return Array.from(key.parentNode.children)
                .forEach(k => k.classList.remove('is-depressed'));
        };
        // doesn't fit here but where?!
        const calculate = (v1, op, v2) => {
            let result = '';
            switch (op) {
                case 'add':
                    result = parseFloat(v1) + parseFloat(v2);
                    break;
                case 'substract':
                    result = parseFloat(v1) - parseFloat(v2);
                    break;
                case 'multiply':
                    result = parseFloat(v1) * parseFloat(v2);
                    break;
                case 'divide':
                    result = parseFloat(v1) / parseFloat(v2);
                    break;
            }
            return result;
        }

        if (!action) {
            calculator.dataset.previousKeyType = 'number';
            if (displayedNum === '0' || previousKeyType === 'operator') {
                display.textContent = keyContent;
                calculator.removeAttribute("data-previous-key-type");
            } else {
                display.textContent = displayedNum + keyContent;
            }

        }
        if (
            action === 'add' ||
            action === 'substract' ||
            action === 'multiply' ||
            action === 'divide'
        ) {

            const firstValue = calculator.dataset.firstValue
            const operator = calculator.dataset.operator
            const secondValue = displayedNum

            if (firstValue && operator){
                display.textContent = calculate(firstValue, operator, secondValue);
            }

            removePressed();
            key.classList.add('is-depressed');
            calculator.dataset.previousKeyType = 'operator';
            calculator.dataset.firstValue = displayedNum;
            calculator.dataset.operator = action;
        }

        if (action === 'decimal') {
            
            if (!displayedNum.includes('.')) {
                display.textContent = displayedNum + '.';
            } 
            
            if (previousKeyType==='operator') {
                display.textContent = '0.';
            }
            calculator.dataset.previousKeyType = 'decimal';
        }
        if (action === 'clear') {
            display.textContent = '0';
            removePressed();
            calculator.dataset.previousKeyType = 'clear';
        }
        if (action === 'calculate') {
            calculator.dataset.previousKeyType = 'calculate';
            const firstValue = calculator.dataset.firstValue;
            const operator = calculator.dataset.operator;
            const secondValue = displayedNum;

            display.textContent = calculate(firstValue, operator, secondValue);
            removePressed();
            


        }




    }
});

