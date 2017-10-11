var Promise = require('bluebird');
var url = require('./url');

var format = function(data) {
    return new Promise(function(resolve, reject) {
        var tweet = '';
        killed = parseInt(data.killed);
        wounded = parseInt(data.wounded);
        
        if(killed == 0 && wounded == 0){
            reject();
        }

        if(killed > 0) { 
            tweet += data.killed; 
            tweet += ' killed';
        }

        if(killed > 0 && wounded > 0) {
            tweet += ' and ';
        }

        if (wounded > 0) {
            tweet += data.wounded;
            tweet += ' wounded';
        }

        tweet += ' in a mass shooting. ';
        tweet += data.date;
        tweet += ' in ';
        tweet += data.city;
        tweet += ', ';
        tweet += data.state;
        tweet += '. #justgunthings ';

        var sources = data.sources_semicolon_delimited.split(';');
        if(sources.length > 0){
            return url.shortenUrl(sources[0])
            .then(function(googl) {
                tweet += googl;
                resolve(tweet);
            })
            .catch(function(error) { reject(error); });
        }
        else{
            resolve(tweet);
        }
    });
}

module.exports.format = format;