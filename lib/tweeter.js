var Promise = require('bluebird');
var env = require('dotenv').config();
var Twitter = require('twitter');

var client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

var tweet = function(tweet) {
    return new Promise(function(resolve, reject) {
        client.post('status/update', { status: tweet })
        .then(function(tweet) { resolve(tweet); })
        .catch(function(error) { reject(); });
    });
}

module.exports.tweet = tweet;
