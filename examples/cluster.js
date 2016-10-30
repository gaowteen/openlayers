ol.require('ol.Feature');
ol.require('ol.Map');
ol.require('ol.View');
ol.require('ol.geom.Point');
ol.require('ol.layer.Tile');
ol.require('ol.layer.Vector');
ol.require('ol.source.Cluster');
ol.require('ol.source.OSM');
ol.require('ol.source.Vector');
ol.require('ol.style.Circle');
ol.require('ol.style.Fill');
ol.require('ol.style.Stroke');
ol.require('ol.style.Style');
ol.require('ol.style.Text');


var distance = document.getElementById('distance');

var count = 20000;
var features = new Array(count);
var e = 4500000;
for (var i = 0; i < count; ++i) {
  var coordinates = [2 * e * Math.random() - e, 2 * e * Math.random() - e];
  features[i] = new ol.Feature(new ol.geom.Point(coordinates));
}

var source = new ol.source.Vector({
  features: features
});

var clusterSource = new ol.source.Cluster({
  distance: parseInt(distance.value, 10),
  source: source
});

var styleCache = {};
var clusters = new ol.layer.Vector({
  source: clusterSource,
  style: function(feature) {
    var size = feature.get('features').length;
    var style = styleCache[size];
    if (!style) {
      style = new ol.style.Style({
        image: new ol.style.Circle({
          radius: 10,
          stroke: new ol.style.Stroke({
            color: '#fff'
          }),
          fill: new ol.style.Fill({
            color: '#3399CC'
          })
        }),
        text: new ol.style.Text({
          text: size.toString(),
          fill: new ol.style.Fill({
            color: '#fff'
          })
        })
      });
      styleCache[size] = style;
    }
    return style;
  }
});

var raster = new ol.layer.Tile({
  source: new ol.source.OSM()
});

var map = new ol.Map({
  layers: [raster, clusters],
  target: 'map',
  view: new ol.View({
    center: [0, 0],
    zoom: 2
  })
});

distance.addEventListener('input', function() {
  clusterSource.setDistance(parseInt(distance.value, 10));
});
