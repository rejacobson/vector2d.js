(function() {

  function tof(n) {
    return Math.round(parseFloat(n)*100)/100;
  }

  function fl(n) {
    if (n[0] != undefined) {
      for (var i=0, len=n.length; i<len; ++i) {
        n[i] = tof(n[i]); 
      }
    } else {
      n = tof(n);
    }

    return n;
  }

  function floatEqual(result, expected, message) {
    equal(fl(result), fl(expected), message);
  };

  function floatDeepEqual(result, expected, message) {
    deepEqual(fl(result), fl(expected), message);
  };


  module('Initialization');

  test('new Vector2d() -- New vector with no arguments', function(){
    var v = new Vector2d();
    strictEqual(v.x, 0, 'x === 0');
    strictEqual(v.y, 0, 'y === 0');
  });

  test('new Vector2d(n, n) -- New vector with arguments', function(){
    var v = new Vector2d(1, 2);
    strictEqual(v.x, 1, "x === 1");
    strictEqual(v.y, 2, "y === 2");
  });

  test('new Vector2d([n, n]) -- New vector with array arguments', function(){
    var v = new Vector2d([1, 2]);
    strictEqual(v.x, 1, "x === 1");
    strictEqual(v.y, 2, "y === 2");
  });

  test('Vector2d() -- New vector without "new"', function(){
    var v = Vector2d([1, 2]);
    strictEqual(v.x, 1, "x === 1");
    strictEqual(v.y, 2, "y === 2");
  });


  module('Utility');

  test('#toArray', function(){
    var a = new Vector2d(1, 2);
    deepEqual(a.toArray(), [1, 2], 'toArray == [1, 2]');
  });

  test('#clone - Cloning a vector', function(){
    var a = new Vector2d(1, 2);
    var b = a.clone();

    deepEqual([a.x, a.y], [b.x, b.y], '['+ a.x +', '+ a.y +'] == ['+ b.x +', '+ b.y +']'); 
    notStrictEqual(a, b, 'The vectors are different objects'); 
  });

  test('#set - Setting a vector', function(){
    var a = new Vector2d();

    a.set(1, 2);
    deepEqual(a.toArray(), [1, 2], 'Set to [1, 2]');

    a.set([3, 4]);
    deepEqual(a.toArray(), [3, 4], 'Set to [3, 4]');

    a.set(new Vector2d(5, 6));
    deepEqual(a.toArray(), [5, 6], 'Set to [5, 6]');
  });


  module('Basic Math');

  test('#add - Add two vectors', function(){
    var a = new Vector2d(1, 2),
        b = new Vector2d(3, 4);

    deepEqual(a.clone().add(b).toArray(), [4, 6], '[1, 2] + [3, 4] == [4, 6]'); 
    deepEqual(a.clone().add([1, 2]).toArray(), [2, 4], '[1, 2] + Array[1, 2] == [2, 4]'); 
  });

  test('#subtract - Subtract two vectors', function(){
    var a = new Vector2d(1, 2),
        b = new Vector2d(3, 4);

    deepEqual(a.clone().subtract(b).toArray(), [-2, -2], '[1, 2] - [3, 4] == [-2, -2]');    
    deepEqual(a.clone().subtract([1, 2]).toArray(), [0, 0], '[1, 2] - Array[1, 2] == [0, 0]');
  });

  test('#multiply - Multiply two vectors', function(){
    var a = new Vector2d(1, 2),
        b = new Vector2d(3, 4);

    deepEqual(a.clone().multiply(b).toArray(), [3, 8], '[1, 2] * [3, 4] == [3, 8]');
    deepEqual(a.clone().multiply([2, 6]).toArray(), [2, 12], '[1, 2] * Array[2, 3] == [2, 6]');
  });

  test('#divide - Divide two vectors', function(){
    var a = new Vector2d(2, 2),
        b = new Vector2d(4, 8);

    deepEqual(a.clone().divide(b).toArray(), [0.5, 0.25], '[2, 2] / [4, 8] == [0.5, 0.25]');
    deepEqual(b.clone().divide(a).toArray(), [2, 4], '[4, 8] / [2, 2] == [2, 4]');
    deepEqual(a.clone().divide([2, 0.5]).toArray(), [1, 4], '[2, 2] / Array[2, 0.5] == [1, 4]');
  });


  module('Vector Manipulation');

  test('#scale - Scale a vector by a scalar', function(){
    var a = new Vector2d(4, 8);

    deepEqual(a.clone().scale(2).toArray(), [8, 16], '[4, 8] scaled by 2 == [8, 16]');    
    deepEqual(a.clone().scale(0.5).toArray(), [2, 4], '[4, 8] scaled by 0.5 == [2, 4]');    
  });

  test('#truncate - Restrict a vector to a max length', function(){
    var a = new Vector2d(3, 4);

    floatEqual(a.truncate(4).lengthOf(), 4, '[3, 4] truncated to length of 4');    
    floatEqual(a.truncate(3).lengthOf(), 3, '[3, 4] truncated to length of 3');    
  });

  test('#reverse - Reverse the vector components', function(){
    var a = new Vector2d(-2, 3);
    deepEqual(a.reverse().toArray(), [2, -3], '[-2, 3] reversed == [2, -3]');
  });

  test('#rotate - Rotate a vector', function(){
    var a = new Vector2d(4, 4),
        b = new Vector2d(4, 0),
        c = new Vector2d(0, 4),
        angle_r = 90 * 0.0174532925; // 90 degrees, in radians 

    floatDeepEqual(a.clone().rotate(angle_r).toArray(), [-4, 4], '[4, 4] rotated 90 degrees == [-4, 4]');
    floatDeepEqual(b.clone().rotate(angle_r).toArray(), [0, 4], '[4, 0] rotated 90 degrees == [0, 4]');
    floatDeepEqual(c.clone().rotate(angle_r).toArray(), [-4, 0], '[0, 4] rotated 90 degrees == [-4, 0]');

    floatDeepEqual(a.clone().rotate(-angle_r).toArray(), [4, -4], '[4, 4] rotated -90 degrees == [-4, 4]');
    floatDeepEqual(b.clone().rotate(-angle_r).toArray(), [0, -4], '[4, 0] rotated -90 degrees == [0, 4]');
    floatDeepEqual(c.clone().rotate(-angle_r).toArray(), [4, 0], '[0, 4] rotated -90 degrees == [-4, 0]');
  });

  test('#rotate - Rotate a vector around a pivot', function(){
    var a = new Vector2d(4, 2),
        o = new Vector2d(2, 2),
        angle_r = 90 * 0.0174532925; // 90 degrees, in radians 

    floatDeepEqual(a.clone().rotate(angle_r, o).toArray(), [2, 4], '[4, 2] rotated 90 degrees around [2, 2] == [2, 4]');
    floatDeepEqual(a.clone().rotate(-angle_r, o).toArray(), [2, 0], '[4, 2] rotated -90 degrees around [2, 2] == [2, 0]');
    floatDeepEqual(a.clone().rotate(-angle_r, [4, 0]).toArray(), [6, 0], '[4, 2] rotated 90 degrees around Array[4, 0] == [6, 0]');
  });

  test('#reflect - Reflect a vector around another vector', function(){
    var a = new Vector2d(4, -4),
        n = new Vector2d(1, 0);

    floatDeepEqual(a.clone().reflect(n).toArray(), [-4, -4], '[4, -4] reflected around [1, 0] == [-4, -4]');
    floatDeepEqual(a.clone().reflect([0, -1]).toArray(), [4, 4], '[4, -4] reflected around Array[0, -1] == [4, 4]');
  });


  module('Queries');

  test('#distanceTo - Distance from one vector to another', function(){
    var a = new Vector2d(0, 0),
        b = new Vector2d(3, 4);

    strictEqual(a.distanceTo(b), 5, '[3, 4] - [0, 0] distance == 5');
  });

  test('#distanceToSq - Squared distance from one vector to another', function(){
    var a = new Vector2d(0, 0),
        b = new Vector2d(3, 4);

    strictEqual(a.distanceToSq(b), 25, '[3, 4] - [0, 0] distance squared == 25');
  });

  test('#lengthOf -- Length of a vector', function(){
    var a = new Vector2d(3, 4);
    strictEqual(a.lengthOf(), 5, '[3, 4] length == 5');
  });

  test('#lengthOfSq -- Squared length of a vector', function(){
    var a = new Vector2d(3, 4);
    strictEqual(a.lengthOfSq(), 25, '[3, 4] length squared == 25');
  });

  test('#unit - Vector of length 1', function(){
    floatDeepEqual(Vector2d(3, 4).unit().toArray(), [3/5, 4/5], 'Unit length calculated');
    deepEqual(Vector2d(40, 0).unit().toArray(), [1, 0], 'Unit length along x only'); 
    deepEqual(Vector2d(0, 40).unit().toArray(), [0, 1], 'Unit length along y only'); 
  });


  test('#normal - Normal of a vector', function(){
    deepEqual(Vector2d(4, 4).normal().toArray(), [4, -4], 'Normal of [4, 4] == [4, -4]');
    deepEqual(Vector2d(1, 0).normal().toArray(), [0, -1], 'Normal of [1, 0] == [0, 1]');
    deepEqual(Vector2d(0, -20).normal().toArray(), [-20, 0], 'Normal of [0, -20] == [-20, 0]');
  });

  test('#dot - Dot product', function(){
    var a = new Vector2d(4, 4),
        b = new Vector2d(1, 0);

    equal(a.dot(b), 4, '[4, 4].dot([1, 0]) == 4');
    equal(a.dot([0, -1]), -4, '[4, 4].dot([0, -1]) == -4');
  });

  test('#cross - Cross product', function(){
    var a = new Vector2d(2, 3),
        b = new Vector2d(4, 5),
        c = [-6, 7];

    var expected1 = (2 * 5) - (3 * 4),  // a.cross(b)
        expected2 = (4 * 3) - (5 * 2),  // b.cross(a)
        expected3 = (2 * 7) - (3 * -6); // a.cross(c)

    equal(a.cross(b), expected1, a.toString() +'.cross('+ b.toString() +') == '+ expected1); 
    equal(b.cross(a), expected2, b.toString() +'.cross('+ a.toString() +') == '+ expected2); 
    equal(a.cross(c), expected3, a.toString() +'.cross('+ c.toString() +') == '+ expected3); 
  });

  test('#angle - Angle of a vector', function(){
    var a = new Vector2d(4, 4),
        rads = 0.0174532925;

    floatEqual(a.angle(), 45*rads, '[4, 4] is 45 degrees');
    floatEqual(a.angle([4, 0]), -45*rads, 'Angle between [4, 4] and [4, 0] is -45 degrees');
    floatEqual(a.angle([0, 4]), 45*rads, 'Angle between [4, 4] and [0, 4] is 45 degrees');
    floatEqual(a.angle(Vector2d(-4, 4)), 90*rads, 'Angle between [4, 4] and [-4, 4] is 90 degrees');
  });

})();
