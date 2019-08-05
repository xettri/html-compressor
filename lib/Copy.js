"use strict";
const bvalid = require("bvalid");

/*
* DeepCopy useful for array and objects.
*/

exports.deepcopy = function(value){
    if(
        bvalid.isArray(value)  ||
        bvalid.isObject(value) ||
        bvalid.isString(value) ||
        bvalid.isNumber(value) ||
        bvalid.isNull(value)
    ) {
        return JSON.parse(JSON.stringify(value));
    }
    try{
        var type = Object.prototype.toString.call(value);
        var error = "You can not copy "+type;
    } catch(err){
      var error = "You can not copy this type of variable or value";
    }
    throw new Error(error);
}

exports.shallowcopy = function(value){
    return value;
}
