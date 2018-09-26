import Router from 'koa-router';
import userRouter from './user';

let router = new Router();

router.use('/', userRouter.routes());


export default (app) => {
  app.use(router.routes())
}