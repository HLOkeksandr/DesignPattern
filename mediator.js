var Person = function(name) {
  this.name = name;
  this.chatroom = null;
};

Person.prototype = {
  send: function(message, to) {
    this.chatroom.send(message, this, to);
  },
  receive: function(message, from) {
    console.log(from.name + " to " + this.name + ": " + message);
  }
};

var Chatroom = function() {
  var persons = {};

  return {
    register: function(person) {
      persons[person.name] = person;
      person.chatroom = this;
    },

    send: function(message, from, to) {
      if (to) {
        // single message
        to.receive(message, from);
      } else {
        // broadcast message
        for (key in persons) {
          if (persons[key] !== from) {
            persons[key].receive(message, from);
          }
        }
      }
    }
  };
};

var yoko = new Person("Yoko");
var john = new Person("John");
var paul = new Person("Paul");
var ringo = new Person("Ringo");

var chatroom = new Chatroom();
chatroom.register(yoko);
chatroom.register(john);
chatroom.register(paul);
chatroom.register(ringo);

yoko.send("All you need is love.");
john.send("Hey, no need to broadcast", yoko);
paul.send("Ha, I heard that!");
ringo.send("Paul, what do you think?", paul);

var mediator = (function() {
  // Storage for topics that can be broadcast or listened to
  var topics = {};

  // Subscribe to a topic, supply a callback to be executed
  // when that topic is broadcast to
  var subscribe = function(topic, fn) {
    if (!topics[topic]) {
      topics[topic] = [];
    }
    topics[topic].push({ context: this, callback: fn });
    return this;
  };

  // Publish/broadcast an event to the rest of the application
  var publish = function(topic) {
    var args;
    if (!topics[topic]) {
      return false;
    }
    args = Array.prototype.slice.call(arguments, 1);
    for (var i = 0, l = topics[topic].length; i < l; i++) {
      var subscription = topics[topic][i];
      subscription.callback.apply(subscription.context, args);
    }
    return this;
  };

  return {
    publish: publish,
    subscribe: subscribe,
    installTo: function(obj) {
      obj.subscribe = subscribe;
      obj.publish = publish;
    }
  };
})();

// Example 1
mediator.name = "Doug";
mediator.subscribe("nameChange", function(arg) {
  console.log(this.name);
  this.name = arg;
  console.log(this.name);
});

mediator.publish("nameChange", "Jorn");

// Example 2
var obj = { name: "John" };
mediator.installTo(obj);

obj.subscribe("nameChange", function(arg) {
  console.log(this.name);
  this.name = arg;
  console.log(this.name);
});

obj.publish("nameChange", "Sam");
