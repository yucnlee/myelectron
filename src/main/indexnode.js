//  node serve
const Koa = require('koa');
const app = new Koa();
const Router = require('koa-router');
const body = require('koa-bodyparser')
const router = new Router();
app.use(body());
let socketArr = [];
// 接口配置 发起连接 接口
router.post('/sponsporedLinks', (ctx, next) => {
    let body = ctx.request.body;
    let socket = sponsoredLinks(body.host, parseInt(body.port));
    socketArr[body.index] = socket;
    if (socket.connecting === true) {
        ctx.body = {
            index: body.index,
        }
    }
    next();
})
// 断开连接接口
router.post('/disconnect', (ctx) => {
    let body = ctx.request.body;
    console.log(ctx.request.body)

    if (socketArr[body.index].connecting === true) {
        // socketArr[body.index].end();
        console.log(socketArr[body.index].connecting);
        ctx.body = {
            index: body.index,
        }
    } else {
        ctx.body = {
            index: body.index,
        }
    }
})
//  发送接口
router.post('/send', (ctx) => {
    let body = ctx.request.body;
    console.log(body)
    // let code = body.code;
    // console.log(code)
    let buf1 = Buffer.from('020')
    let buf2 = Buffer.from(body.msg);
    let buf = Buffer.concat([buf1, buf2]);
    console.log(buf)
    socketArr[body.index].write(buf);
    ctx.status = 200;

})

function intToByte4(i) {
    var targets = [];
    targets[0] = (i & 0xFF);
    targets[1] = (i >> 8 & 0xFF);
    targets[2] = (i >> 16 & 0xFF);
    targets[3] = (i >> 24 & 0xFF);
    return targets;
}

app.use(router.routes())

app.listen(3000, () => {
    console.log('serve is running at http://127.0.0.1:3000');
})

//  建立socket函数
const net = require('net');
const {
    connect
} = require('http2');
let Socket = net.Socket;

function sponsoredLinks(host, port) {
    let socket = new Socket().connect(port, host);
    console.log(host, port)
    socket.on('data', (data) => {
        console.log("return", Buffer.from(data).toString())
    })
    return socket
}