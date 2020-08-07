<template>
  <div class="wrapper">
    <div>
      <a-button type="primary" @click="send">发送报文</a-button>
      <a-button type="primary" @click="connect">建立连接</a-button>
    </div>
    <div>
      <span>报文内容</span>
      <a-input v-model="msg" type="string"></a-input>
      <span>实际字节流</span>
      {{buffer}}
      <span>服务器返回内容{{onMsg}}</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: 0,
      onMsg: "",
    };
  },
  methods: {
    connect() {},
    send() {
      this.$socket.emit("news", this.msg);
    },
  },
  created() {
    this.sockets.listener.subscribe("news", (data) => {
      this.onMsg = data;
    });
  },
  mounted() {
    this.$socket.emit("connect", "1");
  },
  sockets: {},
  computed: {
    buffer: function () {
      return this.stringToByte(this.msg);
    },
  },
};
</script>

<style>
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>