<template>
  <div>
    <a-layout-content>
      <a-menu
        mode="horizontal"
        theme="dark"
        :default-selected-keys="['1']"
        class="table-menu"
      >
        <a-menu-item key="1" @click="getDevTable">设备信息</a-menu-item>
        <a-menu-item key="2" @click="getCollectTable">采集点信息</a-menu-item>
      </a-menu>
      <a-table
        :columns="columns"
        :data-source="data"
        class="table"
        bordered
        :scroll="{}"
        :pagination="false"
      >
        <span slot="status" slot-scope="text">
          <div class="circlegreen" v-if="text == 1"></div>
          <div class="circle" v-if="text == 0"></div>
        </span>

        <span slot="action" slot-scope="text, record" class="dfsa">
          <a-icon
            type="edit"
            class="pointer dib"
            @click="edit(record)"
          ></a-icon>
          <!-- <a-icon type="copy" class="pointer dib"></a-icon> -->
          <a-popconfirm
            title="确定删除该条信息"
            ok-text="确定"
            cancel-text="取消"
            @confirm="ondelete(record.key)"
          >
            <a-icon type="delete" class="pointer dib" title="确定删除"></a-icon>
          </a-popconfirm>
        </span>
      </a-table>
      <div v-if="menuType === 1" class="devInfo">
        <a-tag color="#f50"
          >设备信息有且只能有一条,新增信息会覆盖当前信息</a-tag
        >
      </div>
    </a-layout-content>
    <a-layout-footer>
      <a-row class="action">
        <a-button type="primary" icon="plus" @click="openDialog(menuType)">{{
          buttonTxt
        }}</a-button>
        <a-button type="primary" icon="copy" @click="sendMsg">发送</a-button>
      </a-row>
    </a-layout-footer>
    <addDevDialog
      :visible="addDevDialogVisible"
      :itemForm="itemForm"
      :isAdd="isAdd"
      :flag="flag"
      @cancel="cancelAddDevDialog"
      @ensure="ensureAddDevDialog"
      @edit="onedit"
    ></addDevDialog>
    <addCollectDialog
      :visible="addCollectDialogVisible"
      :itemForm="itemForm"
      :isAdd="isAdd"
      :flag="flag"
      @cancel="cancelAddCollectDialog"
      @ensure="ensureAddCollectDialog"
      @edit="onedit"
    ></addCollectDialog>
  </div>
</template>

