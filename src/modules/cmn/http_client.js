import request from 'request';
import _ from 'underscore';

export default class HttpClient {
  constructor(options) {
    this.endpoint = options.endpoint;
    this.authToken = options.authToken;
    this.request = request;
  }

  get(options) {
    const self = this;
    options.params = options.params || {};

    return new Promise((resolve, reject) => {
      let url = self.endpoint + options.uri + '?token=' + self.authToken;

      _.map(options.params, (k, v) => {
        url += '&' + k + '=' + v;
      });

      self.request.get(url, (err, response) => {
        if (err) {
          return reject(err);
        }
        resolve(response);
      });
    });
  }

  post(options, param) {
    const self = this;
    return new Promise((resolve, reject) => {
      self.request.post(self.endpoint + options.uri, (err, response) => {
        if (err) {
          return reject(err);
        }
        resolve(response);
      });
    });
  }
}
