function add(x, y) { return x + y; }
function sub(x, y) { return x - y; }
function mul(x, y) { return x * y; }
function div(x, y) { return x / y; }

var Command = function (execute, undo, value) {
  this.execute = execute;
  this.undo = undo;
  this.value = value;
}

var AddCommand = function (value) {
  return new Command(add, sub, value);
};

var SubCommand = function (value) {
  return new Command(sub, add, value);
};

var MulCommand = function (value) {
  return new Command(mul, div, value);
};

var DivCommand = function (value) {
  return new Command(div, mul, value);
};

var Calculator = function () {
  var current = 0;
  var commands = [];

  return {
    execute: function (command) {
      current = command.execute(current, command.value);
      commands.push(command);
      return this;
    },

    undo: function () {
      var command = commands.pop();
      current = command.undo(current, command.value);
      return this;
    },

    getCurrentValue: function () {
      return current;
    }
  }
}
var calculator = new Calculator();

// issue commands

calculator.execute(new AddCommand(100)).execute(new SubCommand(24))
// calculator.execute(new SubCommand(24));

// calculator.execute(new MulCommand(6));
// calculator.execute(new DivCommand(2));

// reverse last two commands

calculator.undo();
// calculator.undo();

// console.log(calculator.getCurrentValue());


// class Calculator {
//   constructor() {
//     this.value = 0
//     this.history = []
//   }

//   executeCommand(command) {
//     this.value = command.execute(this.value)
//     this.history.push(command)
//     return this;
//   }

//   undo() {
//     const command = this.history.pop()
//     this.value = command.undo(this.value)
//     return this;
//   }
// }

// class AddCommand {
//   constructor(valueToAdd) {
//     this.valueToAdd = valueToAdd
//   }

//   execute(currentValue) {
//     return currentValue + this.valueToAdd
//   }

//   undo(currentValue) {
//     return currentValue - this.valueToAdd
//   }
// }

// class SubtractCommand {
//   constructor(valueToSubtract) {
//     this.valueToSubtract = valueToSubtract
//   }

//   execute(currentValue) {
//     return currentValue - this.valueToSubtract
//   }

//   undo(currentValue) {
//     return currentValue + this.valueToSubtract
//   }
// }

// class MultiplyCommand {
//   constructor(valueToMultiply) {
//     this.valueToMultiply = valueToMultiply
//   }

//   execute(currentValue) {
//     return currentValue * this.valueToMultiply
//   }

//   undo(currentValue) {
//     return currentValue / this.valueToMultiply
//   }
// }

// class DivideCommand {
//   constructor(valueToDivide) {
//     this.valueToDivide = valueToDivide
//   }

//   execute(currentValue) {
//     return currentValue / this.valueToDivide
//   }

//   undo(currentValue) {
//     return currentValue * this.valueToDivide
//   }
// }

// class AddThenMultiplyCommand {
//   constructor(valueToAdd, valueToMultiply) {
//     this.addCommand = new AddCommand(valueToAdd)
//     this.multiplyCommand = new MultiplyCommand(valueToMultiply)
//   }

//   execute(currentValue) {
//     const newValue = this.addCommand.execute(currentValue)
//     return this.multiplyCommand.execute(newValue)
//   }

//   undo(currentValue) {
//     const newValue = this.multiplyCommand.undo(currentValue)
//     return this.addCommand.undo(newValue)
//   }
// }
// const calculator = new Calculator();
// calculator.executeCommand(new AddCommand(10))
//   .executeCommand(new MultiplyCommand(2))
//   .undo();
// console.log(calculator.value);