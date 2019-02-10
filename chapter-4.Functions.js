// CHAPTER 4
// FUNCTIONS
warn('\n\nCHAPTER 4\n\nFUNCTIONS\n\n---------------------------------------------------\n\n');

// Function literal:
var add = function(a, b) {
    return a + b;
}

log('2 + 2 = ' + add(2, 2));

// Invocation
// In addition to the declared paremeters, every function
// receives 2 additional parameters: `this` and `arguments`.

// A.- THIS:
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
 // This was a mistake in the design of the language. `this` would still be bound to the
 // `this` variable of the outer function. A consequence of this error is that a method
 // cannot employ a inner function to help it do its work because the inner function does
 // not share the method's access to the object as its `this` is bound to the wrong value.
 // But there is a easy workaround, defint a variable and assings it the value of this (that).
myObject.double = function() {
    var that = this;

    var helper = function() {
        that.value = add(that.value, that.value);
    }

    helper();
}

myObject.double();
log(myObject.value);

// 3. The Constructor Invocation Pattern:
// If a function is invoked with the `new` prefix, then a new object will be created with a 
// hidden link to the value of the function's `prototype` member, an `this` will be bound 
// to that new object. (Also changes the behaviour of the return statement)

var Quo = function(string) {
    this.status = string;
}

Quo.prototype.get_status = function() {
    return this.status;
};

var myQuo = new Quo('confused');
log(myQuo.get_status());

// Not recommended.

// 4. The Apply Invocation Pattern:
// Cause JS is a functional object-oriented language, functions can have methods.
// The 'apply' method lets us construct an array of arguments to use to invoke a function.
// It also lets us choose the value of 'this'.
var array = [3, 4];
var sum = add.apply(null, array);
log(sum);

var statusObject = {
    status: 'A-OK'
}

// statusObject does not inherit from Quo.prototype,
// but we can invoke the get_status method on statusObject even though statusObject does not
// have a get_status method.
var status = Quo.prototype.get_status.apply(statusObject);
log(status);

// B.- ARGUMENTS:
// A bonus parameter that is available to functions. It gives the function access to all
// of the arguments that were supplied with the invocation, including excess arguments that
// were not assigned to parameters.
var sum = function() {
    var i, sum = 0;
    for (i = 0; i < arguments.length; i += 1) {
        sum += arguments[i];
    }
    return sum;
}
log(sum(4, 8, 15, 16, 23, 42));
// Becasuse of a design error, `arguments` is not really an array.
// It has a `length` property, but it lacks all of the array methods.

// Return:
// Can be used to cause the function to return early. When `return` is executed, the function
// returs inmediately without executing the remaining statements.
// A functions always returns a value. If the `return` value is not specified, then 'undefined'
// is returned.
// If the functions was invoked with the 'new' prefix and the 'return' value is not an object,
// then 'this' (the new object) is returned instead.

// Exceptions
// They are unusual mishaps that interfere with the normal flow of a program. Whe such a mishap
// is detected, your program should throw an exception:
var add = function(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') {
        throw {
            name: 'TypeError',
            message: 'add needs numbers'
        };
    }
    return a + b;
}

var try_it = function() {
    try {
        add('seven');
    } catch (e) {
        error(e.name + ' : ' + e.message);
    }
}
try_it();

// Augmenting Types:
// JS allows the basic types of the language to be augmented.
// Adding a methodto 'Object.prototype' makes that method available to all objects.
// This also works for functions, arrays, strings, numbers, regex and booleans.
Function.prototype.method = function (name, func) {
    this.prototype[name] = func;
    return this;
}
// By augmenting Function.prototype with a method 'method', we no longer have to type
// the name of the 'prototype' property. Tha bit a ugliness can now be hidden.

log(typeof Number);
Number.method('integer', function() {
    return Math[this < 0 ? 'ceil': 'floor'](this);
});
log((-10 / 3).integer());

String.method('trim', function() {
    return this.replace(/^\s+|\s+$/g, '');
});
log('"' + "     neat      ".trim() + '"');
// All values are inmediately endowed with the new methods, even values that were created
// before the methods were created.
// The prototypes of the basic types are public structures, so care be must taken when mixin libraries.
// One defensive technique is to add a method only if the method is known to be missing:
Function.prototype.method = function(name, func) {
    if (!this.prototype[name]) {
        this.prototype[name] = func;
        return this;
    }
}

// Recursion

// Scope
// Controls the visibility and lifetimes of variables and parameters. This reducing naming collisions
// and provides automatic memory management.
var foo = function() {
    var a = 3, b = 5;

    var bar = function() {
        var b = 7, c = 11;

        a += b + c;
    }

    bar();
}
// JS does not have block scope. JS does have function scope.
// The parameters and variables defined in a function are not visible outside of the function,
// and a variable defined anywhere within a function is visible everywhere within the function.
// It's recommended that variables be declared all variables used in a function at the top.

// Closure
// The good news about scope is that inner functions get access to the parameters and variables of the functions 