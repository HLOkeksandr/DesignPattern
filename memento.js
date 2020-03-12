function Memento(state) {
  this.state = state;
}

Memento.prototype = {
  getState: function () {
    return this.state;
  }
};

function Originator() {
  this.state = null;
  this.memento = null;
}

Originator.prototype = {
  set: function (state) {
    this.state = state;
  },

  save: function () {
    return new Memento(this.state);
  },

  restore: function (memento) {
    return memento.getState();
  }
};

function Caretaker() {
  this.states = [];

  this.originator = new Originator();
}

Caretaker.prototype = {
  set: function (state) {
    this.originator.set(state);
  },

  save: function () {
    this.states.push(this.originator.save());
  },

  undo: function (i) {
    if (!this.states.length) {
      return;
    }

    if (!i && i !== 0) {
      i = this.states.length - 1;
    }

    return this.originator.restore(this.states[i]);
  },

  count: function () {
    return this.states.length;
  }
};

var c = new Caretaker();

c.set('First');
c.set('Second');
c.save();

c.set('Third');
c.save();

c.set('Fourth');
c.save();

console.log('States:', c.count());
console.log('Last save: ', c.undo());
console.log('Second save: ', c.undo(1));
console.log('First save: ', c.undo(0));