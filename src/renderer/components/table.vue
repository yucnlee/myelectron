<template>
  <div>
    <a-layout-content>
      <a-menu mode="horizontal" theme="dark" :default-selected-keys="['1']" class="table-menu">
        <a-menu-item key="1" @click="getDevTable">设备信息</a-menu-item>
        <a-menu-item key="2" @click="getCollectTable">采集点信息</a-menu-item>
        <a-menu-item key="3" @click="getMqttTable">mqtt信息</a-menu-item>
      </a-menu>
      <a-table :columns="columns" :data-source="data" class="table" bordered :scroll="{}"
        :pagination="false">
        <span slot="status" slot-scope="text">
          <div class="circlegreen" v-if="text==1"></div>
          <div class="circle" v-if="text == 0"></div>
        </span>

        <span slot="action">
          <a-icon type="edit" class="pointer"></a-icon>
          <a-icon type="copy" class="pointer"></a-icon>
          <a-icon type="delete" class="pointer"></a-icon>
        </span>
      </a-table>
    </a-layout-content>
    <a-layout-footer>
      <a-row class="action">
        <a-button type="primary" icon="plus" @click="openDialog(menuType)">新建信息</a-button>
        <a-button type="primary" icon="menu-unfold" @click="setConfig">生成配置文件</a-button>
        <a-button type="primary" icon="copy" @click="sendMsg">发送</a-button>
      </a-row>
    </a-layout-footer>
    <addDevDialog :visible="addDevDialogVisible" @cancel="cancelAddDevDialog" @ensure="ensureAddDevDialog">
    </addDevDialog>
    <addCollectDialog :visible="addCollectDialogVisible" @cancel="cancelAddCollectDialog"
      @ensure="ensureAddCollectDialog"></addCollectDialog>
    <addMqttDialog :visible="addMqttDialogVisible" @cancel="cancelAddMqttDialog" @ensure="ensureAddMqttDialog">
    </addMqttDialog>
  </div>
</template>

