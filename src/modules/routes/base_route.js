/**
 * Created by akito on 10/11/15.
 */
import Router from 'koa-router';

export default class BaseRoute {
  constructor() {
    this.router = new Router();
  }
  middleware() {
    return this.router.middleware();
  }
}
