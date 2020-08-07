const axios = require('axios');

function sponsporedLinks(host, port, index) {
  return axios({
    url: '/api/sponsporedLinks',
    method: 'post',
    data: {
      host,
      port,
      index,
    }
  })
}

function disconnect(index) {
  return axios({
    url: "/api/disconnect",
    method: "post",
    data: {
      index,
    },
  });
}

function send(index, code, msg) {
  return axios({
    url: "/api/send",
    method: "post",
    data: {
      index,
      code,
      msg,
    },
  });
}

export {
  sponsporedLinks,
  disconnect,
  send
}