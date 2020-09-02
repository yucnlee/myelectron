const ipcMain = require("electron").ipcMain;

let socketArr = [];

ipcMain.on("ping", () => {
    console.log("on connect")
})

ipcMain.on("connect", (event, host, port, index) => {
    let socket = sponsoredLinks(host, port)
    console.log("host")

    socket.on("connect", () => {
        event.sender.send("connect", index)
        socketArr[index] = socket;
    })
    socket.on("error", (error) => {
        event.sender.send("error")
    })
    socket.on('end', () => {
        console.log("end")
    })
})

ipcMain.on("disConnect", (event, index) => {
    if (socketArr[index].destroyed === true) {
        event.sender.send("disConnect", index)
    } else {
        socketArr[index].destroy()
        event.sender.send("disConnect", index)

    }
})

ipcMain.on("sendMsg", (event, index, code, msg) => {
    let buf1 = Buffer.from(code);
    let buf2 = Buffer.from(msg);
    let buf = Buffer.concat([buf1, buf2]);
    socketArr[index].write(buf);
})

const net = require('net');
let Socket = net.Socket;

function sponsoredLinks(host, port) {
    let socket = new Socket().connect(port, host);
    console.log(host, port)
    socket.on('data', (data) => {
        console.log("return", Buffer.from(data).toString())
    })
    return socket
}