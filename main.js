class Calculate {
    constructor(result, prevResult) {
        this.result = result;
        this.prevResult = prevResult;
    }

    clear() {
        this.result.textContent = '';
        this.prevResult.textContent = '';
    }

    deleteNumber() {
        let tmp = this.result.textContent;
        let tmp2 = tmp.slice(0, tmp.length - 1);
        this.result.textContent = tmp2;
    }

    append(number) {
        this.result.textContent += number;
    }

    addDot() {
        if (!this.result.textContent.includes('.'))
            this.result.textContent += '.';
        else
            return;
    }

    operand(operation) {
        if (this.prevResult.textContent.includes('%') || this.prevResult.textContent.includes('/') || this.prevResult.textContent.includes('*') || this.prevResult.textContent.includes('-') || this.prevResult.textContent.includes('+'))
            return;
        this.result.textContent += operation;
        this.prevResult.textContent = this.result.textContent;
        this.result.textContent = '';

    }

    displayResult() {
        let currentOperand = this.prevResult.textContent.slice(this.prevResult.textContent.length - 1, this.prevResult.textContent.length);
        let prevNumber = parseFloat(this.prevResult.textContent);
        let currentNumber = parseFloat(this.result.textContent)
        let compilation;
        switch (currentOperand) {
            case '%':
                compilation = prevNumber % currentNumber;
                break;
            case '/':
                compilation = prevNumber / currentNumber;
                break;
            case '*':
                compilation = prevNumber * currentNumber;
                break;
            case '-':
                compilation = prevNumber - currentNumber;
                break;
            case '+':
                compilation = prevNumber + currentNumber;
                break;
            default:
                return;
        }
        this.result.textContent = compilation;
        this.prevResult.textContent = '';
    }
}

const operationBtns = document.querySelectorAll('[data-operation]');
const numberBtns = document.querySelectorAll('[data-number]');
const numberDot = document.querySelector('[data-dot]');
const numberClear = document.querySelector('[data-clear]');
const numberDelete = document.querySelector('[data-delete]');
const result = document.querySelector('[data-result]');
const prevResult = document.querySelector('.main__prevResult');
const outcome = document.querySelector('[data-outcome]');

let calculator = new Calculate(result, prevResult);

numberBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        calculator.append(btn.textContent);
    })
})

numberClear.addEventListener('click', () => {
    calculator.clear();
})

numberDelete.addEventListener('click', () => {
    calculator.deleteNumber();
})

numberDot.addEventListener('click', () => {
    calculator.addDot();
})

operationBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        calculator.operand(btn.textContent);
    })
})

outcome.addEventListener('click', () => {
    calculator.displayResult();
})