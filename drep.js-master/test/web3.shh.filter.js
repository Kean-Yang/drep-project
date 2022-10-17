var chai = require('chai');
var Drep = require('../index');
var drep = new Drep();
var assert = chai.assert;
var FakeHttpProvider = require('./helpers/FakeHttpProvider');

var method = 'newMessageFilter';

var tests = [{
    args: [{
        symKeyID: '47d33b27bb249a2dbab4c0612bf9caf4c1950855',
        sig: '0x55dd47d33b27bb249a2dbab4c0612bf9caf4c1950855',
        minPow: 0.5,
        topics: ['0x32dd4f54', '0x564b4566'],
        allowP2P: false
    }],
    formattedArgs: [{
        symKeyID: '47d33b27bb249a2dbab4c0612bf9caf4c1950855',
        sig: '0x55dd47d33b27bb249a2dbab4c0612bf9caf4c1950855',
        minPow: 0.5,
        topics: ['0x32dd4f54', '0x564b4566'],
        allowP2P: false
    }],
    result: '0xf',
    formattedResult: '0xf',
    call: 'shh_newMessageFilter'
}];

describe('shh', function () {
    describe(method, function () {
        tests.forEach(function (test, index) {
            it('property test: ' + index, function () {

                // given
                var provider = new FakeHttpProvider();
                drep.setProvider(provider);
                drep.reset();
                provider.injectResult(test.result);
                provider.injectValidation(function (payload) {
                    assert.equal(payload.jsonrpc, '2.0');
                    assert.equal(payload.method, test.call);
                    assert.deepEqual(payload.params, test.formattedArgs);
                });

                // call
                drep.shh[method].apply(drep.shh, test.args);

            });
        });
    });
});

