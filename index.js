'use strict';
var minify = require('html-minifier').minify;
/* Bvalid Code */
function isBoolean(variable) { return Object.prototype.toString.call(variable) === "[object Boolean]"}
function isObject(variable) { return Object.prototype.toString.call(variable) === "[object Object]"}

module.exports = function compress_html(_data) {
  var data = {
    removeComments: true,
    collapseWhitespace: true,
    collapseBooleanAttributes: true,
    removeAttributeQuotes: true,
    removeEmptyAttributes: true
  }
  if(isObject(_data)){
    if(isBoolean(_data.js)){
      data.minifyJS = _data.js;
    }
    if(isBoolean(_data.css)){
      data.minifyCSS = _data.css;
    }
    if(isBoolean(_data.comments)){
      data.minifyCSS = _data.comments;
    }
    if(isBoolean(_data.whitespace)){
      data.minifyCSS = _data.whitespace;
    }
  }
  function compressor(req, res, next) {
    var skip = false;
    var sendCompressHtml = function (callback) {
      if (typeof callback === 'undefined') {
        return function (err, html) {
          if (err) {
            return next(err);
          }
          html = minify(html, data);
          res.send(html);
        }
      } else {
        return function (err, html) {
          if (html) {
            html = minify(html, data);
          }
          callback(err, html);
        }
      }
    };
    res.oldRender = res.render;
    res.render = function (view, renderOpts, callback) {
      this.oldRender(view, renderOpts, sendCompressHtml(callback));
    };
    return next();
  }
  return (compressor);
}