<script>
import addMonitorDialog from "@/components/dialog/addMonitorDialog";
import addDevDialog from "@/components/dialog/addDevDialog";
import addCollectDialog from "@/components/dialog/addCollectDialog";
import addMqttDialog from "@/components/dialog/addMqttDialog";
import { send } from "@/api/index";
export default {
  props: [],
  components: {
    addDevDialog,
    addCollectDialog,
  },
  data() {
    return {
      addMonitorDialogVisible: false,
      addDevDialogVisible: false,
      addCollectDialogVisible: false,
      addMqttDialogVisible: false,
      menuType: 1,
      columns: [],
      columnsDev: [
        {
          title: "protocol",
          dataIndex: "protocol",
          key: "protocol",
          align: "center",
          ellipsis: true,
        },
        {
          title: "connectType",
          dataIndex: "connectType",
          key: "connectType",
          align: "center",
          ellipsis: true,
        },
        {
          title: "slavePort",
          dataIndex: "slavePort",
          key: "slavePort",
          align: "center",
          ellipsis: true,
        },
        {
          title: "baudRate",
          dataIndex: "baudRate",
          key: "baudRate",
          align: "center",
          ellipsis: true,
        },
        {
          title: "ipAddr",
          dataIndex: "ipAddr",
          key: "ipAddr",
          align: "center",
          ellipsis: true,
        },
        {
          title: "port",
          dataIndex: "port",
          key: "port",
          align: "center",
          ellipsis: true,
        },
        {
          title: "rack",
          dataIndex: "rack",
          key: "rack",
          align: "center",
          ellipsis: true,
        },
        {
          title: "slot",
          dataIndex: "slot",
          key: "slot",
          align: "center",
          ellipsis: true,
        },
        {
          title: "intervalTime",
          dataIndex: "intervalTime",
          key: "intervalTime",
          align: "center",
          ellipsis: true,
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          scopedSlots: {
            customRender: "action",
          },
          ellipsis: true,
        },
      ],
      columnsCollect: [
        {
          title: "name",
          dataIndex: "name",
          key: "name",
          align: "center",
          ellipsis: true,
        },
        {
          title: "areatype",
          dataIndex: "areatype",
          key: "areatype",
          align: "center",
          ellipsis: true,
        },
        {
          title: "db",
          dataIndex: "db",
          key: "db",
          align: "center",
          ellipsis: true,
        },
        {
          title: "dbtype",
          dataIndex: "dbtype",
          key: "dbtype",
          align: "center",
          ellipsis: true,
        },
        {
          title: "pos",
          dataIndex: "pos",
          key: "pos",
          align: "center",
          ellipsis: true,
        },
        {
          title: "bit",
          dataIndex: "bit",
          key: "bit",
          align: "center",
          ellipsis: true,
        },
        {
          title: "操作",
          key: "action",
          scopedSlots: {
            customRender: "action",
          },
          align: "center",
          ellipsis: true,
        },
      ],
      data: [],
      dataArr: [
        {
          dataDev: [],
          dataCollect: [],
        },
      ],
      dataDev: [],
      dataCollect: [],
      buttonTxt: "新增设备信息",
      flag: true,
      isAdd: true,
      itemForm: {},
    };
  },
  methods: {
    openDialog() {
      if (this.menuType === 1) {
        this.addDevDialogVisible = true;
      } else if (this.menuType === 2) {
        this.addCollectDialogVisible = true;
      }
    },
    deleteKey(arr) {
      let newArr = this.deepClone(arr);
      newArr.map((e) => {
        delete e.key;
        return e;
      });
      return newArr;
    },
    async sendMsg() {
      if (this.menuType === 1) {
        let playload = {
          Device: this.deleteKey(this.dataDev)[0],
        };
        let msg = JSON.stringify(playload);
        let code = "020";
        this.$electron.ipcRenderer.send("sendMsg", this.menuIndex, code, msg);
      } else if (this.menuType === 2) {
        let snap7 = {
          version: "1.1",
          data: [...this.deleteKey(this.dataCollect)],
        };
        let code = "030";
        let msg = JSON.stringify(snap7);
        this.$electron.ipcRenderer.send("sendMsg", this.menuIndex, code, msg);
      }
    },
    cancelAddDevDialog() {
      this.addDevDialogVisible = false;
      this.isAdd = true;
    },
    ensureAddDevDialog(form) {},
    cancelAddCollectDialog() {
      this.addCollectDialogVisible = false;
      this.isAdd = true;
    },
    ensureAddCollectDialog(obj) {
      this.dataCollect.push(obj);
      this.dataDev.forEach((e, i) => {
        e.key = "Col" + i;
        return e;
      });
      this.cancelAddCollectDialog();
    },
    // 表格切换函数
    getDevTable() {
      this.menuType = 1;
      this.columns = this.columnsDev;
      this.data = this.dataDev;
      this.buttonTxt = "新增设备信息";
    },
    getCollectTable() {
      this.menuType = 2;
      this.columns = this.columnsCollect;
      this.data = this.dataCollect;
      this.buttonTxt = "新增采集点信息";
    },
    getMqttTable() {
      this.menuType = 3;
      this.columns = this.columnsMqtt;
      this.data = this.dataMqtt;
    },
    ondelete(key) {
      console.log("key", key);
      this.data = this.data.filter((e) => {
        return e.key != key;
      });
    },
    edit(record) {
      this.openDialog();
      this.isAdd = false;
      this.itemForm = record;
      this.flag = !this.flag;
    },
    onedit(form) {
      const target = this.data.findIndex((e) => {
        return e.key === this.form.key;
      });
      this.data.splice(target, 1, form);
      this.isAdd = true;
    },
    deepClone(obj) {
      let cloneObj = Array.isArray(obj) ? [] : {};
      if (obj && typeof obj === "object") {
        for (var key in obj) {
          if (obj.hasOwnProperty(key)) {
            if (obj[key] && typeof obj[key] === "object") {
              cloneObj[key] = this.deepClone(obj[key]);
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
    menuIndex: function() {
      return this.$store.state.menuIndex;
    },
  },
  mounted() {
    this.getDevTable();
    this.buttonTxt = "新增设备信息";
  },
};
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

.devInfo {
  margin-top: 30px;
  margin-left: 15px;
}
</style>
