var Drep = require('../index.js');
var drep = new Drep();
var u = require('./helpers/test.utils.js');

describe('drep', function() {
    describe('methods', function () {
        u.methodExists(drep, 'sha3');
        u.methodExists(drep, 'toAscii');
        u.methodExists(drep, 'fromAscii');
        u.methodExists(drep, 'toDecimal');
        u.methodExists(drep, 'fromDecimal');
        u.methodExists(drep, 'fromWei');
        u.methodExists(drep, 'toWei');
        u.methodExists(drep, 'toBigNumber');
        u.methodExists(drep, 'isAddress');
        u.methodExists(drep, 'setProvider');
        u.methodExists(drep, 'reset');

        u.propertyExists(drep, 'providers');
        u.propertyExists(drep, 'eth');
        u.propertyExists(drep, 'db');
        u.propertyExists(drep, 'shh');
    });
});

