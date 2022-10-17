var chai = require('chai');
var assert = chai.assert;
var Drep = require('../index');
var drep = new Drep();
var FakeHttpProvider = require('./helpers/FakeHttpProvider');

var method = 'listening';

var tests = [{
    result: true,
    formattedResult: true,
    call: 'net_'+ method
}];

describe('drep.net', function () {
    describe(method, function () {
        tests.forEach(function (test, index) {
            it('property test: ' + index, function () {
                
                // given
                var provider = new FakeHttpProvider();
                drep.setProvider(provider);
                provider.injectResult(test.result);
                provider.injectValidation(function (payload) {
                    assert.equal(payload.jsonrpc, '2.0');
                    assert.equal(payload.method, test.call);
                    assert.deepEqual(payload.params, []);
                });

                // when 
                var result = drep.net[method];
                
                // then
                assert.deepEqual(test.formattedResult, result);
            });
        });
    });
});

