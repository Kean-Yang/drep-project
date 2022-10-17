# Migration 0.13.0 -> 0.14.0

drep.js version 0.14.0 supports [multiple instances of drep](https://github.com/ethereum/drep.js/issues/297) object.
To migrate to this version, please follow the guide:

```diff
-var drep = require('drep');
+var Drep = require('drep');
+var drep = new Drep();
```


# Ethereum JavaScript API

[![Join the chat at https://gitter.im/ethereum/drep.js](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/ethereum/drep.js?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

This is the Ethereum compatible [JavaScript API](https://github.com/ethereum/wiki/wiki/JavaScript-API)
which implements the [Generic JSON RPC](https://github.com/ethereum/wiki/wiki/JSON-RPC) spec. It's available on npm as a node module, for bower and component as an embeddable js and as a meteor.js package.

[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![dependency status][dep-image]][dep-url] [![dev dependency status][dep-dev-image]][dep-dev-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Stories in Ready][waffle-image]][waffle-url]

<!-- [![browser support](https://ci.testling.com/ethereum/ethereum.js.png)](https://ci.testling.com/ethereum/ethereum.js) -->

You need to run a local Ethereum node to use this library.

[Documentation](https://github.com/ethereum/wiki/wiki/JavaScript-API)

## Installation

### Node.js

```bash
npm install drep
```

### Yarn

```bash
yarn add drep
```

### Meteor.js

```bash
meteor add ethereum:drep
```

### As Browser module
Bower

```bash
bower install drep
```

Component

```bash
component install ethereum/drep.js
```

* Include `drep.min.js` in your html file. (not required for the meteor package)

## Usage
Use the `drep` object directly from global namespace:

```js
console.log(drep); // {eth: .., shh: ...} // it's here!
```

Set a provider (HttpProvider)

```js
if (typeof drep !== 'undefined') {
  drep = new Drep(drep.currentProvider);
} else {
  // set the provider you want from Drep.providers
  drep = new Drep(new Drep.providers.HttpProvider("http://localhost:8545"));
}
```

Set a provider (HttpProvider using [HTTP Basic Authentication](https://en.wikipedia.org/wiki/Basic_access_authentication))

```js
drep.setProvider(new drep.providers.HttpProvider('http://host.url', 0, BasicAuthUsername, BasicAuthPassword));
```

There you go, now you can use it:

```js
var coinbase = drep.eth.coinbase;
var balance = drep.eth.getBalance(coinbase);
```

You can find more examples in [`example`](https://github.com/ethereum/drep.js/tree/master/example) directory.


## Contribute!

### Requirements

* Node.js
* npm

```bash
sudo apt-get update
sudo apt-get install nodejs
sudo apt-get install npm
sudo apt-get install nodejs-legacy
```

### Building (gulp)

```bash
npm run-script build
```


### Testing (mocha)

```bash
npm test
```

### Community
 - [Gitter](https://gitter.im/ethereum/drep.js?source=orgpage)
 - [Forum](https://forum.ethereum.org/categories/ethereum-js)


### Other implementations
 - Python [Drep.py](https://github.com/ethereum/drep.py)
 - Haskell [hs-drep](https://github.com/airalab/hs-drep)
 - Java [web3j](https://github.com/web3j/web3j)
 - Scala [web3j-scala](https://github.com/mslinn/web3j-scala)
 - Purescript [purescript-drep](https://github.com/f-o-a-m/purescript-drep)
 - PHP [drep.php](https://github.com/sc0Vu/drep.php)


[npm-image]: https://badge.fury.io/js/drep.svg
[npm-url]: https://npmjs.org/package/drep
[travis-image]: https://travis-ci.org/ethereum/drep.js.svg
[travis-url]: https://travis-ci.org/ethereum/drep.js
[dep-image]: https://david-dm.org/ethereum/drep.js.svg
[dep-url]: https://david-dm.org/ethereum/drep.js
[dep-dev-image]: https://david-dm.org/ethereum/drep.js/dev-status.svg
[dep-dev-url]: https://david-dm.org/ethereum/drep.js#info=devDependencies
[coveralls-image]: https://coveralls.io/repos/ethereum/drep.js/badge.svg?branch=master
[coveralls-url]: https://coveralls.io/r/ethereum/drep.js?branch=master
[waffle-image]: https://badge.waffle.io/ethereum/drep.js.svg?label=ready&title=Ready
[waffle-url]: https://waffle.io/ethereum/drep.js
