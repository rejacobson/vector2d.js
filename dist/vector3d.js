(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(factory);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.Vector3d = factory();
    }
}(this, function () {

  var Vector3d = function(x, y, z) {
    if (!(this instanceof Vector3d)) {
      return new Vector3d(x, y, z);
    }

    if (x instanceof Array) {
      this.push(x[0], x[1], x[2]);
    } else {
      this.push(x || 0, y || 0, z || 0);
    }

    this.__defineGetter__("x", function() { return this[0]; });
    this.__defineGetter__("y", function() { return this[1]; });
    this.__defineGetter__("z", function() { return this[1]; });

    this.__defineSetter__("x", function(val) {
      this[0] = val;
    });
    this.__defineSetter__("y", function(val) {
      this[1] = val;
    });
    this.__defineSetter__("z", function(val) {
      this[2] = val;
    });
  };

  Vector3d.prototype = new Array();

  //------------------------------------------------------------------------------------
  Vector3d.prototype.toString = function() {
    return Vector3d.toString(this);
  };
  Vector3d.toString = function(v) {
    return '['+ v[0] +', '+ v[1] +', '+ v[2] +']';
  };

  //------------------------------------------------------------------------------------
  Vector3d.prototype.toArray = function() {
    return [this[0], this[1], this[2]];
  };
  Vector3d.toArray = function(v) {
    return v;
  };

  //------------------------------------------------------------------------------------
  Vector3d.prototype.clone = function() {
    return new Vector3d(this[0], this[1], this[2]);
  };
  Vector3d.clone = function(v) {
    return v.slice(0);
  };

  //------------------------------------------------------------------------------------
  Vector3d.prototype.set = function(x, y, z) {
    if (x instanceof Array) {
      this[0] = x[0];
      this[1] = x[1];
      this[2] = x[2];
    } else if (arguments.length == 3) {
      this[0] = x;
      this[1] = y;
      this[2] = z;
    }
    return this;
  };
  Vector3d.set = function(v, x, y, z) {
    if (x instanceof Array) {
      v[0] = x[0];
      v[1] = x[1];
      v[2] = x[2];
    } else if (arguments.length == 4) {
      v[0] = x;
      v[1] = y;
      v[2] = z;
    }
    return v;
  };

  //------------------------------------------------------------------------------------
  Vector3d.prototype.distanceTo = function(v) {
    return Math.sqrt(this.distanceToSq(v));
  };
  Vector3d.distanceTo = function(v1, v2) {
    return Math.sqrt(Vector3d.distanceToSq(v1, v2));
  };

  //------------------------------------------------------------------------------------
  Vector3d.prototype.distanceToSq = function(v) {
    return Math.pow(this[0] - v[0], 2) + Math.pow(this[1] - v[1], 2) + Math.pow(this[2] - v[2], 2);
  };
  Vector3d.distanceToSq = function(v1, v2) {
    return Math.pow(v1[0] - v2[0], 2) + Math.pow(v1[1] - v2[1], 2) + Math.pow(v1[2] - v2[2], 2);
  };

  //------------------------------------------------------------------------------------
  Vector3d.prototype.lengthOf = function() {
    return Math.sqrt(this.lengthOfSq());
  };
  Vector3d.lengthOf = function(v) {
    return Math.sqrt(Vector3d.lengthOfSq(v));
  };

  //------------------------------------------------------------------------------------
  Vector3d.prototype.lengthOfSq = function() {
    return this[0]*this[0] + this[1]*this[1] + this[2]*this[2];
  };
  Vector3d.lengthOfSq = function(v) {
    return v[0]*v[0] + v[1]*v[1] + v[2]*v[2];
  };

  //------------------------------------------------------------------------------------
  Vector3d.prototype.add = function(v) {
    this[0] += v[0];
    this[1] += v[1];
    this[2] += v[2];
    return this;
  };
  Vector3d.add = function(v1, v2) {
    v1[0] += v2[0];
    v1[1] += v2[1];
    v1[2] += v2[2];
    return v1;
  };

  //------------------------------------------------------------------------------------
  Vector3d.prototype.subtract = function(v) {
    this[0] -= v[0];
    this[1] -= v[1];
    this[2] -= v[2];
    return this;
  };
  Vector3d.subtract = function(v1, v2) {
    v1[0] -= v2[0];
    v1[1] -= v2[1];
    v1[2] -= v2[2];
    return v1;
  };

  //------------------------------------------------------------------------------------
  Vector3d.prototype.multiply = function(v) {
    this[0] *= v[0];
    this[1] *= v[1];
    this[2] *= v[2];
    return this;
  };
  Vector3d.multiply = function(v1, v2) {
    v1[0] *= v2[0];
    v1[1] *= v2[1];
    v1[2] *= v2[2];
    return v1;
  };

  //------------------------------------------------------------------------------------
  Vector3d.prototype.divide = function(v) {
    this[0] /= v[0];
    this[1] /= v[1];
    this[2] /= v[2];
    return this;
  };
  Vector3d.divide = function(v1, v2) {
    v1[0] /= v2[0];
    v1[1] /= v2[1];
    v1[2] /= v2[2];
    return v1;
  };

  //------------------------------------------------------------------------------------
  Vector3d.prototype.scale = function(s) {
    this[0] *= s;
    this[1] *= s;
    this[2] *= s;
    return this;
  };
  Vector3d.scale = function(v, s) {
    v[0] *= s;
    v[1] *= s;
    v[2] *= s;
    return v;
  };

  //------------------------------------------------------------------------------------
  Vector3d.prototype.truncate = function(maxLength) {
    var l = this.lengthOf();
    if (l > maxLength) return this.scale(maxLength/l);
    return this;
  };
  Vector3d.truncate = function(v, maxLength) {
    var l = Vector3d.lengthOf(v);
    if (l > maxLength) return Vector3d.scale(v, maxLength/l);
    return v;
  };

  //------------------------------------------------------------------------------------
  Vector3d.prototype.reverse = function() {
    return this.scale(-1);
  };
  Vector3d.reverse = function(v) {
    return Vector3d.scale(v, -1);
  };

  //------------------------------------------------------------------------------------
/*
  Vector3d.prototype.rotate = function(angle, origin) {
    if (!origin) origin = [0, 0];

    var s = Math.sin(angle),
        c = Math.cos(angle);

    this.subtract(origin);

    var nx = this[0] * c - this[1] * s,
        ny = this[0] * s + this[1] * c;

    this[0] = nx + origin[0];
    this[1] = ny + origin[1];

    return this;
  };
  Vector3d.rotate = function(v, angle, origin) {
    if (!origin) origin = [0, 0];

    var s = Math.sin(angle),
        c = Math.cos(angle);

    Vector3d.subtract(v, origin);

    var nx = v[0] * c - v[1] * s,
        ny = v[0] * s + v[1] * c;

    v[0] = nx + origin[0];
    v[1] = ny + origin[1];

    return v;
  };
*/

  //------------------------------------------------------------------------------------
  // r = v - (2 * n * dot(v, n))
  Vector3d.prototype.reflect = function(n) {
    return this.subtract(Vector3d.scale([n[0], n[1], n[2]], this.dot(n) * 2));
  };
  Vector3d.reflect = function(v, n) {
    return Vector3d.subtract(v, Vector3d.scale(Vector3d.clone(n), Vector3d.dot(v, n) * 2));
  };

  //------------------------------------------------------------------------------------
  Vector3d.prototype.unit = function() {
     var l = this.lengthOf();
     if (l) return this.scale(1/l);
     return this.set(0, 0);
  };
  Vector3d.unit = function(v) {
     var l = Vector3d.lengthOf(v);
     if (l) return Vector3d.scale(v, 1/l);
     return Vector3d.set(v, 0, 0);
  };

  //------------------------------------------------------------------------------------
  Vector3d.prototype.normal = function() {
    var x = this[1]*v2[2] - this[2]*v2[1];
    var y = this[2]*v2[0] - this[0]*v2[2];
    var z = this[0]*v2[1] - this[1]*v2[0];
    this[0] = x;
    this[1] = y;
    this[2] = z;
    return this;
  };
  Vector3d.normal = function(v) {
    var x = v1[1]*v2[2] - v1[2]*v2[1];
    var y = v1[2]*v2[0] - v1[0]*v2[2];
    var z = v1[0]*v2[1] - v1[1]*v2[0];
    v1[0] = x;
    v1[1] = y;
    v1[2] = z;
    return v;
  };

  //------------------------------------------------------------------------------------
  Vector3d.prototype.dot = function(v) {
    return this[0]*v[0] + this[1]*v[1] + this[2]*v[2];
  };
  Vector3d.dot = function(v1, v2) {
    return v1[0]*v2[0] + v1[1]*v2[1] + v1[2]*v2[2];
  };

  //------------------------------------------------------------------------------------
  Vector3d.prototype.cross = function(v) {
    return new Vector3d(this[1]*v2[2] - this[2]*v2[1],
                        this[2]*v2[0] - this[0]*v2[2],
                        this[0]*v2[1] - this[1]*v2[0]);
  };
  Vector3d.cross = function(v1, v2) {
    return [v1[1]*v2[2] - v1[2]*v2[1],
            v1[2]*v2[0] - v1[0]*v2[2],
            v1[0]*v2[1] - v1[1]*v2[0]];
  };

  //------------------------------------------------------------------------------------
  // angle = atan2(norm(cross(a,b)), dot(a,b))
/*
  Vector3d.prototype.angle = function(v) {
    if (v instanceof Array) return Math.atan2(this[0], this[1]) - Math.atan2(v[0], v[1]);
    return Math.atan2(this[0], this[1]);
  };
  Vector3d.angle = function(v1, v2) {
    if (v2 instanceof Array) return Math.atan2(v1[0], v1[1]) - Math.atan2(v2[0], v2[1]);
    return Math.atan2(v1[0], v1[1]);
  };
*/

  return Vector3d;

}));
