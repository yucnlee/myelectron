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
                onMsg: '',
            }
        },
        methods: {
            connect() {

            },
            send() {
                this.$socket.emit("news", this.msg)
            },
            //字符串转byte数组
            stringToByte: function (str) {
                var bytes = new Array();
                var len, c;
                len = str.length;
                for (var i = 0; i < len; i++) {
                    c = str.charCodeAt(i);
                    if (c >= 0x010000 && c <= 0x10FFFF) {
                        bytes.push(((c >> 18) & 0x07) | 0xF0);
                        bytes.push(((c >> 12) & 0x3F) | 0x80);
                        bytes.push(((c >> 6) & 0x3F) | 0x80);
                        bytes.push((c & 0x3F) | 0x80);
                    } else if (c >= 0x000800 && c <= 0x00FFFF) {
                        bytes.push(((c >> 12) & 0x0F) | 0xE0);
                        bytes.push(((c >> 6) & 0x3F) | 0x80);
                        bytes.push((c & 0x3F) | 0x80);
                    } else if (c >= 0x000080 && c <= 0x0007FF) {
                        bytes.push(((c >> 6) & 0x1F) | 0xC0);
                        bytes.push((c & 0x3F) | 0x80);
                    } else {
                        bytes.push(c & 0xFF);
                    }
                }
                return bytes;
            },
        },
        created() {
            this.sockets.listener.subscribe('news', (data) => {
                this.onMsg = data;
            })
        },
        mounted() {
            this.$socket.emit('connect', "1")
        },
        sockets: {
        },
        computed: {
            buffer: function () {
                return this.stringToByte(this.msg);
            }
        }
    }
</script>

<style>
    .wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
    }
</style>