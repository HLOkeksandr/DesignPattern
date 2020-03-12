class Car {
  constructor(model, price) {
    this.model = model
    this.price = price
  }
}

class CarFactory {
  constructor() {
    this.cars = []
  }

  create(model, price) {
    const candidate = this.getCar(model)
    if (candidate) {
      return candidate
    }

    const newCar = new Car(model, price)
    this.cars.push(newCar)
    return newCar
  }

  getCar(model) {
    return this.cars.find(car => car.model === model)
  }
}

const factory = new CarFactory()

const bmwX6 = factory.create('bmw', 10000)
const audi = factory.create('audi', 12000)
const bmwX3 = factory.create('bmw', 8000)

console.log(bmwX3 === bmwX6)



function Flyweight(make, model, processor) {
  this.make = make;
  this.model = model;
  this.processor = processor;
};

var FlyWeightFactory = (function () {
  var flyweights = {};

  return {

    get: function (make, model, processor) {
      if (!flyweights[make + model]) {
        flyweights[make + model] =
          new Flyweight(make, model, processor);
      }
      return flyweights[make + model];
    },

    getCount: function () {
      var count = 0;
      for (var f in flyweights) count++;
      return count;
    }
  }
})();

function ComputerCollection() {
  var computers = {};
  var count = 0;

  return {
    add: function (make, model, processor, memory, tag) {
      computers[tag] =
        new Computer(make, model, processor, memory, tag);
      count++;
    },

    get: function (tag) {
      return computers[tag];
    },

    getCount: function () {
      return count;
    }
  };
}

var Computer = function (make, model, processor, memory, tag) {
  this.flyweight = FlyWeightFactory.get(make, model, processor);
  this.memory = memory;
  this.tag = tag;
  this.getMake = function () {
    return this.flyweight.make;
  }
  // ...
}

// log helper

var log = (function () {
  var log = "";

  return {
    add: function (msg) { log += msg + "\n"; },
    show: function () { console.log(log); log = ""; }
  }
})();

function run() {
  var computers = new ComputerCollection();

  computers.add("Dell", "Studio XPS", "Intel", "5G", "Y755P");
  computers.add("Dell", "Studio XPS", "Intel", "6G", "X997T");
  computers.add("Dell", "Studio XPS", "Intel", "2G", "U8U80");
  computers.add("Dell", "Studio XPS", "Intel", "2G", "NT777");
  computers.add("Dell", "Studio XPS", "Intel", "2G", "0J88A");
  computers.add("HP", "Envy", "Intel", "4G", "CNU883701");
  computers.add("HP", "Envy", "Intel", "2G", "TXU003283");

  log.add("Computers: " + computers.getCount());
  log.add("Flyweights: " + FlyWeightFactory.getCount());
  log.show();
}

run();