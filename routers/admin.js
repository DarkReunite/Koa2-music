import Router from 'koa-router';
import Admin from '../controllers/admin/admin';
let router = new Router();

router.post('/uploadFile', Admin.receiveFile);
router.post('/uploadInfo', Admin.receiveInfo);

router.get('/list/total/page', Admin.getTotalPage);
router.get('/list/:page', Admin.getMp3List)
export default router;