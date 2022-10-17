
var Method = require('../method');
var formatters = require('../formatters');
var utils = require('../../utils/utils');

var CHAIN = function (drep) {
    this._requestManager = drep._requestManager;

    var self = this;
    
    methods().forEach(function(method) { 
        method.attachToObject(self);
        method.setRequestManager(drep._requestManager);
    });
};

var methods = function () {
	
var getAddressByAlias = new Method({
	name: 'getAddressByAlias',
	call: 'chain_getAddressByAlias',
	params: 1,
    inputFormatter: [null]
});
	
var getAliasByAddress = new Method({
	name: 'getAliasByAddress',
	call: 'chain_getAliasByAddress',
	params: 1,
    inputFormatter: [formatters.inputAddressFormatter]
});
	
var getBalance = new Method({
	name: 'getBalance',
	call: 'chain_getBalance',
	params: 1,
    inputFormatter: [formatters.inputAddressFormatter]
});
	
var getBlock = new Method({
	name: 'getBlock',
	call: 'chain_getBlock',
	params: 1,
    inputFormatter: [utils.fromDecimal]
});
	
var getMaxHeight = new Method({
	name: 'getMaxHeight',
	call: 'chain_getMaxHeight',
	params: 0,
    inputFormatter: []
});
	
var getNonce = new Method({
	name: 'getNonce',
	call: 'chain_getNonce',
	params: 1,
    inputFormatter: [formatters.inputAddressFormatter]
});
	
var getPreviousBlockHash = new Method({
	name: 'getPreviousBlockHash',
	call: 'chain_getPreviousBlockHash',
	params: 0,
    inputFormatter: []
});
	
var getReputation = new Method({
	name: 'getReputation',
	call: 'chain_getReputation',
	params: 1,
    inputFormatter: [formatters.inputAddressFormatter]
});
	
var getTransactionByBlockHeightAndIndex = new Method({
	name: 'getTransactionByBlockHeightAndIndex',
	call: 'chain_getTransactionByBlockHeightAndIndex',
	params: 2,
    inputFormatter: [utils.fromDecimal, null]
});
	
var getTransactionCountByBlockHeight = new Method({
	name: 'getTransactionCountByBlockHeight',
	call: 'chain_getTransactionCountByBlockHeight',
	params: 1,
    inputFormatter: [utils.fromDecimal]
});
	
var getTransactionsFromBlock = new Method({
	name: 'getTransactionsFromBlock',
	call: 'chain_getTransactionsFromBlock',
	params: 1,
    inputFormatter: [utils.fromDecimal]
});
	
    return [getAddressByAlias,getAliasByAddress,getBalance,getBlock,getMaxHeight,getNonce,getPreviousBlockHash,getReputation,getTransactionByBlockHeightAndIndex,getTransactionCountByBlockHeight,getTransactionsFromBlock]
}

module.exports = CHAIN;
