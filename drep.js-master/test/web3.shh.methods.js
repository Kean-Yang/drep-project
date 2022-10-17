var chai = require('chai');
var assert = chai.assert;
var Drep = require('../index.js');
var drep = new Drep();
var u = require('./helpers/test.utils.js');

describe('drep.shh', function() {
    describe('methods', function() {
        u.methodExists(drep.shh, 'version');
        u.methodExists(drep.shh, 'info');
        u.methodExists(drep.shh, 'setMaxMessageSize');
        u.methodExists(drep.shh, 'setMinPoW');
        u.methodExists(drep.shh, 'markTrustedPeer');
        u.methodExists(drep.shh, 'newKeyPair');
        u.methodExists(drep.shh, 'addPrivateKey');
        u.methodExists(drep.shh, 'deleteKeyPair');
        u.methodExists(drep.shh, 'hasKeyPair');
        u.methodExists(drep.shh, 'getPublicKey');
        u.methodExists(drep.shh, 'getPrivateKey');
        u.methodExists(drep.shh, 'newSymKey');
        u.methodExists(drep.shh, 'addSymKey');
        u.methodExists(drep.shh, 'generateSymKeyFromPassword');
        u.methodExists(drep.shh, 'hasSymKey');
        u.methodExists(drep.shh, 'getSymKey');
        u.methodExists(drep.shh, 'deleteSymKey');
        u.methodExists(drep.shh, 'newMessageFilter');
        u.methodExists(drep.shh, 'post');

    });
});

