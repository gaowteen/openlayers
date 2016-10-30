ol.require('ol.Feature');
ol.require('ol.Map');
ol.require('ol.Observable');
ol.require('ol.View');
ol.require('ol.control');
ol.require('ol.easing');
ol.require('ol.geom.Point');
ol.require('ol.layer.Tile');
ol.require('ol.layer.Vector');
ol.require('ol.proj');
ol.require('ol.source.OSM');
ol.require('ol.source.Vector');
ol.require('ol.style.Circle');
ol.require('ol.style.Stroke');
ol.require('ol.style.Style');


var map = new ol.Map({
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM({
        wrapX: false
      })
    })
  ],
  controls: ol.control.defaults({
    attributionOptions: /** @type {olx.control.AttributionOptions} */ ({
      collapsible: false
    })
  }),
  target: 'map',
  view: new ol.View({
    center: [0, 0],
    zoom: 1
  })
});

var source = new ol.source.Vector({
  wrapX: false
});
var vector = new ol.layer.Vector({
  source: source
});
map.addLayer(vector);

function addRandomFeature() {
  var x = Math.random() * 360 - 180;
  var y = Math.random() * 180 - 90;
  var geom = new ol.geom.Point(ol.proj.transform([x, y],
      'EPSG:4326', 'EPSG:3857'));
  var feature = new ol.Feature(geom);
  source.addFeature(feature);
}

var duration = 3000;
function flash(feature) {
  var start = new Date().getTime();
  var listenerKey;

  function animate(event) {
    var vectorContext = event.vectorContext;
    var frameState = event.frameState;
    var flashGeom = feature.getGeometry().clone();
    var elapsed = frameState.time - start;
    var elapsedRatio = elapsed / duration;
    // radius will be 5 at start and 30 at end.
    var radius = ol.easing.easeOut(elapsedRatio) * 25 + 5;
    var opacity = ol.easing.easeOut(1 - elapsedRatio);

    var style = new ol.style.Style({
      image: new ol.style.Circle({
        radius: radius,
        snapToPixel: false,
        stroke: new ol.style.Stroke({
          color: 'rgba(255, 0, 0, ' + opacity + ')',
          width: 0.25 + opacity
        })
      })
    });

    vectorContext.setStyle(style);
    vectorContext.drawGeometry(flashGeom);
    if (elapsed > duration) {
      ol.Observable.unByKey(listenerKey);
      return;
    }
    // tell OL3 to continue postcompose animation
    map.render();
  }
  listenerKey = map.on('postcompose', animate);
}

source.on('addfeature', function(e) {
  flash(e.feature);
});

window.setInterval(addRandomFeature, 1000);
