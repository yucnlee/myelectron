<template>
  <a-layout-sider class="sider">
    <!-- <a-row
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
    </a-row>-->
    <div class="sider-header">
      <span>盒子菜单</span>
    </div>
    <a-menu
      mode="inline"
      class="menu"
      :default-selected-keys="['0']"
      v-if="menuType === 1"
    >
      <a-menu-item
        v-for="(item, index) in menuList"
        class="dfsa"
        @click="openTbaleComponent(index)"
        :key="item.ip"
      >
        <span
          :class="{ circlegreen: checkindex.includes(index) }"
          class="dib circlered"
        ></span>
        <span class="dib">{{ item.name }}</span>
        <a-button
          size="small"
          type="primary"
          @click.self="triConnection(item.ip, item.port, index)"
          v-if="!checkindex.includes(index)"
          class="dib"
          :loading="loadingArr[index] == 1"
          >发送连接</a-button
        >
        <a-button
          size="small"
          type="primary"
          @click.self="triDisconnection(index)"
          v-if="checkindex.includes(index)"
          class="dib"
          >断开连接</a-button
        >
      </a-menu-item>
    </a-menu>
    <div class="side-bottom-div" @click="openAddBoxDialog">
      <a-icon type="plus"></a-icon>
      <span>添加盒子</span>
    </div>
    <addBoxDialog
      :visible="addBoxDialogVisible"
      @cancel="cancelAddBoxDialog"
      @ensure="ensureAddboxDialog"
    ></addBoxDialog>
  </a-layout-sider>
</template>

<script>
import addBoxDialog from "@/components/dialog/addBoxDialog";
import { sponsporedLinks, disconnect } from "@/api/index";
export default {
  components: {
    addBoxDialog,
  },
  data() {
    return {
      checkindex: [],
      loadingArr: [],
      testArr: ["hello", "world"],
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
    openAddBoxDialog() {
      this.addBoxDialogVisible = true;
    },
    cancelAddBoxDialog() {
      this.addBoxDialogVisible = false;
    },
    ensureAddboxDialog(obj) {
      let li = this.deepClone(obj);
      this.menuList.splice(0, this.menuList.length);
      this.menuList.push(li);
      for (let i = 0; i < this.menuList.length; i++) {
        this.menuList[i].key = i.toString();
      }
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
    triConnection(host, port, index) {
      this.$electron.ipcRenderer.send("connect", host, port, index);
      this.loadingArr.splice(index, 1, 1);
      console.log(this.loadingArr);
      this.$electron.ipcRenderer.once("connect", (event, index) => {
        this.checkindex.push(index);
        this.$set(this.loadingArr, index, 0);
        this.$message.success("连接成功");
      });
      this.$electron.ipcRenderer.once("error", () => {
        this.$message.error("连接失败,请确认盒子正常运行中");
        this.$set(this.loadingArr, index, 0);
      });
    },
    triDisconnection(index) {
      this.$electron.ipcRenderer.send("disConnect", index);
      this.$electron.ipcRenderer.on("disConnect", (event, index) => {
        let i = this.checkindex.findIndex((e) => {
          return e === index;
        });
        this.checkindex.splice(i, 1);
      });
    },
  },
  mounted() {
    this.loadingArr = this.menuList.map((e) => {
      return 0;
    });
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

.sider-header {
  height: 46px;
  margin: 0 0 4px 0;
  line-height: 46px;
  text-align: center;
  background-color: gray;
  color: #34c388;
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
.ant-menu {
  border-top: 1px solid #e8e8e8;
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
