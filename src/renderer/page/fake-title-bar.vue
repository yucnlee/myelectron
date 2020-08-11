<template>
  <div class="fake-title-bar">
    <div class="handle-bar">
      <span class="imgwrap">
        <img src="@/assets/logo.png" />
      </span>
      <span class="name">3H1终端管理</span>
    </div>

    <div class="handle-bar">
      <div class="mode">
        <a-select class="modeselect handle-bar" v-model="mode">
          <a-select-option value="1">有线</a-select-option>
          <a-select-option value="2">无线</a-select-option>
        </a-select>
      </div>
      <div @click="minimizeWin" class="remote">
        <i class="el-icon-minus" style="font-size:16px;"></i>
      </div>
      <div @click="maximizeWin" class="remote">
        <i class="el-icon-full-screen"></i>
      </div>
      <div @click="closeWin" class="remote">
        <i class="el-icon-close" style="font-size:16px;"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { remote } from "electron";
export default {
  name: "fakeTitleBar",
  data() {
    return {
      mode: "",
    };
  },
  methods: {
    minimizeWin() {
      remote.getCurrentWindow().minimize(); // 窗口最小化
    },
    maximizeWin() {
      const win = remote.getCurrentWindow();
      if (win.isMaximized()) {
        // 判断 窗口是否已最大化
        win.restore(); // 恢复原窗口大小
      } else {
        win.maximize(); //最大化窗口
      }
    },
    closeWin() {
      remote.getCurrentWindow().close(); // 关闭窗口，也结束了所有进程
    },
  },
  mounted() {
    this.mode = "1";
  },
  watch: {
    mode: function(val) {
      this.$store.commit("setMode", val);
    },
  },
};
</script>

<style lang="scss" scoped>
.fake-title-bar {
  display: flex;
  justify-content: space-between;
  // position: absolute;
  // top: 0;
  width: 100%;
  line-height: 40px;
  height: 40px;
  padding: 0 15px;
  background-color: white;
  -webkit-app-region: drag;
}

.handle-bar {
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  -webkit-app-region: no-drag;

  .remote {
    width: 40px;
    height: 100%;
    text-align: center;
    &:hover {
      background-color: gray;
    }
    i {
      color: #515e6c;
    }
    .square {
      display: inline-block;
      margin-top: 8px;
      width: 14px;
      height: 14px;
      border: 1px solid white;
    }
  }
  img {
    font-size: 0;
    width: 20px;
    height: 20px;
    vertical-align: middle;
    line-height: 0;
    margin-right: 15px;
  }
}
.mode {
  margin-right: 70px;
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
  background-color: white;
}

.imgwrap {
  display: flex;
  align-items: center;
}

.bar-right {
  display: flex;
  justify-content: flex-start;
}
.name {
  color: #515e6c;
}
</style>
