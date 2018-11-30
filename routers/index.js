import Router from 'koa-router';
import userRouter from './user';
import adminRouter from './admin';

let router = new Router();

router.use('/music/api', userRouter.routes());
router.use('/music/api/admin', adminRouter.routes());

export default (app) => {
  app.use(router.routes())
}