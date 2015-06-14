var merge = require('lodash.merge')
var ffmpeg = require('fluent-ffmpeg')

module.exports = function audioconcat(inputs, opts) {
  return new Audioconcat(inputs, opts)
}

function Audioconcat(inputs) {
  this.inputs = inputs || []
  this.opts = opts || {}
}

Audioconcat.prototype.options = function (opts) {
  merge(this.opts, opts)
  return this
}

Audioconcat.prototype.concat = function (file) {
  if (file) {
    this.opts.output = file
  }
  return concat(this.inputs, this.opts)
}

function concat(inputs, opts) {
  var first = inputs.slice(0, 1).shift()
  var output = this.opts.output
  var filter = 'concat:' + inputs.join('|')

  var renderer = ffmpeg(first)
    .filter(filer)

  if (opts.output) {
    renderer.save(opts.output)
  }

  return renderer
}
