/**
 * Created by akito on 10/11/15.
 */
import Router from 'koa-router';
import koaBody from 'koa-body';

export default class BaseRoute {
  constructor() {
    this.router = new Router();
    this.body = koaBody();
  }
  middleware() {
    return this.router.middleware();
  }
}
