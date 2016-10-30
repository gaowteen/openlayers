ol.require('ol.Map');
ol.require('ol.View');
ol.require('ol.layer.Tile');
ol.require('ol.source.TileJSON');


var map = new ol.Map({
  layers: [
    new ol.layer.Tile({
      source: new ol.source.TileJSON({
        url: 'https://api.tiles.mapbox.com/v3/mapbox.geography-class.json?secure',
        crossOrigin: 'anonymous'
      })
    })
  ],
  target: 'map',
  view: new ol.View({
    center: [0, 0],
    zoom: 2
  })
});
