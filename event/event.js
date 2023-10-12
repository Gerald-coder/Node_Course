const EventEmitter = require("events");
const logEvents = require("../logEvent");

class MyEvent extends EventEmitter {}

// initialize object
const myEvent = new MyEvent();

myEvent.on("event", function (a, b) {
  console.log("event emitted");
  console.log(a, b, this, this === myEvent);
});
myEvent.emit("event", "a", "b");

// initialize object
const myLogger = new MyEvent();

myLogger.on("log", (message) => logEvents(message));
// myLogger.emit("log", "you're doing well \n "); // this is where the event is emitted

// lets mske the listener asynchronous with a timer
setInterval(() => {
  myLogger.emit("log", "man on fire, ride on ");
}, 1000);

// n/b EventEmitter calls all listeners synchronously in the order the are registered, but you can make listeners asynchronous using the setTimers or process.nextTick

console.log("gerry");
