var Promise = require('bluebird');
var _ = require('lodash');

var db = require('./db');

var sift = function(year, data) {
    return new Promise(function(resolve, reject) {
        var untweeted = _.filter(data, function(o){
            return !o.tweeted;
        });
        var updated = _.forEach(data, function(o) {
            o.tweeted = true;
        });
        db.updateData(year, updated)
        .then(function() { resolve(untweeted); })
        .catch(function(error) { reject(error); });
    });
}

module.exports.sift = sift;