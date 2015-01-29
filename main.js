var alg = require('./libs/math/linear-algebra')
var hex = require('./libs/math/hex')
var pLib = require('./libs/path')

///////////////////
// Global State ///
///////////////////

var basis = hex.hexBasis(
    alg.vScalarMult({x:20, y:0}, 2),
    alg.vScalarMult({x:10, y:6}, 2)
)

var grid = require('./libs/grid').newGrid()

var pathSettings = pLib.defaultPathList(basis)


///////////////////
// Components /////
///////////////////

var canvas = require('./components/canvas')(document.getElementById("canvas"), grid, basis, pathSettings)

var downloader = require('./components/downloader')(document.getElementById("downloader"), grid, basis, pathSettings)
var colors = require('./components/color-picker')(document.getElementById('color-picker'), pathSettings)
var strokes = require('./components/stroke-styler')(document.getElementById('stroke-styler'), pathSettings)
var paths = require('./components/paths')(document.getElementById("path-list"), pathSettings)

document.getElementById("heck-mode-button").addEventListener("click", function() {pLib.heckMode(pathSettings)})


////////////////////////////
// state change callbacks //
////////////////////////////

pLib.addSubscribedCallback(pathSettings, canvas.render)
pLib.addSubscribedCallback(pathSettings, colors.render)
pLib.addSubscribedCallback(pathSettings, paths.render)
