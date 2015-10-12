import path from 'path';

import koa from 'koa';
import serve from 'koa-static';
import mount from 'koa-mount';
import logger from 'koa-json-logger';

import ApiRoute from './modules/routes/api_route';
import slackClientInitializer from './modules/cmn/slack_client';

const app = koa();

const apiRoute = new ApiRoute();

// static files
app.use(serve(path.resolve(__dirname, 'public')));

// logger
/*
app.use(logger({
  name: 'slack-logger',
  path: 'logs',
  jsonapi: true
}));
*/

// routes
app.use(mount('/v1', apiRoute.middleware()));

app.listen(3000);
