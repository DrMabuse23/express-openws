define('main', function (require, exports, module) {
  var Engine = require('famous/core/Engine');
  var OptionsManager = require('famous/core/OptionsManager');
  var Surface = require('famous/core/Surface');
  var Modifier = require('famous/core/Modifier');
  var RenderNode = require('famous/core/RenderNode');
  var Transform = require('famous/core/Transform');
  var Easing = require('famous/transitions/Easing');
  var StateModifier = require('famous/modifiers/StateModifier');

  var mainContext = Engine.createContext();
  mainContext.setPerspective(1000);

  var content = '';
  var surfaces = [];
  var onProgress = false;
  var splash = new Surface({size: [true, true], content: 'Loading...'});
  splash.on('deploy', function () {
    console.log('On surface deploy=' + mainContext.getSize());
    content += '<br/>On tick=' + mainContext.getSize();
    this.setContent(content);
  });

  function _moveGrid() {
    var time = 15;
    for (var i = 0, l = surfaces.length; i < l; i++) {
      surface = surfaces[i];
      var x = surface.pos[0];
      var y = surface.pos[1];
      var duration = time * surface.rowcol[0] * surface.rowcol[1];

      if (duration > 810) {
        duration = 600;
      }

      surface.mod.setTransform(
        Transform.translate(-x, 0, -x),
        {duration: duration, curve: Easing.inExpo}
      );
      console.log(time * surface.rowcol[0] * surface.rowcol[1])
      surface.mod.setTransform(
        Transform.translate(x, y, 0),
        {duration: time * surface.rowcol[0] * surface.rowcol[1], curve: Easing.outBounce},
        function () {
          this.setContent('finished');
        }.bind(surface));
    }
  }

  function _removeGrid() {
    if (onProgress) {
      return false;
    }

    var time = 350;
    for (var i = 0, l = surfaces.length; i < l; i++) {
      surfaces[i].setSize([0, 0]);
    }
    _createGridlayout(10, 10);
  }

  function _createGridlayout(rows, columns) {
    //surfaces = [];
    var size = mainContext.getSize();
    var numberOfRows = rows || 4;
    var numberOfCols = columns || 4;

    var numberOfSquares = numberOfRows * numberOfCols || 16;
    var xfactor = 1 / numberOfRows;
    var yfactor = 1 / numberOfCols;
    var rowCount = 0;
    var colCount = 0;
    var top = 0;
    for (var i = 0, l = numberOfSquares; i < l; i++) {
      if (i % numberOfRows === 0 && i > 0) {
        rowCount++;
        colCount = 0;
      }
      var surface = null;
      if(!surfaces[i]){
        surface = new Surface({
          size: [size[0] * xfactor * 0.98, size[1] * yfactor * 0.98],
          content: i.toString(),
          properties: {
            color: 'white',
            //marginLeft: size[0]*0.02,
            //marginTop: size[1]*0.02,
            backgroundColor: "hsl(" + (i * 280 / 80) + ", 60%, 50%)"
          }
        });
      } else {
        surface = surfaces[i].setSize([size[0] * xfactor * 0.98, size[1] * yfactor * 0.98]);
      }
      var x = size[0] * xfactor * colCount;
      var y = (size[1] * yfactor) * rowCount;
      console.log(i + ' ' + x + ' ' + y);

      surface.mod = new StateModifier({
        transform: Transform.translate(x, y, 0)
      });

      surface.on('click', _moveGrid);

      mainContext.add(surface.mod).add(surface);
      surface.pos = [x, y];
      surface.rowcol = [rowCount, colCount];
      surfaces.push(surface);
      colCount++;
    }
  }


  Engine.nextTick(function () {
    console.log('On Engine tick=' + mainContext.getSize());
    content += '<br/>On Engine tick=' + mainContext.getSize();
    splash.setContent(content);
    _createGridlayout(10, 10);
    _moveGrid();
  });

  console.log('Probably before tick', mainContext.getSize());
  content += '<br/>Probably before tick=' + mainContext.getSize();

  var size = [];
  size = mainContext.getSize();

  content += '<br/>Maybe before tick=' + size;
  console.log('Maybe before tick', size[0] + ', ' + size[1]);

  mainContext.add(splash);
  mainContext.on('resize', function () {
    _removeGrid();
  });

});
