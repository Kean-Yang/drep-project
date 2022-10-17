var chai = require('chai');
var assert = chai.assert; 
var Drep = require('../index.js');
var drep = new Drep();
var u = require('./helpers/test.utils.js');

describe('drep.db', function() {
    describe('methods', function() {
        u.methodExists(drep.db, 'putHex');
        u.methodExists(drep.db, 'getHex');
        u.methodExists(drep.db, 'putString');
        u.methodExists(drep.db, 'getString');
    });
});

