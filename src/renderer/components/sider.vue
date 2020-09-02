<template>
  <div class="side">
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
    <el-menu mode="inline" class="menu" v-if="menuType === 1">
      <el-menu-item v-for="(item, index) in menuList" class="dfsa" :key="item.ip">
        <span :class="{ circlegreen: checkindex.includes(index) }" class="dib circlered"></span>
        <span class="dib">{{ item.name }}</span>
        <el-button
          size="middle"
          type="primary"
          @click="triConnection(item.ip, item.port, index)"
          v-if="!checkindex.includes(index)"
          class="dib"
          :loading="loadingArr[index] == 1"
        >发送连接</el-button>
        <el-button
          size="small"
          type="primary"
          @click="triDisconnection(index)"
          v-if="checkindex.includes(index)"
          class="dib"
        >断开连接</el-button>
      </el-menu-item>
    </el-menu>
    <div class="side-bottom" @click="openAddBoxDialog">
      <i class="el-icon-plus"></i>
      <span>添加盒子</span>
    </div>
    <addBoxDialog
      :visible="addBoxDialogVisible"
      @cancel="cancelAddBoxDialog"
      @ensure="ensureAddboxDialog"
    ></addBoxDialog>
  </div>
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
      mode: "",
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
      console.log("connect++++");
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
      console.log("dicconnect");
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
    this.mode = "1";
  },
  watch: {
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

body {
  font-family: "Source Sans Pro", sans-serif;
}

.side {
  position: relative;
  height: 100%;
}

.side-bottom {
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
  display: flex;
  justify-content: space-around;
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

.wrapper-header {
  background-color: white;
  line-height: 40px;
  border-bottom: 0.5px solid gray;
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

<style>
.modeselect .ant-select-selection {
  border: 0;
  border-radius: 0;
  box-shadow: 0px 0px 0px 0px;
  color: green;
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 3px;
  background-color: gray;
}
</style>
