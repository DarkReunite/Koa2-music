import Router from 'koa-router';
import User from '../controllers/user/user';

let router = new Router();

router.get('/', ctx => {
  ctx.body = "hello world"
})

router.get('/mp3/list', User.getMp3List);

export default router;