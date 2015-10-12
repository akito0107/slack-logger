'use strict';

const co = require('co');
const request = require('request');
const _ = require('underscore');

function get(options) {
  return new Promise((resolve, reject) => {
    let url = options.endpoint + options.uri + '?token=' + options.authToken;

    _.map(options.params, (k, v) => {
      url += '&' + k + '=' + v;
    });

    request.get(url, (err, response, body) => {
      if (err) {
        return reject(err);
      }
      resolve(body);
    });
  });
}

function parse() {
  return new Promise((resolve, reject) => {

  });
}


const options = {
  endpoint: 'https://slack.com/api/',
  uri: 'channels.list',
  authToken: 'xoxp-12215924259-12218075861-12289324356-1b0b3e2e9d',
  params: {}
};

function onerror(err) {
  console.log(err);
}

co(function* () {
  const res = yield get(options);
  const json = JSON.parse(res);
  console.log('co==================');
  console.log(json);
  return json;
}).catch(onerror);





get(options).then(function(res) {
  return res;
}).then(function(res){
  const json = JSON.parse(res);
  console.log(json);
});


