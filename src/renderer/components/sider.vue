<template>
  <a-layout-sider class="sider">
    <a-input placeholder="请输入FBox序列号,端口号" style="margin: 10px 0;">
      <a-icon type="search" slot="suffix" style="cursor:pointer;"></a-icon>
    </a-input>
    <a-row type="flex" justify="space-around"
      style="line-height:30px;font-size:20px;text-align:center;background-color:WhiteSmoke;">
      <a-col :span="6" :class="{on:isOnone}" class="one" @click="one">
        <a-icon type="menu-unfold"></a-icon>
      </a-col>
      <a-col :span="6" class="two" :class="{on:isOntwo}" @click="two">
        <a-icon type="heart"></a-icon>
      </a-col>
      <a-col :span="6" class="three" :class="{on:isOnthree}" @click="three">
        <a-icon type="warning"></a-icon>
      </a-col>
    </a-row>
    <a-menu mode="inline" class="menu" :default-open-keys="['sub2']" :default-selected-keys="['0']"
      v-if="menuType === 1">
      <a-sub-menu key="sub1" title="默认组">
        <a-menu-item key="01">默认组</a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="sub2" class="submenu">
        <span slot="title">水泥设计</span>
        <a-menu-item v-for="(item,index) in menuList" class="dfsa" @click="openTbaleComponent(index)" :key='item.ip'>
          <span :class="{circlegreen:checkindex.includes(index)}" class="dib circlered"></span>
          <span class="dib">{{item.name}}</span>
          <a-button size="small" type="primary" @click.self="triConnection(item.ip,item.port,index)"
            v-if="!checkindex.includes(index)" class="dib">
            发送连接
          </a-button>
          <a-button size="small" type="primary" @click.self="triDisconnection(index)" v-if="checkindex.includes(index)"
            class="dib">
            断开连接
          </a-button>
        </a-menu-item>
      </a-sub-menu>
    </a-menu>
    <a-menu mode="inline" theme="dark" class="menu" v-if="menuType === 2"></a-menu>
    <a-menu mode="inline" theme="dark" class="menu" v-if="menuType === 3"></a-menu>
    <a-row type="flex" justify="space-around" class="side-bottom">
      <a-col>
        <a-dropdown>
          <a-icon type="plus" class="pointer"></a-icon>
          <a-menu slot="overlay">
            <a-menu-item @click.native="openAddBoxDialog" key="001">
              <a-icon type="plus"></a-icon>
              添加FBOX
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
    </a-row>
    <addBoxDialog :visible="addBoxDialogVisible" @cancel="cancelAddBoxDialog" @ensure="ensureAddboxDialog">
    </addBoxDialog>
  </a-layout-sider>
</template>

<script>
  import addBoxDialog from '@/components/dialog/addBoxDialog';
  import { sponsporedLinks, disconnect } from "@/api/index";
  export default {
    components:{
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
        menuList: [{
            key: '0',
            name: '李金玉pc',
            ip: '192.168.235.1',
            port: '8234',
          },
          {
            key: "1",
            name: '高金鑫pc',
            ip: '192.168.4.42',
            port: '10002',
          }
        ],
        // 控制显隐 
        addBoxDialogVisible: false,

      }
    },
    methods: {
      openTbaleComponent(index) {
        this.$store.commit('setMenuIndex', index);
      },
      openAddBoxDialog() {
        this.addBoxDialogVisible = true;
      },
      cancelAddBoxDialog() {
        this.addBoxDialogVisible = false;
      },
      ensureAddboxDialog(obj) {
        let li = this.deepClone(obj);
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
                cloneObj[key] = obj[key]
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
        this.$router.push('/click');
      },
      async triConnection(host,port,index) {
        let res = await sponsporedLinks(host,port,index);
        this.checkindex.push(res.data.index);
      },
      async triDisconnection(index) {
        let res = await disconnect(index);
        let i = this.checkindex.findIndex(e => {
          return index == e
        });
        this.checkindex.splice(i,1);
      },
    }
  }
</script>

<style lang='scss'>
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