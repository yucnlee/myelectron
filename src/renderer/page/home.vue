<template>
  <div id="wrapper">
    <a-layout>
      <div class="wrapper-header">
        <el-row type="flex" justify="space-between">
          <el-col :span="12" class="helpinfo">
            <span>帮助文档</span>
            <span>学习平台</span>
            <span>API文档</span>
          </el-col>
          <el-col :span="3">
            <a-select v-model="mode" style="width:100%;marging-right:30px;">
              <a-select-option value = '1'>有线</a-select-option>
              <a-select-option value = '2'>无线</a-select-option>
            </a-select>
          </el-col>
        </el-row>
      </div>
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

  export default {
    name: 'home-page',
    data() {
      return {
        // 模式
        mode:'',
      }
    },
    methods: {
      open(link) {
        this.$electron.shell.openExternal(link)
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
                cloneObj[key] = obj[key]
              }
            }
          }
        }
        return cloneObj;
      },
    },
    mounted() {
      this.mode = '1';
    },
    watch: {
      mode: function (val) {
        if (val === '1') {
          this.$router.push('/');
        }else if (val === '2') {
          this.$router.push('/mqtt');
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Source Sans Pro', sans-serif;
  }

  #wrapper {
    background:
      radial-gradient(ellipse at top left,
        rgba(255, 255, 255, 1) 40%,
        rgba(229, 229, 229, .9) 100%);
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
    border-bottom: .5px solid gray;

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
    background-color: green!important;
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

  .dib{
    display: inline-block;
  }
  .dfsa{
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding:0!important;
  }
</style>