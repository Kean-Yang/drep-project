var chai = require('chai');
var assert = chai.assert;
var Drep = require('../index');
var drep = new Drep();

describe('drep.eth', function () {
    describe('defaultBlock', function () {
        it('should check if defaultBlock is set to proper value', function () {
            assert.equal(drep.eth.defaultBlock, 'latest');
        });
    });
});

