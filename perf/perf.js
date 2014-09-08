var s = [];

s.push(
  createSuite('toString', 'utility',

  'vector.toString()', function(){
    vector.toString();
  },

  'Vector2d.toString(array)', function() {
    Vector2d.toString(array);
  })
);

s.push(
  createSuite('clone', 'utility',

  '#clone', function(){
    vector.clone();
  },

  '.clone', function() {
    Vector2d.clone(array);
  })
);

s.push(
  createSuite('set', 'utility',

  '#set 1', function(){
    vector.set([5, 5]);
  },

  '#set 2', function(){
    vector.set(5, 5);
  },

  '.set 1', function() {
    Vector2d.set(array, [5, 5]);
  },

  '.set 2', function() {
    Vector2d.set(array, 5, 5);
  })
);

s.push(
  createSuite('add', 'math',

  '#add 1', function(){
    vector.add([100, 100]);
  },

  '#add 2', function(){
    vector.add(v2);
  },

  '.add', function() {
    Vector2d.add(array, [100, 100]);
  })
);

s.push(
  createSuite('subtract', 'math',

  '#subtract 1', function(){
    vector.subtract([100, 100]);
  },

  '#subtract 2', function(){
    vector.subtract(v2);
  },

  '.subtract', function() {
    Vector2d.subtract(array, [100, 100]);
  })
);

s.push(
  createSuite('multiply', 'math',

  '#multiply 1', function(){
    vector.multiply([100, 100]);
  },

  '#multiply 2', function(){
    vector.multiply(v2);
  },

  '.multiply', function() {
    Vector2d.multiply(array, [100, 100]);
  })
);

s.push(
  createSuite('divide', 'math',

  '#divide 1', function(){
    vector.divide([100, 100]);
  },

  '#divide 2', function(){
    vector.divide(v2);
  },

  '.divide', function() {
    Vector2d.divide(array, [100, 100]);
  })
);

s.push(
  createSuite('scale', 'manipulations',

  '#scale', function(){
    vector.scale(2);
  },

  '.scale', function() {
    Vector2d.scale(array, 2);
  })
);

s.push(
  createSuite('truncate', 'manipulations',

  '#truncate', function(){
    vector.truncate(2);
  },

  '.truncate', function() {
    Vector2d.truncate(array, 2);
  })
);

s.push(
  createSuite('reverse', 'manipulations',

  '#reverse', function(){
    vector.reverse();
  },

  '.reverse', function() {
    Vector2d.reverse(array);
  })
);

s.push(
  createSuite('rotate', 'manipulations',

  '#rotate 1', function(){
    vector.rotate(45);
  },

  '#rotate 2', function(){
    vector.rotate(45, [100, 100]);
  },

  '.rotate 1', function() {
    Vector2d.rotate(array, 45);
  },

  '.rotate 2', function() {
    Vector2d.rotate(array, 45, [100, 100]);
  })
);

s.push(
  createSuite('reflect', 'manipulations',

  '#reflect', function(){
    vector.reflect(v3);
  },

  '.reflect', function() {
    Vector2d.reflect(array, [-100, 100]);
  })
);

s.push(
  createSuite('unit', 'manipulations',

  '#unit', function(){
    vector.unit();
  },

  '.unit', function() {
    Vector2d.unit(array);
  })
);

s.push(
  createSuite('normal', 'manipulations',

  '#normal', function(){
    vector.normal();
  },

  '.normal', function() {
    Vector2d.normal(array);
  })
);

s.push(
  createSuite('distanceTo', 'queries',

  '#distanceTo 1', function(){
    vector.distanceTo([100, 100]);
  },

  '#distanceTo 2', function(){
    vector.distanceTo(v2);
  },

  '.distanceTo', function() {
    Vector2d.distanceTo(array, [100, 100]);
  })
);

s.push(
  createSuite('distanceToSq', 'queries',

  '#distanceToSq 1', function(){
    vector.distanceToSq([100, 100]);
  },

  '#distanceToSq 2', function(){
    vector.distanceToSq(v2);
  },

  '.distanceToSq', function() {
    Vector2d.distanceToSq(array, [100, 100]);
  })
);

s.push(
  createSuite('lengthOf', 'queries',

  '#lengthOf', function(){
    vector.lengthOf();
  },

  '.lengthOf', function() {
    Vector2d.lengthOf(array);
  })
);

s.push(
  createSuite('lengthOfSq', 'queries',

  '#lengthOfSq', function(){
    vector.lengthOfSq();
  },

  '.lengthOfSq', function() {
    Vector2d.lengthOfSq(array);
  })
);

s.push(
  createSuite('dot', 'queries',

  '#dot', function(){
    vector.dot(v3);
  },

  '.dot', function() {
    Vector2d.dot(array, [-100, 100]);
  })
);

s.push(
  createSuite('cross', 'queries',

  '#cross', function(){
    vector.cross(v3);
  },

  '.cross', function() {
    Vector2d.cross(array, [-100, 100]);
  })
);

s.push(
  createSuite('angle', 'queries',

  '#angle 1', function(){
    vector.angle();
  },

  '#angle 2', function(){
    vector.angle(v3);
  },

  '.angle 1', function() {
    Vector2d.angle(array);
  },

  '.angle 2', function() {
    Vector2d.angle(array, [-100, 100]);
  })
);

$(function(){
  layoutSuites(s);
});
