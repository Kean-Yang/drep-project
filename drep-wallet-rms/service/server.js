const Koa = require('koa');
const app = new Koa();
const static = require('koa-static');
// const bodyParser = require('koa-bodyparser');
// const routers = require('./routers/routers');
// const config = require('../config');
// const session = require('koa-session-minimal');
const redisStore = require('koa-redis')
// const redis = require('./utils/redis')
// const log = require('./utils/log')

const logger = async (ctx, next)=>{
  log.info(`[uid: ${ctx.session.uid}] ${ctx.request.method}, ${ctx.request.url}`);
  await next();
}
const handler = async (ctx, next)=>{
  try {
    await next();
  } catch (error) {
    ctx.response.status = error.statusCode || error.status || 500;
    ctx.response.body = {
      message: error.message
    };
  }
}
// 配置存储session信息的redis
const store = new redisStore({
  client: redis
});


// app.use(bodyParser());
// app.use(session({
//   key: 'SESSION_ID',
//   store: store,
//   cookie: {// 存放sessionId的cookie配置
//     maxAge: 24*3600*1000, // cookie有效时长
//     expires: '',  // cookie失效时间
//     path: '/', // 写cookie所在的路径
//     domain: config.domain, // 写cookie所在的域名
//     httpOnly: '', // 是否只用于http请求中获取
//     overwrite: '',  // 是否允许重写
//     secure: '',
//     sameSite: '',
//     signed: '',
//   }
// }));

// app
// .use(logger)//处理log
// .use(handler)//处理出错信息
// .use(static(config.staticPath));//配置静态资源路径
// app
// .use(routers.routes())
// .use(routers.allowedMethods());//注册路由

// app.listen(config.port, ()=>{
//   log.info('server is running on port:'+config.port);
// });

