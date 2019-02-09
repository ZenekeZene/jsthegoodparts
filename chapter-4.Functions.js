// CHAPTER 4
// FUNCTIONS
info('\n\nCHAPTER 4\n\nFUNCTIONS\n\n---------------------------------------------------\n\n');

// Function literal:
var add = function(a, b) {
    return a + b;
}

log('2 + 2 = ' + add(2, 2));

// Invocation
// In addition to the declared paremeters, every function
// receives 2 additional parameters: this and arguments.
// The value of `this` is determined by the invocation pattern:

// 1. The Method Invocation Pattern:
// When a functions is stored as a property of an object, we call it a `method`.
// When a method is invoked, `this` is bound to that object.
var myObject = {
    value: 0,
    increment: function(inc) {
        this.value += typeof inc === 'number' ? inc : 1;
    }
}

myObject.increment();
log(myObject.value);
myObject.increment(2);
log(myObject.value);

 // 2. The Function Invocation Pattern
 // When a function is not the property of an object, the it is invoked as a function.
 var sum = add(3, 4);

 // when a function is invoked with this pattern, `this` is bound to the global object.
 // This was a mistake in the design of the language.
myObject.double = function() {
    var that = this;

    var helper = function() {
        that.value = add(that.value, that.value);
    }

    helper();
}

myObject.double();
log(myObject.value);