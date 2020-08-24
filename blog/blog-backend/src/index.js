import dotenv from 'dotenv';
import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import mongoose from 'mongoose';
import jwtMiddleware from './lib/jwtMiddleware.js';
import serve from 'koa-static';
import path from 'path';
import send from 'koa-send';

import api from './api/index.js';

dotenv.config();

const { PORT, MONGO_URI } = process.env;
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useFindAndModify: false })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((e) => {
    console.error(e);
  });

const app = new Koa();
const router = new Router();

router.use('/api', api.routes()); //api 라우트 적용

// 라우터 적용 전에 bodyParser 적용
app.use(bodyParser());

app.use(jwtMiddleware);
//app 인스턴스에 라우터 적용

app.use(router.routes()).use(router.allowedMethods());
let __dirname = path.resolve();
const buildDirectory = path.resolve(__dirname, '../blog-frontend/build');
app.use(serve(buildDirectory));
app.use(async (ctx) => {
  if (ctx.status === 404 && ctx.path.indexOf('/api') !== 0) {
    await send(ctx, 'index.html', { root: buildDirectory });
  }
});

const port = PORT || 4000;
app.listen(port, () => {
  console.log('Listening to port %d', port);
});
