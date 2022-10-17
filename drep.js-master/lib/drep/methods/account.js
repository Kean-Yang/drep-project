
var Method = require('../method');
var formatters = require('../formatters');
var utils = require('../../utils/utils');

var ACCOUNT = function (drep) {
    this._requestManager = drep._requestManager;

    var self = this;
    
    methods().forEach(function(method) { 
        method.attachToObject(self);
        method.setRequestManager(drep._requestManager);
    });
};

var methods = function () {
	
var call = new Method({
	name: 'call',
	call: 'account_call',
	params: 6,
    inputFormatter: [formatters.inputAddressFormatter, formatters.inputAddressFormatter, null, utils.fromDecimal, utils.fromDecimal, utils.fromDecimal]
});
	
var closeWallet = new Method({
	name: 'closeWallet',
	call: 'account_closeWallet',
	params: 0,
    inputFormatter: []
});
	
var createAccount = new Method({
	name: 'createAccount',
	call: 'account_createAccount',
	params: 0,
    inputFormatter: []
});
	
var createCode = new Method({
	name: 'createCode',
	call: 'account_createCode',
	params: 5,
    inputFormatter: [formatters.inputAddressFormatter, null, utils.fromDecimal, utils.fromDecimal, utils.fromDecimal]
});
	
var createWallet = new Method({
	name: 'createWallet',
	call: 'account_createWallet',
	params: 1,
    inputFormatter: [null]
});
	
var dumpPrivkey = new Method({
	name: 'dumpPrivkey',
	call: 'account_dumpPrivkey',
	params: 1,
    inputFormatter: [formatters.inputAddressFormatter]
});
	
var gasPrice = new Method({
	name: 'gasPrice',
	call: 'account_gasPrice',
	params: 0,
    inputFormatter: []
});
	
var getCode = new Method({
	name: 'getCode',
	call: 'account_getCode',
	params: 1,
    inputFormatter: [formatters.inputAddressFormatter]
});
	
var listAddress = new Method({
	name: 'listAddress',
	call: 'account_listAddress',
	params: 0,
    inputFormatter: []
});
	
var lockWallet = new Method({
	name: 'lockWallet',
	call: 'account_lockWallet',
	params: 0,
    inputFormatter: []
});
	
var openWallet = new Method({
	name: 'openWallet',
	call: 'account_openWallet',
	params: 1,
    inputFormatter: [null]
});
	
var setAlias = new Method({
	name: 'setAlias',
	call: 'account_setAlias',
	params: 4,
    inputFormatter: [formatters.inputAddressFormatter, null, utils.fromDecimal, utils.fromDecimal]
});
	
var sign = new Method({
	name: 'sign',
	call: 'account_sign',
	params: 2,
    inputFormatter: [formatters.inputAddressFormatter, null]
});
	
var transfer = new Method({
	name: 'transfer',
	call: 'account_transfer',
	params: 6,
    inputFormatter: [formatters.inputAddressFormatter, formatters.inputAddressFormatter, utils.fromDecimal, utils.fromDecimal, utils.fromDecimal, null]
});
	
var unLockWallet = new Method({
	name: 'unLockWallet',
	call: 'account_unLockWallet',
	params: 1,
    inputFormatter: [null]
});
	
    return [call,closeWallet,createAccount,createCode,createWallet,dumpPrivkey,gasPrice,getCode,listAddress,lockWallet,openWallet,setAlias,sign,transfer,unLockWallet]
}

module.exports = ACCOUNT;
