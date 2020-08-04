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
            <span>li123</span>
            <a-icon type="user" style="margin-left:5px;"></a-icon>
          </el-col>
        </el-row>
      </div>
      <a-layout>
        <a-layout-sider>
          <a-input>
            <a-icon type="search"></a-icon>
          </a-input>
          <a-menu mode="inline" theme="dark" class="menu">
            <a-sub-menu key="sub1" title="默认组">
              <a-menu-item key="01">默认组</a-menu-item>
            </a-sub-menu>
            <a-sub-menu key="sub2" class="submenu">
              <span slot="title">水泥设计</span>
              <a-menu-item v-for="(item,index) in menuList" :key="index">
                {{item.alias}}
              </a-menu-item>
            </a-sub-menu>
          </a-menu>
          <a-row type="flex" justify="space-around" class="side-bottom"
            style="position:absolute; bottom:0;width:100%;height:30px;">
            <a-col>
              <a-dropdown>
                <a-icon type="plus"></a-icon>
                <a-menu slot="overlay">
                  <a-menu-item @click.native="openAddBoxDialog">
                    <a-icon type="plus"></a-icon>
                    添加FBOX
                  </a-menu-item>
                </a-menu>
              </a-dropdown>
            </a-col>
            <a-col>
              <a-icon type="folder"></a-icon>
            </a-col>
            <a-col>
              <a-icon type="user"></a-icon>
            </a-col>
            <a-col>
              <a-icon type="setting"></a-icon>
            </a-col>
            <a-col>
              <a-icon type="home"></a-icon>
            </a-col>
          </a-row>
        </a-layout-sider>
        <a-layout>
          <a-layout-header>
            <a-row type="flex" justtify="space-around">
              <a-col :span="3">
                <div></div>
                数据监控
              </a-col>
              <a-col :span="3">
                报警记录
              </a-col>
              <a-col :span="3">
                历史数据
              </a-col>
              <a-col :span="3">
                边缘计算
              </a-col>
              <a-col :span="3">
                远程下载
              </a-col>
              <a-col :span="3">
                数据转发
              </a-col>
              <a-col :span="3">
                地址标签
              </a-col>
              <a-col :span="3">
                基本配置
              </a-col>
            </a-row>
          </a-layout-header>
          <a-layout-content>
            <a-menu mode="horizontal" theme="dark">
              <a-menu-item>默认组</a-menu-item>
              <a-menu-item>运行数据</a-menu-item>
              <a-menu-item>启停</a-menu-item>
              <a-menu-item>报警</a-menu-item>
              <a-menu-item>分组设置</a-menu-item>
              <a-menu-item>监控设置</a-menu-item>
            </a-menu>
            <a-table :columns="columns" :data="data">

            </a-table>
          </a-layout-content>
          <a-layout-footer>
            <a-row>
              <a-button type="primary" icon="plus">新建监控</a-button>
              <a-button type="primary" icon="menu-unfold">批量</a-button>
              <a-button type="primary" icon="copy">导入导出</a-button>
            </a-row>
          </a-layout-footer>
        </a-layout>
      </a-layout>
    </a-layout>
    <addBoxDialog :visible="addBoxDialogVisible" @cancel="cancelAddBoxDialog" @ensure="ensureAddboxDialog">
    </addBoxDialog>
  </div>
</template>

<script>
  import SystemInformation from './LandingPage/SystemInformation';
  import addBoxDialog from '@/components/dialog/addBoxDialog.vue';

  export default {
    name: 'landing-page',
    components: {
      SystemInformation,
      addBoxDialog,
    },
    data() {
      return {
        addBoxDialogVisible: false,
        columns: [{
            title: "状态",
            key: "status",
          },
          {
            title: "名称",
            key: "",
          },
          {
            title: "数值",
            key: "",
          },
          {
            title: "地址",
            key: "",
          },
          {
            title: "省流量",
            key: "adress",
          },
          {
            title: "描述",

          },
          {
            title: "操作",
          }
        ],
        data: [],
        menuList: [],
      }
    },
    methods: {
      open(link) {
        this.$electron.shell.openExternal(link)
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
        localStorage.clear();
        localStorage.setItem("menuList",JSON.stringify(this.menuList));
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
      this.menuList =JSON.parse(localStorage.getItem("menuList"));
    }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

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

  .helpinfo span {
    margin: 0 10px;
  }
</style>