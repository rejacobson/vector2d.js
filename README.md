# Vector2d.js - An object oriented vector library for javascript.


## Including Vector2d.js

Vector2d can be loaded through Require.js (AMD), CommonJS or using script tags.

Require.js

````javascript
define(['vector2d'], function(Vector2d) { ... });
````

Common js

````javascript
var Vector2d = require('vector2d').Vector2d;
````

Script tag

````html
<script src="vector2d.js"></script>
````


## Usage

A new Vector2d instance can be instantiated with or without the `new` operator:

````javascript
var v1 = new Vector2d();
var v2 = Vector2d();
````

Initial vector values can also be passed to the constructor function as a list of x y values, or as an array:

````javascript
var v1 = Vector2d(4, 5);
var v2 = Vector2d([1, 1]);
````

The vectors can now be manipulated and queried using method calls.

````javascript
v1.subtract(v2);

// v1 == [3, 4]
// v2 == [1, 1]
````

### Vector operations are destructive

Meaning, the calling vector gets set to the resultant of the operation.

Using `.clone()` makes a copy of the vector to ensure operations are non-destructive.

````javascript
var result = v1.clone().subtract(v2);

// result == [3, 4]
// v1 == [4, 5]
// v2 == [1, 1]
````

All methods which accept a vector parameter can also accept a 2 value array instead.

````javascript
v1.add([3, 3]);
v1.multiply([2, 2]);
````

## Method chaining

Methods which return a vector can be chained together.

````javascript
v1.add(v2).scale(2).rotate(0.5);
````
