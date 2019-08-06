# html-compressor
[![npm version](https://img.shields.io/npm/v/html-compressor.svg?style=flat-square)](https://www.npmjs.org/package/html-compressor)
[![npm license](https://img.shields.io/static/v1.svg?label=License&message=MIT&color=informational)](https://github.com/nepsho/html-compressor/blob/master/LICENSE)
[![npm repository](https://img.shields.io/static/v1.svg?label=Repository&message=GitHub&color=yellow)](https://github.com/nepsho/html-compressor)
[![npm author](https://img.shields.io/static/v1.svg?label=Author&message=bcrazydreamer&color=success)](https://www.npmjs.com/~bcrazydreamer)

## html-compressor
> Middleware to compress the HTML content while serving.
  

## Installing

[![NPM](https://nodei.co/npm/html-compressor.png?mini=true)](https://www.npmjs.org/package/html-compressor)

  

**Using npm:**

```bash

$ npm install html-compressor

```
## Method
```js
var express = require('express');
var htmlCompressor = require("html-compressor");
```
```js
var app = express();
app.use(htmlCompressor());
```
## Options
```js
app.use(htmlCompressor(<options>));
```
**default options>>**
- remove comments
- remove white space
- remove empty attributes
- remove attribute quotes
- collapse Boolean attribute

These default options are able to minify the html content but for css and js we can pass the option for that.

| Option | type | default | description|
|--|--|--|--|
| css | Boolean | false | To minify css of html|
| js | Boolean | false | To minify js of html|
| comments | Boolean | true | To remove comments from html|
| render | Boolean | true | It will modify default response.render function for all|
| custom | String | null | It will use to create the custom render function |

**Default Compress Function (renderCompress)>>**
renderCompress is default compress function we can use response.renderCompress to render compress html

## example
```js
var express =  require('express');
var htmlCompressor = require("html-compressor");
var app = express();
app.use(htmlCompressor(
	js : true,
	css : true,
	custom : 'customRender',
	render : true
));

app.get('/modified_render',  function  (req,  res,  next)  {
	res.render('viewfile',  {});
}

app.get('/default_compressor_render',  function  (req,  res,  next)  {
	res.renderCompress('viewfile',  {});
}

app.get('/custom_render',  function  (req,  res,  next)  {
	res.customRender('viewfile',  {});
}
```

## licence
MIT [licence](https://github.com/nepsho/html-compressor/blob/master/LICENSE)

## Author
@BCrazyDreamer
