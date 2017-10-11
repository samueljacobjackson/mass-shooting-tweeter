require('dotenv').config();

var Promise = require('bluebird');
var googl = require('goo.gl');

googl.setKey(process.env.GOOGLE_DEV_KEY);

var shortenUrl = function(url) {
    return new Promise(function(resolve, reject) {
        googl.shorten(url)
        .then(function(shortUrl) { resolve(shortUrl); })
        .catch(function(error) { reject(error); });
    });
}

module.exports.shortenUrl = shortenUrl;