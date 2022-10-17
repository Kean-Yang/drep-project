/* jshint ignore:start */


// Browser environment
if(typeof window !== 'undefined') {
    Drep = (typeof window.Drep !== 'undefined') ? window.Drep : require('drep');
    BigNumber = (typeof window.BigNumber !== 'undefined') ? window.BigNumber : require('bignumber.js');
}


// Node environment
if(typeof global !== 'undefined') {
    Drep = (typeof global.Drep !== 'undefined') ? global.Drep : require('drep');
    BigNumber = (typeof global.BigNumber !== 'undefined') ? global.BigNumber : require('bignumber.js');
}

/* jshint ignore:end */