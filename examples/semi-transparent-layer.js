ol.require('ol.Map');
ol.require('ol.View');
ol.require('ol.layer.Tile');
ol.require('ol.proj');
ol.require('ol.source.OSM');
ol.require('ol.source.TileJSON');


var map = new ol.Map({
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM()
    }),
    new ol.layer.Tile({
      source: new ol.source.TileJSON({
        url: 'https://api.tiles.mapbox.com/v3/mapbox.va-quake-aug.json?secure',
        crossOrigin: 'anonymous'
      })
    })
  ],
  target: 'map',
  view: new ol.View({
    center: ol.proj.fromLonLat([-77.93255, 37.9555]),
    zoom: 7
  })
});
