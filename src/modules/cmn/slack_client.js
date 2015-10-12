/**
 * Created by akito on 10/12/15.
 */
import HttpClient from './http_client';
import co from 'co';

export default class SlackClient {
  constructor(options) {
    this.httpclient = new HttpClient(options.httpclient);
  }

  channelList() {
    const self = this;
    const options = {uri: 'channels.list'}
    return self.httpclient.get(options).then((response) => {
      const body = JSON.parse(response.body);

      if (!body.ok) {
        return new Error('Slack API is unavailable');
      }

      return body.channels;
    }, (err) => {
      throw new Error(err);
    });
  }

  channelInfo(channelId) {
    const options = {
      uri: 'channels.info',
      params: {
        channel: channelId
      }
    };
    return self.httpclient.get(options).then((response) => {
      const body = JSON.parse(response.body);

      if (!body.ok) {
        return new Error('Slack API is unavailable');
      }

      return body.channel;
    }, (err) => {
      throw new Error(err);
    });
  }
}
