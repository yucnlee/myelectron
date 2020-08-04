const axios = require('axios');
let url = 'http://127.0.0.1:3000'

 function sponsporedLinks(host,port,index) {
     return axios({
        url: url +'/sponsporedLinks',
        method:'post',
        data:{
            host,
            port,
            index,
        }
     })
}

function disconnect(index) {
    return axios({
      url: url + "/disconnect",
      method: "post",
      data: {
        index,
      },
    });
}

function send(index,msg) {
    return axios({
      url: url + "/send",
      method: "post",
      data: {
        index,
        msg,
      },
    });
}

export {sponsporedLinks, disconnect, send}