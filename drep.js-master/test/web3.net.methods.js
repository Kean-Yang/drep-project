var chai = require('chai');
var assert = chai.assert; 
var Drep = require('../index.js');
var drep = new Drep();
var u = require('./helpers/test.utils.js');

describe('drep.net', function() {
    describe('methods', function() {
        u.propertyExists(drep.net, 'listening');
        u.propertyExists(drep.net, 'peerCount');
    });
});
