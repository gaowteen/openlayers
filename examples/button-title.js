ol.require('ol.Map');
ol.require('ol.View');
ol.require('ol.layer.Tile');
ol.require('ol.source.OSM');

var map = new ol.Map({
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM()
    })
  ],
  target: 'map',
  view: new ol.View({
    center: [-8730000, 5930000],
    rotation: Math.PI / 5,
    zoom: 8
  })
});


$('.ol-zoom-in, .ol-zoom-out').tooltip({
  placement: 'right'
});
$('.ol-rotate-reset, .ol-attribution button[title]').tooltip({
  placement: 'left'
});
