ol.require('ol.Map');
ol.require('ol.View');
ol.require('ol.layer.Tile');
ol.require('ol.source.OSM');
ol.require('ol.source.TileArcGISRest');

var url = 'https://sampleserver1.arcgisonline.com/ArcGIS/rest/services/' +
    'Specialty/ESRI_StateCityHighway_USA/MapServer';

var layers = [
  new ol.layer.Tile({
    source: new ol.source.OSM()
  }),
  new ol.layer.Tile({
    extent: [-13884991, 2870341, -7455066, 6338219],
    source: new ol.source.TileArcGISRest({
      url: url
    })
  })
];
var map = new ol.Map({
  layers: layers,
  target: 'map',
  view: new ol.View({
    center: [-10997148, 4569099],
    zoom: 4
  })
});
