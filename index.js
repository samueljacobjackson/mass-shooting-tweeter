var _ = require('lodash');
var Promise = require('bluebird');

var db = require('./lib/db');
var sifter = require('./lib/sifter');
var formatter = require('./lib/formatter');
var tweeter = require('./lib/tweeter');

exports.handler = function(event, context, callback) {
    doIt()
    .catch(function(err){
        return callback(err);
    })
    .done(function(){
        return callback(null, 'Success');
    });
}

var doIt = function(){
    var year = new Date().getFullYear();
    var month = new Date().getMonth() + 1;
    return new Promise(function(resolve, reject) {
        if(month > 1){ return it(year); }
        else{
            return it(year - 1)
            .then(year);
        }
    });
}

var it = function(year){
    return new Promise(function(resolve, reject) {
        return db.getData(year)
        .then(function(data) { return sifter.sift(year, data); })
        .then(function(siftedData) {
            var promises = [];
            _.forEach(siftedData, function(o){
                promises.push(formatAndTweet(o));
            });
            return Promise.all(promises);
        });
    });
}

var formatAndTweet = function(item){
    return new Promise(function(resolve, reject) {
        return formatter.format(item)
        .then(function(tweet){
            return tweeter.tweet(tweet);
        });
    });
}