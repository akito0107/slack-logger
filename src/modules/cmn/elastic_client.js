/**
 * Created by akito on 10/11/15.
 */
import Elasticsearch from 'elasticsearch';

export default class ElasticClient {
  constructor(options) {
    this.client = new Elasticsearch.Client(options.client);
  }
  index(doc) {

  }
}
