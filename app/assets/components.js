require('babel-core/register');
require('material-ui/src/app-bar');

Object.assign(window, require('./components/*.js', {mode: 'hash'}));