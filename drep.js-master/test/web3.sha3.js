var chai = require('chai');
var assert = chai.assert;
var Drep = require('../index');
var sha3 = require('../lib/utils/sha3');
var drep = new Drep();

var method = 'sha3';

describe('drep.sha3', function () {
    it('should return sha3 with hex prefix', function() {
	test1 = drep.sha3('test123');
	test2 = drep.sha3('test(int)');
	test3 = drep.sha3('0x80', {encoding: 'hex'});
	test4 = drep.sha3('0x3c9229289a6125f7fdf1885a77bb12c37a8d3b4962d936f7e3084dece32a3ca1', {encoding: 'hex'});
	assert.deepEqual(test1, '0x' + sha3('test123'));
	assert.deepEqual(test2, '0x' + sha3('test(int)'));
	assert.deepEqual(test3, '0x' + sha3('0x80', {encoding: 'hex'}));
	assert.deepEqual(test4, '0x' + sha3('0x3c9229289a6125f7fdf1885a77bb12c37a8d3b4962d936f7e3084dece32a3ca1', {encoding: 'hex'}));
    });
});
