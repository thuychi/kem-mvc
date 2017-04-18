var app = require('kem').init(require('./config.js'));

app.use(require('kem/use/mvc'));

// using socket if you want
require('kem/ws');