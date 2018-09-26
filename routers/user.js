import Router from 'koa-router';
let router = new Router();

router.get('/', ctx => {
  ctx.body = "hello world"
})


export default router;