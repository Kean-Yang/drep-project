var Drep = require('./lib/drep');

// dont override global variable
if (typeof window !== 'undefined' && typeof window.Drep === 'undefined') {
    window.Drep = Drep;
}

module.exports = Drep;
