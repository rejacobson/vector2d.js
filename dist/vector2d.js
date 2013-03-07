(function(){

  var Vector2d = function(x, y) {
    if (!(this instanceof Vector2d)) {
      return new Vector2d(x, y);
    }

    if (x instanceof Array) {
      this.push(x[0], x[1]);
    } else {
      this.push(x || 0, y || 0);
    }

    this._cached_length = null;
    this._cached_length_sq = null;
    
    this.__defineGetter__("x", function() { return this[0]; });
    this.__defineGetter__("y", function() { return this[1]; });
   
    this.__defineSetter__("x", function(val) {
      this[0] = val;
      this._cached_length = this._cached_length_sq = null;
    });
    this.__defineSetter__("y", function(val) {
      this[1] = val;
      this._cached_length = this._cached_length_sq = null;
    });
  };
  
  Vector2d.prototype = new Array();
  
  Vector2d.prototype.toString = function() {
    return '['+ this.x +', '+ this.y +']';
  };

  Vector2d.prototype.toArray = function() {
    return [this.x, this.y];
  };
  
  Vector2d.prototype.clone = function() {
    return new Vector2d(this.x, this.y);
  };
  
  Vector2d.prototype.set = function(x, y) {
    if (x[0] !== undefined) {
      this.x = x[0];
      this.y = x[1];
    } else if (arguments.length == 2) {
      this.x = x;
      this.y = y; 
    }
    return this;
  };
  
  Vector2d.prototype.distanceTo = function(v) {
    return this.clone().subtract(v).lengthOf();
  };
  
  Vector2d.prototype.distanceToSq = function(v) {
    return this.clone().subtract(v).lengthOfSq();
  };
  
  Vector2d.prototype.lengthOf = function() {
    if (this._cached_length !== null) return this._cached_length;
    return (this._cached_length = Math.sqrt(this.lengthOfSq()));
  };
  
  Vector2d.prototype.lengthOfSq = function() {
    if (this._cached_length_sq !== null) return this._cached_length_sq;
    return (this._cached_length_sq = this.x * this.x + this.y * this.y);
  };
  
  Vector2d.prototype.add = function(v) {
    this.x += v[0];
    this.y += v[1];
    return this;
  };
  
  Vector2d.prototype.subtract = function(v) {
    this.x -= v[0];
    this.y -= v[1];
    return this;
  };
  
  Vector2d.prototype.multiply = function(v) {
    this.x *= v[0];
    this.y *= v[1];
    return this;
  };
  
  Vector2d.prototype.divide = function(v) {
    this.x /= v[0];
    this.y /= v[1];
    return this;
  };
  
  Vector2d.prototype.scale = function(s) {
    this.x *= s;
    this.y *= s;
    return this;
  };
  
  Vector2d.prototype.truncate = function(maxLength) {
    var l = this.lengthOf();
    if (l > maxLength) return this.scale(maxLength/l);
    return this;
  };
  
  Vector2d.prototype.reverse = function() {
    return this.scale(-1);
  };
  
  Vector2d.prototype.rotate = function(angle, origin) {
    if (!origin) origin = new Vector2d(0, 0);
  
    var s = Math.sin(angle),
        c = Math.cos(angle);
  
    this.subtract(origin);
  
    var nx = this.x * c - this.y * s,
        ny = this.x * s + this.y * c;
  
    this.x = nx + origin[0];
    this.y = ny + origin[1];
    
    return this;
  };
  
  Vector2d.prototype.reflect = function(n) {
    if (!(n instanceof Vector2d)) n = new Vector2d(n[0], n[1]);
    // r = v - (2 * n * dot(v, n))
    return this.subtract(n.clone().scale(this.dot(n) * 2));
  };
  
  Vector2d.prototype.unit = function() {
     var l = this.lengthOf();
     if (l) return this.clone().scale(1/l);
     return new Vector2d(0, 0);
  };
  
  Vector2d.prototype.normal = function() {
    return new Vector2d(this.y, -this.x);
  };
  
  Vector2d.prototype.dot = function(v) {
    return this.x * v[0] + this.y * v[1];
  };
  
  Vector2d.prototype.cross = function(v) {
    return (this.x * v[1]) - (this.y * v[0]); 
  };

  Vector2d.prototype.angle = function(v) {
    return Math.atan2(this.x, this.y);
  };

  // amd
  if (typeof define !== 'undefined' && define.amd) {
    define(function(){ return Vector2d; });
  }
  
  // commonjs and nodejs
  else if (typeof exports !== 'undefined') {
    exports.Vector2d = Vector2d;
  }
  
  // Browser
  else if (typeof window !== 'undefined') {
    window.Vector2d = Vector2d;
  }

})();
