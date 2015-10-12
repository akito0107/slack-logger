require('babel/register');

const SlackClient = require('./modules/cmn/slack_client');
const ElasticClient = require('./modules/cmn/elastic_client');

const options = {
  slack: {
    httpclient: {
      endpoint: 'https://slack.com/api/',
      authToken: ''
    }
  },
  elastic: {
    client: {
      host: 'localhost:9200',
      log: 'trace'
    }
  }
};

exports.slackClient = new SlackClient(options.slack);
exports.elasticClient = new ElasticClient(options.elastic);

require('./server.js');