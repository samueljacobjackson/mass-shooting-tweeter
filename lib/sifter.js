var Promise = require('bluebird');
var _ = require('lodash');

var db = require('./db');

var sift = function(year, data) {
    return new Promise(function(resolve, reject) {
        var untweeted = _.filter(data, function(o){
            if(!o.tweeted){
                return true;
            }
            return false;
        });
        var updated = _.forEach(data, function(o) {
            o.tweeted = true;
        });

        resolve(untweeted);

     //   db.updateData(year, updated)
     //   .then(function(){ resolve(untweeted); })
     //   .catch(function(err){ reject(err); })
    });
}

module.exports.sift = sift;