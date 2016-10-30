ol.require('ol.Feature');
ol.require('ol.Map');
ol.require('ol.View');
ol.require('ol.geom.Point');
ol.require('ol.layer.Vector');
ol.require('ol.source.Vector');
ol.require('ol.style.Fill');
ol.require('ol.style.RegularShape');
ol.require('ol.style.Stroke');
ol.require('ol.style.Style');


var stroke = new ol.style.Stroke({color: 'black', width: 2});
var fill = new ol.style.Fill({color: 'red'});

var styles = {
  'square': new ol.style.Style({
    image: new ol.style.RegularShape({
      fill: fill,
      stroke: stroke,
      points: 4,
      radius: 10,
      angle: Math.PI / 4
    })
  }),
  'triangle': new ol.style.Style({
    image: new ol.style.RegularShape({
      fill: fill,
      stroke: stroke,
      points: 3,
      radius: 10,
      rotation: Math.PI / 4,
      angle: 0
    })
  }),
  'star': new ol.style.Style({
    image: new ol.style.RegularShape({
      fill: fill,
      stroke: stroke,
      points: 5,
      radius: 10,
      radius2: 4,
      angle: 0
    })
  }),
  'cross': new ol.style.Style({
    image: new ol.style.RegularShape({
      fill: fill,
      stroke: stroke,
      points: 4,
      radius: 10,
      radius2: 0,
      angle: 0
    })
  }),
  'x': new ol.style.Style({
    image: new ol.style.RegularShape({
      fill: fill,
      stroke: stroke,
      points: 4,
      radius: 10,
      radius2: 0,
      angle: Math.PI / 4
    })
  })
};


var styleKeys = ['x', 'cross', 'star', 'triangle', 'square'];
var count = 250;
var features = new Array(count);
var e = 4500000;
for (var i = 0; i < count; ++i) {
  var coordinates = [2 * e * Math.random() - e, 2 * e * Math.random() - e];
  features[i] = new ol.Feature(new ol.geom.Point(coordinates));
  features[i].setStyle(styles[styleKeys[Math.floor(Math.random() * 5)]]);
}

var source = new ol.source.Vector({
  features: features
});

var vectorLayer = new ol.layer.Vector({
  source: source
});

var map = new ol.Map({
  layers: [
    vectorLayer
  ],
  target: 'map',
  view: new ol.View({
    center: [0, 0],
    zoom: 2
  })
});
