var chai = require('chai');
var assert = chai.assert; 
var Drep = require('../index.js');
var drep = new Drep();
var u = require('./helpers/test.utils.js');

describe('drep.eth', function() {
    describe('methods', function() {
        u.methodExists(drep.eth, 'getBalance');
        u.methodExists(drep.eth, 'getStorageAt');
        u.methodExists(drep.eth, 'getTransactionCount');
        u.methodExists(drep.eth, 'getCode');
        u.methodExists(drep.eth, 'sendTransaction');
        u.methodExists(drep.eth, 'call');
        u.methodExists(drep.eth, 'getBlock');
        u.methodExists(drep.eth, 'getTransaction');
        u.methodExists(drep.eth, 'getUncle');
        u.methodExists(drep.eth, 'getCompilers');
        u.methodExists(drep.eth.compile, 'lll');
        u.methodExists(drep.eth.compile, 'solidity');
        u.methodExists(drep.eth.compile, 'serpent');
        u.methodExists(drep.eth, 'getBlockTransactionCount');
        u.methodExists(drep.eth, 'getBlockUncleCount');
        u.methodExists(drep.eth, 'filter');
        u.methodExists(drep.eth, 'contract');

        u.propertyExists(drep.eth, 'coinbase');
        u.propertyExists(drep.eth, 'mining');
        u.propertyExists(drep.eth, 'gasPrice');
        u.propertyExists(drep.eth, 'accounts');
        u.propertyExists(drep.eth, 'defaultBlock');
        u.propertyExists(drep.eth, 'blockNumber');
        u.propertyExists(drep.eth, 'protocolVersion');
    });
});

