
var Method = require('../method');
var formatters = require('../formatters');
var utils = require('../../utils/utils');

var TRACE = function (drep) {
    this._requestManager = drep._requestManager;

    var self = this;
    
    methods().forEach(function(method) { 
        method.attachToObject(self);
        method.setRequestManager(drep._requestManager);
    });
};

var methods = function () {
	
var decodeTrasnaction = new Method({
	name: 'decodeTrasnaction',
	call: 'trace_decodeTrasnaction',
	params: 1,
    inputFormatter: [null]
});
	
var getRawTransaction = new Method({
	name: 'getRawTransaction',
	call: 'trace_getRawTransaction',
	params: 1,
    inputFormatter: [null]
});
	
var getReceiveTransactionByAddr = new Method({
	name: 'getReceiveTransactionByAddr',
	call: 'trace_getReceiveTransactionByAddr',
	params: 3,
    inputFormatter: [formatters.inputAddressFormatter, null, null]
});
	
var getSendTransactionByAddr = new Method({
	name: 'getSendTransactionByAddr',
	call: 'trace_getSendTransactionByAddr',
	params: 3,
    inputFormatter: [formatters.inputAddressFormatter, null, null]
});
	
var getTransaction = new Method({
	name: 'getTransaction',
	call: 'trace_getTransaction',
	params: 1,
    inputFormatter: [null]
});
	
    return [decodeTrasnaction,getRawTransaction,getReceiveTransactionByAddr,getSendTransactionByAddr,getTransaction]
}

module.exports = TRACE;
