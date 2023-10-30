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

  test('#toString - Method', function(){
    var a = new Vector2d(1, 2);
    ok(a.toString() == '[1, 2]', 'toString');
  });
  test('#toString - Function', function(){
    ok(Vector2d.toString([1, 2]) == '[1, 2]', 'toString');
  });

  test('#toArray - Method', function(){
    var a = new Vector2d(1, 2);
    deepEqual(a.toArray(), [1, 2], 'toArray == [1, 2]');
  });
  test('#toArray - Function', function(){
    var a = [1, 2];
    ok(Vector2d.toArray(a) == a, 'toArray == [1, 2]');
  });

  test('#clone - Method - Cloning a vector', function(){
    var a = new Vector2d(1, 2);
    var b = a.clone();

    deepEqual([a.x, a.y], [b.x, b.y], '['+ a.x +', '+ a.y +'] == ['+ b.x +', '+ b.y +']');
    notStrictEqual(a, b, 'The vectors are different objects');
  });
  test('#clone - Function - Cloning a vector', function(){
    var a = [1, 2];
    var b = Vector2d.clone(a);

    deepEqual([a[0], a[1]], [b[0], b[1]], '['+ a[0] +', '+ a[1] +'] == ['+ b[0] +', '+ b[1] +']');
    notStrictEqual(a, b, 'The vectors are different objects');
  });

  test('#set - Method - Setting a vector', function(){
    var a = new Vector2d();

    a.set(1, 2);
    deepEqual(a.toArray(), [1, 2], 'Set to [1, 2]');

    a.set([3, 4]);
    deepEqual(a.toArray(), [3, 4], 'Set to [3, 4]');

    a.set(new Vector2d(5, 6));
    deepEqual(a.toArray(), [5, 6], 'Set to [5, 6]');
  });
  test('#set - Function - Setting a vector', function(){
    var a = [0, 0];

    Vector2d.set(a, 1, 2);
    deepEqual(a, [1, 2], 'Set to [1, 2]');

    Vector2d.set(a, [3, 4]);
    deepEqual(a, [3, 4], 'Set to [3, 4]');
  });


  module('Basic Math');

  test('#add - Method - Add two vectors', function(){
    var a = new Vector2d(1, 2),
        b = new Vector2d(3, 4);

    deepEqual(a.clone().add(b).toArray(),       [4, 6], '[1, 2] + [3, 4] == [4, 6]');
    deepEqual(a.clone().add([1, 2]).toArray(),  [2, 4], '[1, 2] + Array[1, 2] == [2, 4]');
  });
  test('#add - Function - Add two vectors', function(){
    var a = [1, 2],
        b = [3, 4];

    deepEqual(Vector2d.add(Vector2d.clone(a), b),       [4, 6], '[1, 2] + [3, 4] == [4, 6]');
    deepEqual(Vector2d.add(Vector2d.clone(a), [1, 2]),  [2, 4], '[1, 2] + Array[1, 2] == [2, 4]');
  });

  test('#subtract - Method - Subtract two vectors', function(){
    var a = new Vector2d(1, 2),
        b = new Vector2d(3, 4);

    deepEqual(a.clone().subtract(b).toArray(), [-2, -2], '[1, 2] - [3, 4] == [-2, -2]');
    deepEqual(a.clone().subtract([1, 2]).toArray(), [0, 0], '[1, 2] - Array[1, 2] == [0, 0]');
  });
  test('#subtract - Function - Subtract two vectors', function(){
    var a = [1, 2],
        b = [3, 4];

    deepEqual(Vector2d.subtract(Vector2d.clone(a), b),      [-2, -2], '[1, 2] - [3, 4] == [-2, -2]');
    deepEqual(Vector2d.subtract(Vector2d.clone(a), [1, 2]), [0, 0], '[1, 2] - Array[1, 2] == [0, 0]');
  });

  test('#multiply - Method - Multiply two vectors', function(){
    var a = new Vector2d(1, 2),
        b = new Vector2d(3, 4);

    deepEqual(a.clone().multiply(b).toArray(), [3, 8], '[1, 2] * [3, 4] == [3, 8]');
    deepEqual(a.clone().multiply([2, 6]).toArray(), [2, 12], '[1, 2] * Array[2, 3] == [2, 6]');
  });
  test('#multiply - Function - Multiply two vectors', function(){
    var a = [1, 2],
        b = [3, 4];

    deepEqual(Vector2d.multiply(Vector2d.clone(a), b),      [3, 8], '[1, 2] * [3, 4] == [3, 8]');
    deepEqual(Vector2d.multiply(Vector2d.clone(a), [2, 6]), [2, 12], '[1, 2] * Array[2, 3] == [2, 6]');
  });

  test('#divide - Method - Divide two vectors', function(){
    var a = new Vector2d(2, 2),
        b = new Vector2d(4, 8);

    deepEqual(a.clone().divide(b).toArray(), [0.5, 0.25], '[2, 2] / [4, 8] == [0.5, 0.25]');
    deepEqual(b.clone().divide(a).toArray(), [2, 4], '[4, 8] / [2, 2] == [2, 4]');
    deepEqual(a.clone().divide([2, 0.5]).toArray(), [1, 4], '[2, 2] / Array[2, 0.5] == [1, 4]');
  });
  test('#divide - Function - Divide two vectors', function(){
    var a = [2, 2],
        b = [4, 8];

    deepEqual(Vector2d.divide(Vector2d.clone(a), b),        [0.5, 0.25], '[2, 2] / [4, 8] == [0.5, 0.25]');
    deepEqual(Vector2d.divide(Vector2d.clone(b), a),        [2, 4], '[4, 8] / [2, 2] == [2, 4]');
    deepEqual(Vector2d.divide(Vector2d.clone(a), [2, 0.5]), [1, 4], '[2, 2] / Array[2, 0.5] == [1, 4]');
  });


  module('Vector Manipulation');

  test('#scale - Method - Scale a vector by a scalar', function(){
    var a = new Vector2d(4, 8);

    deepEqual(a.clone().scale(2).toArray(), [8, 16], '[4, 8] scaled by 2 == [8, 16]');
    deepEqual(a.clone().scale(0.5).toArray(), [2, 4], '[4, 8] scaled by 0.5 == [2, 4]');
  });
  test('#scale - Function - Scale a vector by a scalar', function(){
    var a = [4, 8];

    deepEqual(Vector2d.scale(Vector2d.clone(a), 2),   [8, 16], '[4, 8] scaled by 2 == [8, 16]');
    deepEqual(Vector2d.scale(Vector2d.clone(a), 0.5), [2, 4], '[4, 8] scaled by 0.5 == [2, 4]');
  });

  test('#truncate - Method - Restrict a vector to a max length', function(){
    var a = new Vector2d(3, 4);

    floatEqual(a.truncate(4).lengthOf(), 4, '[3, 4] truncated to length of 4');
    floatEqual(a.truncate(3).lengthOf(), 3, '[3, 4] truncated to length of 3');
  });
  test('#truncate - Function - Restrict a vector to a max length', function(){
    var a = [3, 4];

    floatEqual(Vector2d.lengthOf(Vector2d.truncate(Vector2d.clone(a), 4)), 4, '[3, 4] truncated to length of 4');
    floatEqual(Vector2d.lengthOf(Vector2d.truncate(Vector2d.clone(a), 3)), 3, '[3, 4] truncated to length of 3');
  });

  test('#reverse - Method - Reverse the vector components', function(){
    var a = new Vector2d(-2, 3);
    deepEqual(a.reverse().toArray(), [2, -3], '[-2, 3] reversed == [2, -3]');
  });
  test('#reverse - Function - Reverse the vector components', function(){
    var a = [-2, 3];
    deepEqual(Vector2d.reverse(a), [2, -3], '[-2, 3] reversed == [2, -3]');
  });

  test('#perpendicularCW - Method - Rotate a vector 90deg clockwise', function(){
    var a = new Vector2d(2, 3);
    deepEqual(a.perpendicularCW().toArray(), [3, -2], '[2, 3] perpendicularCW == [3, -2]');
  });
  test('#perpendicularCW - Function - Rotate a vector 90deg clockwise', function(){
    var a = [2, 3];
    deepEqual(Vector2d.perpendicularCW(a), [3, -2], '[2, 3] perpendicularCW == [3, -2]');
  });

  test('#perpendicularCCW - Method - Rotate a vector 90deg counter-clockwise', function(){
    var a = new Vector2d(2, 3);
    deepEqual(a.perpendicularCCW().toArray(), [-3, 2], '[2, 3] perpendicularCCW == [-3, 2]');
  });
  test('#perpendicularCCW - Function - Rotate a vector 90deg counter-clockwise', function(){
    var a = [2, 3];
    deepEqual(Vector2d.perpendicularCCW(a), [-3, 2], '[2, 3] perpendicularCCW == [-3, 2]');
  });

  test('#rotate - Method - Rotate a vector', function(){
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
  test('#rotate - Function - Rotate a vector', function(){
    var a = [4, 4],
        b = [4, 0],
        c = [0, 4],
        angle_r = 90 * 0.0174532925; // 90 degrees, in radians

    floatDeepEqual(Vector2d.rotate(Vector2d.clone(a), angle_r),   [-4, 4], '[4, 4] rotated 90 degrees == [-4, 4]');
    floatDeepEqual(Vector2d.rotate(Vector2d.clone(b), angle_r),   [0, 4], '[4, 0] rotated 90 degrees == [0, 4]');
    floatDeepEqual(Vector2d.rotate(Vector2d.clone(c), angle_r),   [-4, 0], '[0, 4] rotated 90 degrees == [-4, 0]');

    floatDeepEqual(Vector2d.rotate(Vector2d.clone(a), -angle_r),  [4, -4], '[4, 4] rotated -90 degrees == [-4, 4]');
    floatDeepEqual(Vector2d.rotate(Vector2d.clone(b), -angle_r),  [0, -4], '[4, 0] rotated -90 degrees == [0, 4]');
    floatDeepEqual(Vector2d.rotate(Vector2d.clone(c), -angle_r),  [4, 0], '[0, 4] rotated -90 degrees == [-4, 0]');
  });

  test('#rotate - Method - Rotate a vector around a pivot', function(){
    var a = new Vector2d(4, 2),
        o = new Vector2d(2, 2),
        angle_r = 90 * 0.0174532925; // 90 degrees, in radians

    floatDeepEqual(a.clone().rotate(angle_r, o).toArray(), [2, 4], '[4, 2] rotated 90 degrees around [2, 2] == [2, 4]');
    floatDeepEqual(a.clone().rotate(-angle_r, o).toArray(), [2, 0], '[4, 2] rotated -90 degrees around [2, 2] == [2, 0]');
    floatDeepEqual(a.clone().rotate(-angle_r, [4, 0]).toArray(), [6, 0], '[4, 2] rotated 90 degrees around Array[4, 0] == [6, 0]');
  });
  test('#rotate - Function - Rotate a vector around a pivot', function(){
    var a = [4, 2],
        o = [2, 2],
        angle_r = 90 * 0.0174532925; // 90 degrees, in radians

    floatDeepEqual(Vector2d.rotate(Vector2d.clone(a), angle_r, o),        [2, 4], '[4, 2] rotated 90 degrees around [2, 2] == [2, 4]');
    floatDeepEqual(Vector2d.rotate(Vector2d.clone(a), -angle_r, o),       [2, 0], '[4, 2] rotated -90 degrees around [2, 2] == [2, 0]');
    floatDeepEqual(Vector2d.rotate(Vector2d.clone(a), -angle_r, [4, 0]),  [6, 0], '[4, 2] rotated 90 degrees around Array[4, 0] == [6, 0]');
  });

  test('#reflect - Method - Reflect a vector around another vector', function(){
    var a = new Vector2d(4, -4),
        n = new Vector2d(1, 0);

    floatDeepEqual(a.clone().reflect(n).toArray(), [-4, -4], '[4, -4] reflected around [1, 0] == [-4, -4]');
    floatDeepEqual(a.clone().reflect([0, -1]).toArray(), [4, 4], '[4, -4] reflected around Array[0, -1] == [4, 4]');
  });
  test('#reflect - Function - Reflect a vector around another vector', function(){
    var a = [4, -4],
        n = [1, 0];

    floatDeepEqual(Vector2d.reflect(Vector2d.clone(a), n),        [-4, -4], '[4, -4] reflected around [1, 0] == [-4, -4]');
    floatDeepEqual(Vector2d.reflect(Vector2d.clone(a), [0, -1]),  [4, 4], '[4, -4] reflected around Array[0, -1] == [4, 4]');
  });

  test('#unit - Method - Vector of length 1', function(){
    floatDeepEqual(Vector2d(3, 4).unit().toArray(), [3/5, 4/5], 'Unit length calculated');
    deepEqual(Vector2d(40, 0).unit().toArray(), [1, 0], 'Unit length along x only');
    deepEqual(Vector2d(0, 40).unit().toArray(), [0, 1], 'Unit length along y only');
  });
  test('#unit - Function - Vector of length 1', function(){
    floatDeepEqual(Vector2d.unit([3, 4]), [3/5, 4/5], 'Unit length calculated');
    deepEqual(Vector2d.unit([40, 0]),     [1, 0], 'Unit length along x only');
    deepEqual(Vector2d.unit([0, 40]),     [0, 1], 'Unit length along y only');
  });

  test('#normal - Method - Normal of a vector', function(){
    deepEqual(Vector2d(4, 4).normal().toArray(), [4, -4], 'Normal of [4, 4] == [4, -4]');
    deepEqual(Vector2d(1, 0).normal().toArray(), [0, -1], 'Normal of [1, 0] == [0, 1]');
    deepEqual(Vector2d(0, -20).normal().toArray(), [-20, 0], 'Normal of [0, -20] == [-20, 0]');
  });
  test('#normal - Function - Normal of a vector', function(){
    deepEqual(Vector2d.normal([4, 4]),    [4, -4], 'Normal of [4, 4] == [4, -4]');
    deepEqual(Vector2d.normal([1, 0]),    [0, -1], 'Normal of [1, 0] == [0, 1]');
    deepEqual(Vector2d.normal([0, -20]),  [-20, 0], 'Normal of [0, -20] == [-20, 0]');
  });


  module('Queries');

  test('#distanceTo - Method - Distance from one vector to another', function(){
    var a = new Vector2d(0, 0),
        b = new Vector2d(3, 4);

    strictEqual(a.distanceTo(b), 5, '[3, 4] - [0, 0] distance == 5');
  });
  test('#distanceTo - Function - Distance from one vector to another', function(){
    var a = [0, 0],
        b = [3, 4];

    strictEqual(Vector2d.distanceTo(a, b), 5, '[3, 4] - [0, 0] distance == 5');
  });

  test('#distanceToSq - Method - Squared distance from one vector to another', function(){
    var a = new Vector2d(0, 0),
        b = new Vector2d(3, 4);

    strictEqual(a.distanceToSq(b), 25, '[3, 4] - [0, 0] distance squared == 25');
  });
  test('#distanceToSq - Function - Squared distance from one vector to another', function(){
    var a = [0, 0],
        b = [3, 4];

    strictEqual(Vector2d.distanceToSq(a, b), 25, '[3, 4] - [0, 0] distance squared == 25');
  });

  test('#lengthOf - Method - Length of a vector', function(){
    var a = new Vector2d(3, 4);
    strictEqual(a.lengthOf(), 5, '[3, 4] length == 5');
  });
  test('#lengthOf - Function - Length of a vector', function(){
    strictEqual(Vector2d.lengthOf([3, 4]), 5, '[3, 4] length == 5');
  });

  test('#lengthOfSq - Method - Squared length of a vector', function(){
    var a = new Vector2d(3, 4);
    strictEqual(a.lengthOfSq(), 25, '[3, 4] length squared == 25');
  });
  test('#lengthOfSq - Function - Squared length of a vector', function(){
    strictEqual(Vector2d.lengthOfSq([3, 4]), 25, '[3, 4] length squared == 25');
  });

  test('#len - Method - alias of #lengthOf', function(){
    var a = new Vector2d(3, 4);
    strictEqual(a.len(), 5, '[3, 4] length == 5');
  });

  test('#dot - Method - Dot product', function(){
    var a = new Vector2d(4, 4),
        b = new Vector2d(1, 0);

    equal(a.dot(b), 4, '[4, 4].dot([1, 0]) == 4');
    equal(a.dot([0, -1]), -4, '[4, 4].dot([0, -1]) == -4');
  });
  test('#dot - Method - Dot product', function(){
    equal(Vector2d.dot([4, 4], [1, 0]),   4, '[4, 4].dot([1, 0]) == 4');
    equal(Vector2d.dot([4, 4], [0, -1]), -4, '[4, 4].dot([1, 0]) == 4');
  });

  test('#cross - Method - Cross product', function(){
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
  test('#cross - Function - Cross product', function(){
    var a = [2, 3],
        b = [4, 5],
        c = [-6, 7];

    var expected1 = (2 * 5) - (3 * 4),  // a.cross(b)
        expected2 = (4 * 3) - (5 * 2),  // b.cross(a)
        expected3 = (2 * 7) - (3 * -6); // a.cross(c)

    equal(Vector2d.cross(a, b), expected1, Vector2d.toString(a) +'.cross('+ Vector2d.toString(b) +') == '+ expected1);
    equal(Vector2d.cross(b, a), expected2, Vector2d.toString(b) +'.cross('+ Vector2d.toString(a) +') == '+ expected2);
    equal(Vector2d.cross(a, c), expected3, Vector2d.toString(a) +'.cross('+ Vector2d.toString(c) +') == '+ expected3);
  });

  test('#angle - Method - Angle of a vector', function(){
    var a = new Vector2d(4, 4),
        rads = 0.0174532925;

    floatEqual(a.angle(), 45*rads, '[4, 4] is 45 degrees');
    floatEqual(a.angle([4, 0]), -45*rads, 'Angle between [4, 4] and [4, 0] is -45 degrees');
    floatEqual(a.angle([0, 4]), 45*rads, 'Angle between [4, 4] and [0, 4] is 45 degrees');
    floatEqual(a.angle(Vector2d(-4, 4)), 90*rads, 'Angle between [4, 4] and [-4, 4] is 90 degrees');
  });
  test('#angle - Function - Angle of a vector', function(){
    var a = [4, 4],
        rads = 0.0174532925;

    floatEqual(Vector2d.angle(a),           45*rads, '[4, 4] is 45 degrees');
    floatEqual(Vector2d.angle(a, [4, 0]),  -45*rads, 'Angle between [4, 4] and [4, 0] is -45 degrees');
    floatEqual(Vector2d.angle(a, [0, 4]),   45*rads, 'Angle between [4, 4] and [0, 4] is 45 degrees');
    floatEqual(Vector2d.angle(a, [-4, 4]),  90*rads, 'Angle between [4, 4] and [-4, 4] is 90 degrees');
  });

})();
