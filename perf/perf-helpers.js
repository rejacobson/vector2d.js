var vector;
var array;
var v2 = new Vector2d([100, 100]);
var v3 = new Vector2d([-100, 100]);

var unit_template = Handlebars.compile('\
  <div class="method">\
    <p id="{{anchor}}">\
      <b>{{name}}</b>\
      <a class="run" href="javascript:void(0);">Run This Unit</a>\
    </p>\
    <pre>{{code}}</pre>\
    <pre class="results" id="{{unit}}"></pre>\
  </div>');


function onStart(event) {
  vector  = new Vector2d([10, 10]);
  array   = [10, 10];

  var names = this.map(function(o, i) { return o.name; });
  var title = '<h2>'+ names.join(' VS ') +'</h2>';
  $('#'+ this._dom_id).html('');
  $('#'+ this._dom_id).append('<p>Running...</p>');
};
function onCycle(event) {
  $('#'+ this._dom_id).append('<p>'+ String(event.target) +'</p>');
};
function onComplete(event) {
  $('#'+ this._dom_id).append('<p>Fastest is '+ this.filter('fastest').pluck('name') +'</p>');
};

function runSuites(suites) {
  if (!suites.length) {
    $('body').append('<h1>Finished</h1>');
    return;
  }
  var suite = suites.shift();
  suite.on('complete', function() {
    runSuites(suites);
  });
  runSuite(suite);
};

function runSuite(suite) {
  suite.run({async: true});
};

function createSuite() {
  if (arguments.length == 0) return;
  var args = [];
  Array.prototype.push.apply(args, arguments);

  var suite     = new Benchmark.Suite;
  var name      = args.shift();
  var group     = args.shift();
  suite._name   = name;
  suite._group  = group;

  for (var i=0, len=args.length; i<len; i+=2) {
    var name = args[i];
    var func = args[i+1];
    suite.add(name, func);
  }

  suite.on('start',    onStart)
       .on('cycle',    onCycle)
       .on('complete', onComplete);

  return suite;
};

function _clean_code(code) {
  code = code.split("\n");
  code.pop();
  code.shift();
  code = code.map(function(c) { return c.trim(); });
  return code.join("\n");
};

function layoutSuites(suites) {
  suites.forEach(function(suite, index) {
    suite._dom_id = '_'+ index;
    var code  = suite.map(function(s) { return _clean_code(s.fn.toString()); }).join("\n\n");
    var $html = $(unit_template({
      name:   suite._name,
      anchor: suite._name.replace('#', ''),
      unit:   suite._dom_id,
      code:   code
    }));

    $('a.run', $html).on('click', function(){
      runSuite(suite);
    });

    $('body #'+ suite._group).append($html);
  });
};

