/**
 * Created by akito on 10/11/15.
 */
import Elasticsearch from 'elasticsearch';
import _ from 'underscore';

export default class ElasticClient {
  constructor(options) {
    this.client = new Elasticsearch.Client(options.client);
  }
  index(doc) {
    const self = this;
    return this.client.index(doc);
  }
  search(options) {
    const self = this;
    return this.client.search(options).then((response) => {
      if (!response.hits) {
        return [];
      }
      const docs = response.hits.hits;
      return _.map(docs, (doc) => {
        return {
          user_name: doc._source.user_name,
          text: doc._source.text,
          mentioned_at: doc._source.mentioned_at
        };
      });
    }, (err) => {
      throw new Error(err);
    });
  }
}
