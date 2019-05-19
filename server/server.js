const Koa = require('koa');
const KoaRouter = require('koa-router');
const http = require('http');

// 初始化
const app = new Koa();
const server = http.createServer(app.callback())；
const io = require('socket.io')(server);
const router = new KoaRouter();
const OnlineChat = require('./OnlineChat');
const redis = require('./middleware/redis');

const oc = new OnlineChat(io);
oc.init();
// 配置
const PORT = 1123;

app.use(redis());

// 绑定路由
app.use(router.routes()).use(router.allowedMethods());

router.get('/', async function (ctx, next) {
  ctx.body = "123";
});


server.listen(PORT, function () {
  console.log("http://127.0.0.1:" + PORT);
});