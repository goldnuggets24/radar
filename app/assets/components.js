require('babel-core/register');

Object.assign(window, require('./components/*.js', {mode: 'hash'}));