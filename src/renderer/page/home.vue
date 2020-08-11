<template>
  <div id="wrapper">
    <a-layout>
      <fakeTitleBar></fakeTitleBar>
      <a-layout>
        <router-view name="sider"></router-view>
        <a-layout>
          <router-view></router-view>
        </a-layout>
      </a-layout>
    </a-layout>
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