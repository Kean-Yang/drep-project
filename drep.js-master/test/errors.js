var chai = require('chai');
var assert = chai.assert;
var errors = require('../lib/drep/errors');

describe('lib/drep/method', function () {
    describe('getCall', function () {

        for(var key in errors) {
            it('should return and error', function () {
        
                assert.instanceOf(errors[key](), Error);
            });
        }

    });
});

