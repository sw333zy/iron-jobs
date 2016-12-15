
var mongodb = require('mongodb');

var uri = process.env.JOBS_DB_URI;

module.exports = function connect(done) {
    mongodb.MongoClient.connect(uri, done);
};
