/**
 * Created by akito on 10/11/15.
 */
import BaseRoute from './base_route';
import _ from 'underscore';
const slackClient = require.main.exports.slackClient;
const elasticClient = require.main.exports.elasticClient;

export default class ApiRoute extends BaseRoute {
  constructor(options) {
    super();
    this.initRoute();
  }
  initRoute() {
    this.router.get('/ping', ping);
    this.router.get('/channel', getChannels);
    this.router.post('/registerChannel', this.body, registerChannel);
    this.router.get('/message/:channelId', this.body, getMessage);
    this.router.post('/message', this.body, postMessage);
  }
}

function* ping(next) {
  this.type = 'json';
  this.body = {version: 'v1', message: 'ok'};
  console.log('alive check');
  yield next;
}

function* getChannels(next) {
  this.type = 'json';
  const channels = yield slackClient.channelList();
  this.body = channels
  yield next;
}

function *registerChannel(next) {
  this.type = 'json';
  const channelId = this.request.body.channelId;
  const channel = yield slackClient.channelInfo(channelId);

  yield next;
}

function *getMessage(next) {
  this.type = 'json';

  const option = {
    index: 'message',
    type: this.params.channelId,
    body: {
      from: 0,
      size: 100
    }
  }

  this.body = yield elasticClient.search(option);

  yield next;
}

function *postMessage(next) {
  this.type = 'json';
  const request = this.request.body;

  const doc = {
    index: 'message',
    type: request.channel_id,
    body: {
      user_name: request.user_name,
      text: request.text,
      mentioned_at: request.timestamp
    }
  };

  this.body = yield elasticClient.index(doc);

  yield next;
}

