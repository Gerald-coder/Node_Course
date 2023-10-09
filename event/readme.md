# event core module

In nodejs, the event core modules allows us to listen to and handle events, the module provides us an EventEmitter class which is the main building block for working with events and events driven programming, the EventEmitter allows us to handle events and async operations in a structured way

1. event: this is a specific action or occurence that can be detected and listened to
2. listener : this is a function that listens for a specific event to occur and then executes a callback when that event is emitted
3. EventEmitter Class: this is offered to us by the event module, to handle our events, it is the heart of the event module, this class allows us to create objects that emit named events and register listeners to those events, instances of this class acts as the event emitter
4. event emission: when an event is occurs, the event emitter emits all the events by invoking all the associated listener's callbacks
5. on(): this is used to attach a listener to an event, it takes the event name as the first argument and the listener as the second argument, whenver the event is emitted, the listener function is executed
6. emit() : this is used to trigger (emit)an event, it takes the event name as the first argument and an optional secong argument which serves as the parameters of the listener callback
7. Error Handling: Proper error handling is essential when working with events. You can attach an error event listener using the on('error', ...) pattern to handle errors that might occur during event handling
8. custom events: You can create custom events by emitting events with names of your choice. This allows you to structure your application's logic around meaningful events.
9. Built-in Modules and Libraries: Many Node.js built-in modules and third-party libraries use the Event Emitter to manage asynchronous operations, like handling HTTP requests, file I/O, and more.

By understanding and using the Event Emitter, you can create efficient, non-blocking applications that respond to various events in a structured and organized way.
