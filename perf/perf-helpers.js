var vector;
var array;
var v2 = new Vector2d([100, 100]);
var v3 = new Vector2d([-100, 100]);

function onStart(event) {
  vector  = new Vector2d([10, 10]);
  array   = [10, 10];

  var names = this.map(function(o, i) { return o.name; });
  var title = '<h2>'+ names.join(' VS ') +'</h2>';
  $('#'+ this._dom_id +' .results').html('');
  $('#'+ this._dom_id +' .results').append('<p>Running...</p>');
};
function onCycle(event) {
  console.log(String(event.target));
  $('#'+ this._dom_id +' .results').append('<p>'+ String(event.target) +'</p>');
};
function onComplete(event) {
  console.log('Fastest is ' + this.filter('fastest').pluck('name'));
  $('#'+ this._dom_id +' .results').append('<p>Fastest is '+ this.filter('fastest').pluck('name') +'</p>');
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

  var suite = new Benchmark.Suite;
  suite._name = args.shift();

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

function layoutSuites(suites) {
  suites.forEach(function(suite, index) {
    var id  = '_'+ index;
    suite._dom_id = id;
    var div = $('<div class="unit" id="'+ id +'"><div class="results"></div></div>');
    var run = $('<a href="javascript:void(0);">Run This Unit</a>').on('click', function(){
      runSuite(suite);
    });
    div.prepend(run);
    run.after('<h3>'+ suite._name +'</h3>');
    $('body').append(div);
  });
};

