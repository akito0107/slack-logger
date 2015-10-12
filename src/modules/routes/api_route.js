/**
 * Created by akito on 10/11/15.
 */
import BaseRoute from './base_route';
import koaBody from 'koa-body';
const slackClient = require.main.exports.slackClient;

export default class ApiRoute extends BaseRoute {
  constructor(options) {
    super();
    this.initRoute();
  }
  initRoute() {
    this.router.get('/ping', ping);
    this.router.get('/channel', getChannels);
    this.router.post('/registerChannel', koaBody, registerChannel);
    this.router.get('/getMessage', koaBody, getMessage);
  }
}

function* ping(next) {
  this.type = 'json';
  this.body = {version: 'v1', message: 'ok'};
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
  const channelId = this.request.body.channelId;

  yield next;
}
