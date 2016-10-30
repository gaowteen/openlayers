// NOCOMPILE
// this example uses FileSaver.js for which we don't have an externs file.
ol.require('ol.Map');
ol.require('ol.View');
ol.require('ol.control');
ol.require('ol.format.GeoJSON');
ol.require('ol.layer.Tile');
ol.require('ol.layer.Vector');
ol.require('ol.source.OSM');
ol.require('ol.source.Vector');

var map = new ol.Map({
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM()
    }),
    new ol.layer.Vector({
      source: new ol.source.Vector({
        url: 'data/geojson/countries.geojson',
        format: new ol.format.GeoJSON()
      })
    })
  ],
  target: 'map',
  controls: ol.control.defaults({
    attributionOptions: /** @type {olx.control.AttributionOptions} */ ({
      collapsible: false
    })
  }),
  view: new ol.View({
    center: [0, 0],
    zoom: 2
  })
});

document.getElementById('export-png').addEventListener('click', function() {
  map.once('postcompose', function(event) {
    var canvas = event.context.canvas;
    canvas.toBlob(function(blob) {
      saveAs(blob, 'map.png');
    });
  });
  map.renderSync();
});
