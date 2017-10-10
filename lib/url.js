var Promise = require('bluebird');
var env = require('dotenv').config();
var googl = require('goo.gl');

googl.setKey(process.env.GOOGL_DEV_KEY);

var shortenUrl = function(url) {
    return new Promise(function(resolve, reject) {
        googl.shorten(url)
        .then(function(shortUrl) { resolve(shortUrl); })
        .catch(function(error) { reject(); });
    });
}

module.exports.shortenUrl = shortenUrl;