<script>
  import addMonitorDialog from '@/components/dialog/addMonitorDialog';
  import addDevDialog from '@/components/dialog/addDevDialog';
  import addCollectDialog from '@/components/dialog/addCollectDialog';
  import addMqttDialog from '@/components/dialog/addMqttDialog';
  import {
    send,
  } from '@/api/index';
  export default {
    props: [],
    components: {
      addMonitorDialog,
      addDevDialog,
      addCollectDialog,
      addMqttDialog,
    },
    data() {
      return {
        addMonitorDialogVisible: false,
        addDevDialogVisible: false,
        addCollectDialogVisible: false,
        addMqttDialogVisible: false,
        menuType: 1,
        columns: [{
            title: "状态",
            dataIndex: "status",
            key: "status",
            scopedSlots: {
              customRender: 'status'
            },
            align: "center",
          },
          {
            title: "名称",
            dataIndex: "name",
            key: "name",
            align: "center",
          },
          {
            title: "数值",
            dataIndex: "number",
            key: "number",
            align: "center",
          },
          {
            title: "地址",
            dataIndex: "adress",
            key: "adresss",
            align: "center",
          },
          {
            title: "省流量",
            dataIndex: "isSaveTraffic",
            key: "isSaveTraffic",
            align: "center",
          },
          {
            title: "描述",
            dataIndex: "description",
            key: "description",
            align: "center",

          },
          {
            title: 'Action',
            key: 'action',
            scopedSlots: {
              customRender: 'action'
            },
            align: "center",
          },
        ],
        columnsDev: [{
            title: "protocol",
            dataIndex: "protocol",
            key: "protocol",
            align: 'center',
            ellipsis:true,
          },
          {
            title: "connectType",
            dataIndex: "connectType",
            key: "connectType",
            align: 'center',
            ellipsis:true,
          },
          {
            title: "slavePort",
            dataIndex: "slavePort",
            key: "slavePort",
            align: 'center',
            ellipsis:true,
          },
          {
            title: "baudRate",
            dataIndex: "baudRate",
            key: "baudRate",
            align: 'center',
            ellipsis:true,
          },
          {
            title: "ipAddr",
            dataIndex: "ipAddr",
            key: "ipAddr",
            align: 'center',
            ellipsis:true,
          },
          {
            title: "port",
            dataIndex: "port",
            key: "port",
            align: 'center',
            ellipsis:true,
          },
          {
            title: "rack",
            dataIndex: "rack",
            key: "rack",
            align: 'center',
            ellipsis:true,
          },
          {
            title: "slot",
            dataIndex: "slot",
            key: "slot",
            align: 'center',
            ellipsis:true,
          },
          {
            title: "intervalTime",
            dataIndex: "intervalTime",
            key: "intervalTime",
            align: 'center',
            ellipsis:true,
          },
          {
            title: '操作',
            key: 'action',
            align:'center',
            scopedSlots: {
              customRender: 'action'
            },
            ellipsis:true,
          }
        ],
        columnsCollect: [{
            title: 'name',
            dataIndex: 'name',
            key: 'name',
            align: 'center',
            ellipsis:true,
          },
          {
            title: 'areatype',
            dataIndex: 'areatype',
            key: 'areatype',
            align: 'center',
            ellipsis:true,
          },
          {
            title: 'db',
            dataIndex: 'db',
            key: 'db',
            align: 'center',
            ellipsis:true,
          },
          {
            title: 'dbtype',
            dataIndex: 'dbtype',
            key: 'dbtype',
            align: 'center',
            ellipsis:true,
          },
          {
            title: 'pos',
            dataIndex: 'pos',
            key: 'pos',
            align: 'center',
            ellipsis:true,
          },
          {
            title: 'bit',
            dataIndex: 'bit',
            key: 'bit',
            align: 'center',
            ellipsis:true,
          },
          {
            title: '操作',
            key: 'action',
            scopedSlots: {
              customRender: 'action'
            },
            ellipsis:true,
          }
        ],
        columnsMqtt: [{
            title: 'add',
            dataIndex: 'add',
            key: 'addadd',
            align: 'center',
            ellipsis:true,
          },
          {
            title: 'port',
            dataIndex: 'port',
            key: 'port',
            align: 'center',
            ellipsis:true,
          },
          {
            title: 'pub_topic',
            dataIndex: 'pub_topic',
            key: 'pub_topic',
            align: 'center',
            ellipsis:true,
          },
          {
            title: 'sub_topic',
            dataIndex: 'sub_topic',
            key: 'sub_topic',
            align: 'center',
            ellipsis:true,
          },
          {
            title: 'user_name',
            dataIndex: 'user_name',
            key: 'user_name',
            align: 'center',
            ellipsis:true,
          },
          {
            title: 'pass_word',
            dataIndex: 'pass_word',
            key: 'pass_word',
            align: 'center',
            ellipsis:true,
          },
          {
            title: 'client_id',
            dataIndex: 'client_id',
            key: 'client_id',
            align: 'center',
            ellipsis:true,
          },
          {
            title: '操作',
            key: 'action',
            scopedSlots: {
              customRender: 'action'
            }
          }
        ],
        data: [],
        dataDev: [{
          key:'0',
          protocol: 'S7',
          connectType: 'Tcp',
          slavePort: 1,
          baudRate: 1500000,
          ipAddr: '192.168.1.230',
          port: '502',
          rack: 0,
          slot: 1,
          intervalTime: 200,
        }],
        dataCollect: [{
            key:'0',
            name: '温度',
            areatype: 'DB',
            db: 1,
            dbtype: 5,
            pos: 0,
            bit: 0,
          },
          {
            key:'1',
            name: '温度',
            areatype: 'DB',
            db: 1,
            dbtype: 5,
            pos: 0,
            bit: 0,
          },
        ],
        dataMqtt: [{
          key:'0',
          add: '39.98.183.135',
          port: '1883',
          pub_topic: 'upload_data/highSpeedSheetMetalHydraulicPress/V1312345/',
          sub_topic: 'update_status/:productName/:deviceName/',
          user_name: 'highSpeedSheetMetalHydraulicPress|35490ef91bf3453b9c4c21520c26acb9',
          pass_word: '00feb014dea94117982dced560fc0462',
          client_id: 'V13',
        }],
      }
    },
    methods: {
      openDialog() {
        if (this.menuType === 1) {
          this.addDevDialogVisible = true
        } else if (this.menuType === 2) {
          this.addCollectDialogVisible = true;
        } else if (this.menuType === 3) {
          this.addMqttDialogVisible = true;
        }
        console.log(this.menuType)
      },
      setConfig() {},
      async sendMsg() {
        let playload = {
          Device: this.dataDev[0],
          snap7: this.dataCollect,
        }
        let mqtt = {
          mqtt: this.dataMqtt[0]
        }
        let msg = JSON.stringify(playload) + JSON.stringify(mqtt);
        await send(this.menuIndex,msg);
      },
      cancelAddDevDialog() {
        this.addDevDialogVisible = false;
      },
      ensureAddDevDialog(obj) {
        this.dataDev.splice(0);
        this.dataDev.push(obj);
        this.dataDev.forEach((e, i) => {
          e.key = "dev" + i;
          return e;
        })
        localStorage.setItem('dataDev', JSON.stringify(this.dataDev))
        this.cancelAddDevDialog();
      },
      cancelAddCollectDialog() {
        this.addCollectDialogVisible = false;
      },
      ensureAddCollectDialog(obj) {
        this.dataCollect.push(obj);
        this.dataDev.forEach((e, i) => {
          e.key = "Col" + i;
          return e;
        })
        this.cancelAddCollectDialog();
      },
      cancelAddMqttDialog() {
        this.addMqttDialogVisible = false;
      },
      ensureAddMqttDialog(obj) {
        this.dataMqtt.splice(0);
        this.dataMqtt.push(obj);
        this.dataDev.forEach((e, i) => {
          e.key = "mqtt" + i;
          return e;
        })
        localStorage.setItem('dataMqtt', JSON.stringify(this.dataMqtt))
        this.cancelAddMqttDialog();
      },
      cancelAddMonitorDialog() {
        this.addMonitorDialogVisible = false;
      },
      ensureAddMonitorDialog() {},
      // 表格切换函数
      getDevTable() {
        this.menuType = 1;
        this.columns = this.columnsDev;
        this.data = this.dataDev;
      },
      getCollectTable() {
        this.menuType = 2;
        this.columns = this.columnsCollect;
        this.data = this.dataCollect;
        console.log('collect')
      },
      getMqttTable() {
        this.menuType = 3;
        this.columns = this.columnsMqtt;
        this.data = this.dataMqtt;
      },
    },
    computed: {
      menuIndex: function () {
        return this.$store.state.menuIndex;
      }
    },
    mounted() {
      this.getDevTable();
    }
  }
</script>

<style scoped lang="scss">
  .ant-layout-header {
    background-color: #f0f2f5;
  }

  // .ant-table-wrapper /deep/ .ant-table {
  //   min-height: 500px !important;
  //   text-align: center!important;
  // }

  .ant-table-wrapper /deep/.ant-table-pagination {
    position: absolute;
    bottom: 6px;
    right: 0;
  }

  .table-menu {
    margin-top: 5px;
    margin-bottom: 4px;
    padding: 0 15px;
  }

  // .action{

  // }
  .ant-layout-footer {
    position: absolute;
    bottom: 5px;
  }

  .circlegreen {
    background-color: green;
    border-radius: 50%;
    width: 10px;
    height: 10px;
    margin: 0 auto;
  }
</style>