const Koa = require('koa');
const KoaRouter = require('koa-router');
const http = require('http');

// 初始化
const app = new Koa();
const server = http.createServer(app.callback())
const io = require('socket.io')(server);
const router = new KoaRouter();
const OnlineChat = require('./OnlineChat');

const oc = new OnlineChat(io);
oc.init();
// 配置
const PORT = 1123;

// 绑定路由
app.use(router.routes())

router.get('/', async function (ctx, next) {
  ctx.body = "123";
});


server.listen(PORT, function () {
  console.log("http://0.0.0.0:" + PORT);
});