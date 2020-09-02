<template>
  <div id="wrapper">
    <el-container>
      <el-header>
        <fakeTitleBar></fakeTitleBar>
      </el-header>
      <el-container>
        <el-aside>
          <router-view name="sider"></router-view>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import fakeTitleBar from "@/page/fake-title-bar";
export default {
  name: "home-page",
  components: {
    fakeTitleBar,
  },
  data() {
    return {};
  },
  methods: {
    open(link) {
      this.$electron.shell.openExternal(link);
    },
    //深拷贝
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
  },
  computed: {
    mode: function () {
      return this.$store.state.mode;
    },
  },
  mounted() {},
  watch: {
    mode: function (val) {
      if (val === "1") {
        this.$router.push("/");
      } else if (val === "2") {
        this.$router.push("/mqtt");
      }
    },
  },
};
</script>

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
.el-container {
  height: 100%;
}
.el-header {
  height: 40px !important;
}
.el-aside {
  width: 250px !important;
}
.el-main {
  height: 100%;
  display: flex;
}

.side-bottom {
  position: absolute;
  bottom: 0;
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

<style lang="scss">
.pointer {
  &:hover {
    color: blueviolet;
    cursor: pointer;
  }
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