'use strict';
const minify = require('html-minifier').minify;

/* Bvalid Functions*/
const isBoolean = function(variable) { return Object.prototype.toString.call(variable) === "[object Boolean]"}
const isObject = function(variable) { return Object.prototype.toString.call(variable) === "[object Object]"}
const isFunction = function(variable) {return Object.prototype.toString.call(variable) === "[object Function]"}
/*-----------------*/

const errorMsgHead = '\u001B[38;2;255;0;0mhtml-compressor\u001B[39m-';
const syntaxError = 'Unable to compress html make sure html syntax is correct';

const optionFilter = function(_data){
  var _payload = {
    removeComments: true,
    collapseWhitespace: true,
    removeEmptyAttributes: true,
    removeAttributeQuotes: true,
    collapseBooleanAttributes: true
  }
  if(isObject(_data)){
    if(isBoolean(_data.js)){
      _payload.minifyJS = _data.js;
    }
    if(isBoolean(_data.css)){
      _payload.minifyCSS = _data.css;
    }
    if(isBoolean(_data.comments)){
      _payload.minifyCSS = _data.comments;
    }
    if(isBoolean(_data.whitespace)){
      _payload.minifyCSS = _data.whitespace;
    }
  }
  return _payload;
}

const compressor = function(req, res, next, data, isRenderModify,customRender,_debug){
  var sendCompressHtml = function (cb) {
    if(isFunction(cb)) {
      return function (err, html) {
        if (err) {
          return cb(err);
        }
        if (html) {
          try{
            html = minify(html, data);
          } catch(err){
            if(_debug){
              console.log(errorMsgHead+syntaxError);
            }
          }
        }
        return cb(err, html);
      }
    } else {
      return function (err, html) {
        if (err) {
          return next(err);
        }
        try{
          html = minify(html, data);
        } catch(err){
          if(_debug){
            console.log(errorMsgHead+syntaxError);
          }
        }
        return res.send(html);
      }
    }
  }
  if(isRenderModify){
    res._tempRender = res.render;
    res.render = function (view, r_opts, cb2) {
      this._tempRender(view, r_opts, sendCompressHtml(cb2));
    }
  }
  if(customRender){
    res[customRender] = function (view, r_opts, cb2) {
      this.render(view, r_opts, sendCompressHtml(cb2));
    }
  }
  res.renderCompress = function (view, r_opts, cb2) {
    this.render(view, r_opts, sendCompressHtml(cb2));
  }
  return next();
}

/* compress engine */
module.exports = function(_data){
  var _debug = false;
  if(_data && (_data.debug === true || _data.debug === "true")){
    _debug = true;
  }
  var data = optionFilter(_data);
  var isRenderModify = isBoolean(_data.render) ? _data.render : true;
  var customRender = (
    typeof _data.custom === 'string' &&
    _data.custom.trim().length !== 0
  ) ? _data.custom : null;

  return function(req, res, next){
    return compressor(
      req, res, next,
      data,isRenderModify,customRender,_debug
    );
  }
}
/*-----------------*/