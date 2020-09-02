<template>
  <div class="page-wireless">
    <div class="sider-header">
      <div>
        <span>盒子菜单</span>
      </div>
      <div class="mode">
        <a-select class="modeselect" v-model="mode">
          <a-select-option value="1">有线</a-select-option>
          <a-select-option value="2">无线</a-select-option>
        </a-select>
      </div>
    </div>
    <a-menu
      mode="inline"
      class="menu"
      :default-open-keys="['sub2']"
      :default-selected-keys="['0']"
      v-if="menuType === 1"
    >
      <a-menu-item v-for="(item, index) in menuList" class="dfsa" :key="item.clientId">
        <span :class="{ circlegreen: checkindex.includes(index) }" class="dib circlered"></span>
        <span class="dib">{{ item.clientId }}</span>
        <a-button
          v-if="!checkindex.includes(index)"
          size="small"
          type="primary"
          @click="triConnection(item, index)"
          class="dib"
          :loading="loading"
        >发送连接</a-button>
        <a-button
          v-if="checkindex.includes(index)"
          size="small"
          type="primary"
          @click="triDisConnection(item, index)"
          class="dib"
        >断开连接</a-button>
      </a-menu-item>
    </a-menu>
    <div class="side-bottom-div" @click="openMqttPage">
      <a-icon type="plus"></a-icon>
      <span>增加mqtt连接</span>
    </div>
  </div>
</template>

<script>
import addBoxDialog from "@/components/dialog/addBoxDialog";
import { sponsporedLinks, disconnect } from "@/api/index";

const mqtt = require("mqtt");
export default {
  components: {
    addBoxDialog,
  },
  data() {
    return {
      checkindex: [],
      mode: "2",
      loading: false,
      // 设置menuitem status
      isOnone: true,
      isOntwo: false,
      isOnthree: false,
      menuType: 1,
      // 菜单组
      menuList: [],
      // 控制显隐
      addBoxDialogVisible: false,
    };
  },
  methods: {
    openTbaleComponent(index) {
      this.$store.commit("setMenuIndex", index);
    },
    deepClone(obj) {
      let cloneObj = Array.isArray(obj) ? [] : {};
      if (obj && typeof obj === "object") {
        for (var key in obj) {
          if (obj.hasOwnProperty(key)) {
            if (obj[key] && typeof obj[key] === "object") {
              cloneObj[key] = deepClone(obj[key]);
            } else {
              cloneObj[key] = obj[key];
            }
          }
        }
      }
      return cloneObj;
    },
    one() {
      this.isOnone = true;
      this.isOntwo = false;
      this.isOnthree = false;
      this.menuType = 1;
    },
    two() {
      this.isOnone = false;
      this.isOntwo = true;
      this.isOnthree = false;
      this.menuType = 2;
    },
    three() {
      this.isOnone = false;
      this.isOntwo = false;
      this.isOnthree = true;
      this.menuType = 3;
    },
    clickHome() {
      this.$router.push("/click");
    },
    async triConnection(item, index) {
      const url = "mqtt://" + item.host;
      const option = {
        clientId: item.clientId,
        username: item.userName,
        password: item.passWord,
        reconnectPeriod: 0,
        keepalive: 9000,
      };
      let client = await mqtt.connect(url, option);
      console.log(url, option);
      this.loading = true;
      client.on("connect", () => {
        this.checkindex.push(index);
        this.$store.commit("setClient", client);
        this.loading = false;
        this.$message.success("连接成功");
      });
      client.on("close", () => {
        let itemindex = this.checkindex.findIndex((e) => {
          return e == index;
        });
        this.checkindex.splice(itemindex, 1);
        this.loading = false;
        this.$message.error("连接错误,请确认输入信息无误");
      });
      client.on("packetreceive", (packetreceive) => {
        return console.log(packetreceive);
      });
      client.on("message", (topic, message) => {
        console.log(topic);
        console.log(message.toString());
      });
      console.log(client);
    },
    triDisConnection(item, index) {
      let itemindex = this.checkindex.findIndex((e) => {
        return e == index;
      });
      this.checkindex.splice(itemindex, 1);
      this.client.end(true);
    },
    openMqttPage() {
      this.$router.push("/addMqtt");
    },
  },
  computed: {
    client: function () {
      return this.$store.state.client;
    },
    mqttObj: function () {
      return this.$store.state.mqttObj;
    },
  },
  watch: {
    mqttObj: function (newval) {
      this.menuList.push(newval);
    },
    mode: function (val) {
      this.$store.commit("setMode", val);
    },
  },
};
</script>

<style lang="scss">
.pointer {
  &:hover {
    color: blueviolet;
    cursor: pointer;
  }
}

.circlegreen {
  background-color: green !important;
  border-radius: 50%;
  display: inline-block;
  width: 10px;
  height: 10px;
}

.circlered {
  background-color: red;
  border-radius: 50%;
  display: inline-block;
  width: 10px;
  height: 10px;
}

.dib {
  display: inline-block;
}

.dfsa {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0 !important;
}
</style>
<style lang="scss" scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.page-wireless {
  position: relative;
  height: 100%;
}
.sider-header {
  height: 46px;
  margin: 0 0 4px 0;
  line-height: 46px;
  text-align: center;
  background-color: gray;
  color: #34c388;
  display: flex;
  justify-content: space-around;
}

.ant-menu {
  border-top: 1px solid #e8e8e8;
}
body {
  font-family: "Source Sans Pro", sans-serif;
}

#wrapper {
  background: radial-gradient(
    ellipse at top left,
    rgba(255, 255, 255, 1) 40%,
    rgba(229, 229, 229, 0.9) 100%
  );
  height: 100vh;
  width: 100vw;
}

.ant-layout {
  height: 100%;
}

.ant-layout-header {
  background-color: white;
}

.ant-layout-sider {
  height: 100%;
  background-color: white;
}

.wrapper-header {
  background-color: white;
  line-height: 40px;
  border-bottom: 0.5px solid gray;
}

.side-bottom {
  position: absolute;
  bottom: 1px;
  width: 100%;
  line-height: 40px;
  font-size: 20px;
  border-top: 1px solid gray;
}

.side-bottom-div {
  text-align: center;
  line-height: 40px;
  position: absolute;
  width: 100%;
  bottom: 0;
  border-top: 1px solid gray;
  background-color: #34c388;
  color: whitesmoke;
  cursor: pointer;
}

.helpinfo span {
  margin: 0 10px;
}

.on {
  background-color: cadetblue;
}

.one,
.two,
.three {
  cursor: pointer;
}
</style>
