import koa from 'koa';
import fs from 'fs';
import logger from 'koa-logger';
import cors from '@koa/cors';
import range from 'koa-range';
import koaBody from 'koa-body';
import KoaStatic from 'koa-static';
import path from 'path';
import router from './routers/index';
import {port} from './config/index';
import checkDir from './config/checkDir';
import db from './DB/db';
import { runInNewContext } from 'vm';

const app = new koa();

// 静态资源目录对于相对入口文件index.js的路径
const staticPath = './public'


app.use(logger());

app.use(range);

//mp3文件读取中间件
app.use( async (ctx, next) => {

  if ( path.extname(ctx.request.url) == '.mp3') {
    let mp3Path = './public' + ctx.request.url;
    ctx.body = fs.readFileSync(mp3Path);
  } else {
    return next();
  }
})


app.use(KoaStatic(
  path.join(__dirname, staticPath), 
  {
    maxage: 1000 * 60 * 60 //1h
  }
))
  
//设置文件上传
app.use(koaBody({
  multipart: true,
  formidable: {
    maxFileSize: 1024*1024*20, //设置可接受的文件最大为20M
    uploadDir: path.join(__dirname, 'uploads'),
  }

}))

// 设置跨域
app.use(cors());

router(app);

app.listen(port, () => console.log(`✅  The server is running at http://localhost:${port}/`));
