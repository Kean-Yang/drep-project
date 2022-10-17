
var Method = require('../method');
var formatters = require('../formatters');
var utils = require('../../utils/utils');

var BLOCKMGR = function (drep) {
    this._requestManager = drep._requestManager;

    var self = this;
    
    methods().forEach(function(method) { 
        method.attachToObject(self);
        method.setRequestManager(drep._requestManager);
    });
};

var methods = function () {
	
var gasPrice = new Method({
	name: 'gasPrice',
	call: 'blockmgr_gasPrice',
	params: 0,
    inputFormatter: []
});
	
var getPoolMiniPendingNonce = new Method({
	name: 'getPoolMiniPendingNonce',
	call: 'blockmgr_getPoolMiniPendingNonce',
	params: 1,
    inputFormatter: [formatters.inputAddressFormatter]
});
	
var getPoolTransactions = new Method({
	name: 'getPoolTransactions',
	call: 'blockmgr_getPoolTransactions',
	params: 1,
    inputFormatter: [formatters.inputAddressFormatter]
});
	
var sendRawTransaction = new Method({
	name: 'sendRawTransaction',
	call: 'blockmgr_sendRawTransaction',
	params: 1,
    inputFormatter: [null]
});
	
    return [gasPrice,getPoolMiniPendingNonce,getPoolTransactions,sendRawTransaction]
}

module.exports = BLOCKMGR;
