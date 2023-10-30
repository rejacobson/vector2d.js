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
        root.Vector2d = factory();
    }
}(this, function () {

  var Vector2d = function(x, y) {
    if (!(this instanceof Vector2d)) {
      return new Vector2d(x, y);
    }

    if (x instanceof Array) {
      this.push(x[0], x[1]);
    } else {
      this.push(x || 0, y || 0);
    }

    this.__defineGetter__("x", function() {
      return this[0];
    });
    this.__defineGetter__("y", function() {
      return this[1];
    });

    this.__defineSetter__("x", function(val) {
      this[0] = val;
    });
    this.__defineSetter__("y", function(val) {
      this[1] = val;
    });
  };

  Vector2d.prototype = new Array();

  //------------------------------------------------------------------------------------
  Vector2d.prototype.toString = function() {
    return Vector2d.toString(this);
  };
  Vector2d.toString = function(v) {
    return '['+ v[0] +', '+ v[1] +']';
  };

  //------------------------------------------------------------------------------------
  Vector2d.prototype.toArray = function() {
    return [this[0], this[1]];
  };
  Vector2d.toArray = function(v) {
    return v;
  };

  //------------------------------------------------------------------------------------
  Vector2d.prototype.clone = function() {
    return new Vector2d(this[0], this[1]);
  };
  Vector2d.clone = function(v) {
    return v.slice(0);
  };

  //------------------------------------------------------------------------------------
  Vector2d.prototype.set = function(x, y) {
    if (x instanceof Array) {
      this[0] = x[0];
      this[1] = x[1];
    } else if (arguments.length == 2) {
      this[0] = x;
      this[1] = y;
    }
    return this;
  };
  Vector2d.set = function(v, x, y) {
    if (x instanceof Array) {
      v[0] = x[0];
      v[1] = x[1];
    } else if (arguments.length == 3) {
      v[0] = x;
      v[1] = y;
    }
    return v;
  };

  //------------------------------------------------------------------------------------
  Vector2d.prototype.distanceTo = function(v) {
    return Math.sqrt(this.distanceToSq(v));
  };
  Vector2d.distanceTo = function(v1, v2) {
    return Math.sqrt(Vector2d.distanceToSq(v1, v2));
  };

  //------------------------------------------------------------------------------------
  Vector2d.prototype.distanceToSq = function(v) {
    return Math.pow(this[0] - v[0], 2) + Math.pow(this[1] - v[1], 2);
  };
  Vector2d.distanceToSq = function(v1, v2) {
    return Math.pow(v1[0] - v2[0], 2) + Math.pow(v1[1] - v2[1], 2);
  };

  //------------------------------------------------------------------------------------
  Vector2d.prototype.lengthOf = function() {
    return Math.sqrt(this.lengthOfSq());
  };
  Vector2d.lengthOf = function(v) {
    return Math.sqrt(Vector2d.lengthOfSq(v));
  };

  //------------------------------------------------------------------------------------
  Vector2d.prototype.lengthOfSq = function() {
    return this[0] * this[0] + this[1] * this[1];
  };
  Vector2d.lengthOfSq = function(v) {
    return v[0] * v[0] + v[1] * v[1];
  };

  Vector2d.prototype.len = Vector2d.prototype.lengthOf;
  Vector2d.len = Vector2d.lengthOf;

  //------------------------------------------------------------------------------------
  Vector2d.prototype.add = function(v) {
    this[0] += v[0];
    this[1] += v[1];
    return this;
  };
  Vector2d.add = function(v1, v2) {
    v1[0] += v2[0];
    v1[1] += v2[1];
    return v1;
  };

  //------------------------------------------------------------------------------------
  Vector2d.prototype.subtract = function(v) {
    this[0] -= v[0];
    this[1] -= v[1];
    return this;
  };
  Vector2d.subtract = function(v1, v2) {
    v1[0] -= v2[0];
    v1[1] -= v2[1];
    return v1;
  };

  //------------------------------------------------------------------------------------
  Vector2d.prototype.multiply = function(v) {
    this[0] *= v[0];
    this[1] *= v[1];
    return this;
  };
  Vector2d.multiply = function(v1, v2) {
    v1[0] *= v2[0];
    v1[1] *= v2[1];
    return v1;
  };

  //------------------------------------------------------------------------------------
  Vector2d.prototype.divide = function(v) {
    this[0] /= v[0];
    this[1] /= v[1];
    return this;
  };
  Vector2d.divide = function(v1, v2) {
    v1[0] /= v2[0];
    v1[1] /= v2[1];
    return v1;
  };

  //------------------------------------------------------------------------------------
  Vector2d.prototype.scale = function(s) {
    this[0] *= s;
    this[1] *= s;
    return this;
  };
  Vector2d.scale = function(v, s) {
    v[0] *= s;
    v[1] *= s;
    return v;
  };

  //------------------------------------------------------------------------------------
  Vector2d.prototype.truncate = function(maxLength) {
    var l = this.lengthOf();
    if (l > maxLength) return this.scale(maxLength/l);
    return this;
  };
  Vector2d.truncate = function(v, maxLength) {
    var l = Vector2d.lengthOf(v);
    if (l > maxLength) return Vector2d.scale(v, maxLength/l);
    return v;
  };

  Vector2d.prototype.clamp = Vector2d.prototype.truncate;
  Vector2d.clamp = Vector2d.truncate;

  //------------------------------------------------------------------------------------
  Vector2d.prototype.reverse = function() {
    return this.scale(-1);
  };
  Vector2d.reverse = function(v) {
    return Vector2d.scale(v, -1);
  };

  //------------------------------------------------------------------------------------
  Vector2d.prototype.perpendicularCW = function() {
    [this[0], this[1]] = [this[1], -this[0]];
    return this;
  };
  Vector2d.perpendicularCW = function(v) {
    [v[0], v[1]] = [v[1], -v[0]];
    return v;
  };

  //------------------------------------------------------------------------------------
  Vector2d.prototype.perpendicularCCW = function() {
    [this[0], this[1]] = [-this[1], this[0]];
    return this;
  };
  Vector2d.perpendicularCCW = function(v) {
    [v[0], v[1]] = [-v[1], v[0]];
    return v;
  };

  //------------------------------------------------------------------------------------
  Vector2d.prototype.rotate = function(angle, origin) {
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
  Vector2d.rotate = function(v, angle, origin) {
    if (!origin) origin = [0, 0];

    var s = Math.sin(angle),
        c = Math.cos(angle);

    Vector2d.subtract(v, origin);

    var nx = v[0] * c - v[1] * s,
        ny = v[0] * s + v[1] * c;

    v[0] = nx + origin[0];
    v[1] = ny + origin[1];

    return v;
  };

  //------------------------------------------------------------------------------------
  // r = v - (2 * n * dot(v, n))
  Vector2d.prototype.reflect = function(n) {
    return this.subtract(Vector2d.scale([n[0], n[1]], this.dot(n) * 2));
  };
  Vector2d.reflect = function(v, n) {
    return Vector2d.subtract(v, Vector2d.scale(Vector2d.clone(n), Vector2d.dot(v, n) * 2));
  };

  //------------------------------------------------------------------------------------
  Vector2d.prototype.unit = function() {
     var l = this.lengthOf();
     if (l) return this.scale(1/l);
     return this.set(0, 0);
  };
  Vector2d.unit = function(v) {
     var l = Vector2d.lengthOf(v);
     if (l) return Vector2d.scale(v, 1/l);
     return Vector2d.set(v, 0, 0);
  };

  //------------------------------------------------------------------------------------
  Vector2d.prototype.normal = function() {
    var x   = this[0];
    this[0] = this[1];
    this[1] = -x;
    return this;
  };
  Vector2d.normal = function(v) {
    var x = v[0];
    v[0]  = v[1];
    v[1]  = -x;
    return v;
  };

  //------------------------------------------------------------------------------------
  Vector2d.prototype.dot = function(v) {
    return this[0] * v[0] + this[1] * v[1];
  };
  Vector2d.dot = function(v1, v2) {
    return v1[0] * v2[0] + v1[1] * v2[1];
  };

  //------------------------------------------------------------------------------------
  Vector2d.prototype.cross = function(v) {
    return (this[0] * v[1]) - (this[1] * v[0]);
  };
  Vector2d.cross = function(v1, v2) {
    return (v1[0] * v2[1]) - (v1[1] * v2[0]);
  };

  //------------------------------------------------------------------------------------
  Vector2d.prototype.angle = function(v) {
    if (v instanceof Array) return Math.atan2(this[0], this[1]) - Math.atan2(v[0], v[1]);
    return Math.atan2(this[0], this[1]);
  };
  Vector2d.angle = function(v1, v2) {
    if (v2 instanceof Array) return Math.atan2(v1[0], v1[1]) - Math.atan2(v2[0], v2[1]);
    return Math.atan2(v1[0], v1[1]);
  };

  return Vector2d;

}));
