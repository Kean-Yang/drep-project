/*
    This file is part of drep.js.

    drep.js is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    drep.js is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.

    You should have received a copy of the GNU Lesser General Public License
    along with drep.js.  If not, see <http://www.gnu.org/licenses/>.
*/
/**
 * @file drep.js
 * @authors:
 *   Jeffrey Wilcke <jeff@ethdev.com>
 *   Marek Kotewicz <marek@ethdev.com>
 *   Marian Oancea <marian@ethdev.com>
 *   Fabian Vogelsteller <fabian@ethdev.com>
 *   Gav Wood <g@ethdev.com>
 * @date 2014
 */

var RequestManager = require('./drep/requestmanager');
var Iban = require('./drep/iban');
var CHAIN = require('./drep/methods/chain');
var ACCOUNT = require('./drep/methods/account');
var CONSENSUS = require('./drep/methods/consensus');
var TRACE = require('./drep/methods/trace');
var BLOCKMGR = require('./drep/methods/blockmgr');
var P2P = require('./drep/methods/p2p');
var Settings = require('./drep/settings');
var version = require('./version.json');
var utils = require('./utils/utils');
var sha3 = require('./utils/sha3');
var extend = require('./drep/extend');
var Batch = require('./drep/batch');
var Property = require('./drep/property');
var HttpProvider = require('./drep/httpprovider');
var IpcProvider = require('./drep/ipcprovider');
var BigNumber = require('bignumber.js');



function Drep (provider) {
    this._requestManager = new RequestManager(provider);
    this.currentProvider = provider;
    
    this.p2p = new P2P(this);
    this.consensus = new CONSENSUS(this);
    this.trace = new TRACE(this);
    this.account = new ACCOUNT(this);
    this.chain = new CHAIN(this);
    this.blockmgr = new BLOCKMGR(this);

    this.settings = new Settings();
    this.version = {
        api: version.version
    };
    this.providers = {
        HttpProvider: HttpProvider,
        IpcProvider: IpcProvider
    };
    this._extend = extend(this);
    this._extend({
        properties: properties()
    });
}

// expose providers on the class
Drep.providers = {
    HttpProvider: HttpProvider,
    IpcProvider: IpcProvider
};

Drep.prototype.setProvider = function (provider) {
    this._requestManager.setProvider(provider);
    this.currentProvider = provider;
};

Drep.prototype.reset = function (keepIsSyncing) {
    this._requestManager.reset(keepIsSyncing);
    this.settings = new Settings();
};

Drep.prototype.BigNumber = BigNumber;
Drep.prototype.toHex = utils.toHex;
Drep.prototype.toAscii = utils.toAscii;
Drep.prototype.toUtf8 = utils.toUtf8;
Drep.prototype.fromAscii = utils.fromAscii;
Drep.prototype.fromUtf8 = utils.fromUtf8;
Drep.prototype.toDecimal = utils.toDecimal;
Drep.prototype.fromDecimal = utils.fromDecimal;
Drep.prototype.toBigNumber = utils.toBigNumber;
Drep.prototype.toWei = utils.toWei;
Drep.prototype.fromWei = utils.fromWei;
Drep.prototype.isAddress = utils.isAddress;
Drep.prototype.isChecksumAddress = utils.isChecksumAddress;
Drep.prototype.toChecksumAddress = utils.toChecksumAddress;
Drep.prototype.isIBAN = utils.isIBAN;
Drep.prototype.padLeft = utils.padLeft;
Drep.prototype.padRight = utils.padRight;


Drep.prototype.sha3 = function(string, options) {
    return '0x' + sha3(string, options);
};

/**
 * Transforms direct icap to address
 */
Drep.prototype.fromICAP = function (icap) {
    var iban = new Iban(icap);
    return iban.address();
};

var properties = function () {
    return [
        new Property({
            name: 'version.node',
            getter: 'web3_clientVersion'
        })
    ];
};

Drep.prototype.isConnected = function(){
    return (this.currentProvider && this.currentProvider.isConnected());
};

Drep.prototype.createBatch = function () {
    return new Batch(this);
};

module.exports = Drep;

