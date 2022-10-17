var chai = require('chai');
var assert = chai.assert;
var FakeHttpProvider = require('./helpers/FakeHttpProvider');
var Drep = require('../lib/drep');
var drep = new Drep();


var tests = [{
    properties: [new drep._extend.Property({
        name: 'gasPrice',
        getter: 'eth_gasPrice',
        outputFormatter: drep._extend.formatters.outputBigNumberFormatter
    })]
},{
    methods: [new drep._extend.Method({
        name: 'getBalance',
        call: 'eth_getBalance',
        params: 2,
        inputFormatter: [drep._extend.utils.toAddress, drep._extend.formatters.inputDefaultBlockNumberFormatter],
        outputFormatter: drep._extend.formatters.outputBigNumberFormatter
    })]
},{
    property: 'admin',
    properties: [new drep._extend.Property({
        name: 'gasPrice',
        getter: 'eth_gasPrice',
        outputFormatter: drep._extend.formatters.outputBigNumberFormatter
    })],
    methods: [new drep._extend.Method({
        name: 'getBalance',
        call: 'eth_getBalance',
        params: 2,
        inputFormatter: [drep._extend.utils.toAddress, drep._extend.formatters.inputDefaultBlockNumberFormatter],
        outputFormatter: drep._extend.formatters.outputBigNumberFormatter
    })]
}];

describe('drep', function () {
    describe('_extend', function () {
        tests.forEach(function (test, index) {
            it('test no: ' + index, function () {
                drep._extend(test);


                if(test.properties)
                    test.properties.forEach(function(property){

                        var provider = new FakeHttpProvider();
                        drep.setProvider(provider);
                        provider.injectResult('');
                        provider.injectValidation(function (payload) {
                            assert.equal(payload.jsonrpc, '2.0');
                            assert.equal(payload.method, property.getter);
                        });

                        if(test.property) {
                            assert.isObject(drep[test.property][property.name]);
                            assert.isFunction(drep[test.property]['get'+ property.name.charAt(0).toUpperCase() + property.name.slice(1)]);
                        } else {
                            assert.isObject(drep[property.name]);
                            assert.isFunction(drep['get'+ property.name.charAt(0).toUpperCase() + property.name.slice(1)]);                        
                        }
                    });

                if(test.methods)
                    test.methods.forEach(function(property){
                        if(test.property)
                            assert.isFunction(drep[test.property][property.name]);
                        else
                            assert.isFunction(drep[property.name]);
                    });

            });
        });
    });
});

