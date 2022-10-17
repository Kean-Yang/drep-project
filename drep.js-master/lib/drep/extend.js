var formatters = require('./formatters');
var utils = require('./../utils/utils');
var Method = require('./method');
var Property = require('./property');

// TODO: refactor, so the input params are not altered.
// it's necessary to make same 'extension' work with multiple providers
var extend = function (drep) {
    /* jshint maxcomplexity:5 */
    var ex = function (extension) {

        var extendedObject;
        if (extension.property) {
            if (!drep[extension.property]) {
                drep[extension.property] = {};
            }
            extendedObject = drep[extension.property];
        } else {
            extendedObject = drep;
        }

        if (extension.methods) {
            extension.methods.forEach(function (method) {
                method.attachToObject(extendedObject);
                method.setRequestManager(drep._requestManager);
            });
        }

        if (extension.properties) {
            extension.properties.forEach(function (property) {
                property.attachToObject(extendedObject);
                property.setRequestManager(drep._requestManager);
            });
        }
    };

    ex.formatters = formatters; 
    ex.utils = utils;
    ex.Method = Method;
    ex.Property = Property;

    return ex;
};



module.exports = extend;

