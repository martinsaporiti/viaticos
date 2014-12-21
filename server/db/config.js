
'use strict';

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/viaticos');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  // yay!
});

exports.db;
