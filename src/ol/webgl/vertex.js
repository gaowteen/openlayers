ol.provide('ol.webgl.Vertex');

ol.require('ol');
ol.require('ol.webgl');
ol.require('ol.webgl.Shader');


/**
 * @constructor
 * @extends {ol.webgl.Shader}
 * @param {string} source Source.
 * @struct
 */
ol.webgl.Vertex = function(source) {
  ol.webgl.Shader.call(this, source);
};
ol.inherits(ol.webgl.Vertex, ol.webgl.Shader);


/**
 * @inheritDoc
 */
ol.webgl.Vertex.prototype.getType = function() {
  return ol.webgl.VERTEX_SHADER;
};
