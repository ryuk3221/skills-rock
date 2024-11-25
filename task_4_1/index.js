class Calculator {

  add(a, b) {
    if (typeof a == 'number' && typeof b == 'number') {
      return a + b;
    }
  }

  subtract(a, b) {
    if (typeof a == 'number' && typeof b == 'number') {
      return a - b;
    }
  }

  multiply(a, b) {
    if (typeof a == 'number' && typeof b == 'number') {
      return a * b;
    }
  }

  divide(a, b) {
    if (typeof a == 'number' && typeof b == 'number') {
      return a / b;
    }
  }
}

const calculator = new Calculator();
console.log(calculator.add(3, 2));
console.log(calculator.subtract(12, 2));
console.log(calculator.multiply(20, 2));
console.log(calculator.divide(6, 2));