<template>
  <a-layout-sider class="sider">
    <a-input placeholder="请输入FBox序列号,端口号" style="margin: 10px 0;">
      <a-icon type="search" slot="suffix" style="cursor:pointer;"></a-icon>
    </a-input>
    <a-row
      type="flex"
      justify="space-around"
      style="line-height:30px;font-size:20px;text-align:center;background-color:WhiteSmoke;"
    >
      <a-col :span="6" :class="{ on: isOnone }" class="one" @click="one">
        <a-icon type="menu-unfold"></a-icon>
      </a-col>
      <a-col :span="6" class="two" :class="{ on: isOntwo }" @click="two">
        <a-icon type="heart"></a-icon>
      </a-col>
      <a-col :span="6" class="three" :class="{ on: isOnthree }" @click="three">
        <a-icon type="warning"></a-icon>
      </a-col>
    </a-row>
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
          @click.self="triConnection(item,index)"
          class="dib"
        >发送连接</a-button>
        <a-button
          v-if="checkindex.includes(index)"
          size="small"
          type="primary"
          @click.self="triDisConnection(item,index)"
          class="dib"
        >断开连接</a-button>
      </a-menu-item>
    </a-menu>
    <!-- <a-menu mode="inline" theme="dark" class="menu" v-if="menuType === 2"></a-menu>
    <a-menu mode="inline" theme="dark" class="menu" v-if="menuType === 3"></a-menu>-->

    <!-- <a-row type="flex" justify="space-around" class="side-bottom">
      <a-col>
        <a-dropdown>
          <a-icon type="plus" class="pointer"></a-icon>
          <a-menu slot="overlay">
            <a-menu-item @click.native="openAddBoxDialog" key="001">
              <a-icon type="plus"></a-icon>添加FBOX
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </a-col>
      <a-col>
        <a-icon type="folder" class="pointer"></a-icon>
      </a-col>
      <a-col>
        <a-icon type="user" class="pointer"></a-icon>
      </a-col>
      <a-col>
        <a-icon type="setting" class="pointer"></a-icon>
      </a-col>
      <a-col>
        <a-icon type="home" class="pointer" @click="clickHome"></a-icon>
      </a-col>
    </a-row>-->
    <div class="side-bottom-div" @click="openMqttPage">
      <a-icon type="plus"></a-icon>
      <span>增加mqtt连接</span>
    </div>
  </a-layout-sider>
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
      // 设置menuitem status
      isOnone: true,
      isOntwo: false,
      isOnthree: false,
      menuType: 1,
      // 菜单组
      menuList: [
        {
          host: "39.98.183.135",
          port: "1883",
          clientId: "10102020080001",
          userName:
            "highSpeedSheetMetalHydraulicPress|35490ef91bf3453b9c4c21520c26acb9",
          passWord: "00feb014dea94117982dced560fc0462",
        },
      ],
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
      // const url = "mqtt://39.98";
      const option = {
        // port: 1883,
        // username:
        //   "highSpeedSheetMetalHydraulicPress|35490ef91bf3453b9c4c21520c26acb9",
        // password: "00feb014dea94117982dced560fc0462",
        // clientId: "10102020080001",
        reconnectPeriod: 0,
        keepalive: 9000,
      };
      let client = await mqtt.connect(url, option);
      client.publish("/topic/hello", "hello");
      client.on("reconnect", function (error) {
        console.log("正在重连:", error);
      });
      client.on("error", (error) => {
        console.log("连接失败", error);
      });
      await client.on("connect", () => {
        console.log("publish");
        console.log("conect", client);
        this.checkindex.push(index);
      });
      client.on("close", () => {
        console.log("close");
        let itemindex = this.checkindex.findIndex((e) => {
          return e == index;
        });
        this.checkindex.splice(itemindex, 1);
        console.log(this.checkindex);
      });
      client.on("packetreceive", (packetreceive) => {
        return console.log(packetreceive);
      });
      client.on("message", (topic, message) => {
        console.log(topic);
        console.log(message.toString());
      });
      console.log(client);
      this.$store.commit("setClient", client);
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
