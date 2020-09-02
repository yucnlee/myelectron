<template>
  <div>
    <a-layout-content>
      <el-menu
        mode="horizontal"
        class="table-menu"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        default-active="1"
      >
        <el-menu-item @click="setMenuType(1)" index="1">设置监控点</el-menu-item>
        <el-menu-item @click="setMenuType(2)" index="2">设置监控点数据</el-menu-item>
      </el-menu>
      <a-table :columns="columns" :data-source="data" :pagination="false" bordered>
        <span slot="action" slot-scope="text, record" class="dfsa">
          <a-icon type="edit" class="pointer dib" @click="edit(record)"></a-icon>
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
    </a-layout-content>

    <a-layout-footer>
      <a-row class="action">
        <a-button type="primary" icon="plus" @click="openDialog(menuType)">添加数据</a-button>
        <a-button type="primary" icon="copy" @click="publishToptic">
          <span>{{ buttonTxt }}</span>
        </a-button>
        <a-button type="primary" icon="copy" @click="ota">升级</a-button>
        <a-button type="primary" icon="copy" @click="restart">重启</a-button>
      </a-row>
    </a-layout-footer>
    <addCollectDialog
      :visible="addCollectDialogVisible"
      :itemForm="itemForm"
      :isAdd="isAdd"
      :flag="flag"
      @cancel="cancelAddCollectDialog"
      @ensure="ensureAddCollectDialog"
      @edit="onedit"
    ></addCollectDialog>
    <addCollectDataDialog
      :visible="addCollecDataDialogVisible"
      :itemForm="itemForm"
      :isAdd="isAdd"
      :flag="flag"
      @cancel="cancelAddCollectDataDialog"
      @ensure="ensureAddCollectDataDialog"
      @edit="onedit"
    ></addCollectDataDialog>
  </div>
</template>

<script>
import addCollectDialog from "@/components/dialog/addCollectDialog";
import addCollectDataDialog from "@/components/dialog/addCollectDataDialog";
import mqtt from "mqtt";

export default {
  components: {
    addCollectDialog,
    addCollectDataDialog,
  },
  data() {
    return {
      // 控制调出弹框选择
      menuType: 0,
      buttonTxt: "",
      // 控制采集点弹框
      addCollectDialogVisible: false,
      addCollecDataDialogVisible: false,

      columns: [],
      data: [],
      // 监控点表
      monitorColumns: [
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
      monitorData: [],
      otaColumns: [],
      monitorDataColumns: [
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
          title: "value",
          dataIndex: "value",
          key: "value",
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
      monitorDataData: [],
      // 修改控制
      isAdd: true,
      itemForm: {},
      flag: true,
      // mqtt 配置
      option: {},
    };
  },
  methods: {
    deleteKey(arr) {
      let newArr = this.deepClone(arr);
      newArr.map((e) => {
        delete e.key;
        return e;
      });
      return newArr;
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
    openDialog() {
      if (this.menuType === 1) {
        this.addCollectDialogVisible = true;
      } else if (this.menuType === 2) {
        this.addCollecDataDialogVisible = true;
      }
    },
    setMenuType(i) {
      this.menuType = i;
    },
    ensureAddCollectDialog(obj) {
      this.monitorData.push(obj);
      this.monitorData.forEach((e, i) => {
        e.key = "Col" + i;
        return e;
      });
      this.cancelAddCollectDialog();
    },
    cancelAddCollectDialog() {
      this.addCollectDialogVisible = false;
    },
    ensureAddCollectDataDialog(obj) {
      this.monitorDataData.push(obj);
      // this.monitorDataData.forEach((e, i) => {
      //   e.key = "Col" + i;
      //   return e;
      // });
      this.cancelAddCollectDataDialog();
    },
    cancelAddCollectDataDialog() {
      this.addCollecDataDialogVisible = false;
      this.isAdd = true;
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
      console.log(this.itemForm);
    },
    onedit() {
      const target = this.data.findIndex((e) => {
        return e.key === this.form.key;
      });
      this.data.splice(target, 1, form);
      this.isAdd = true;
    },
    publishToptic() {
      if (this.menuType === 1) {
        let topic = "Topic/sh1/box/10102020080001/system/CollectPoint";
        let playload = {
          version: "1.1",
          data: [...this.deleteKey(this.monitorData)],
        };
        this.client.publish(topic, JSON.stringify(playload), (error) => {
          console.log(error);
        });
        console.log(this.client);
      } else if (this.menuType === 2) {
        let topic = "Topic/sh1/box/10102020080001/system/settingMonitor";
        this.monitorDataData.map((e) => {
          e.value = String.fromCharCode(e.value);
          return e;
        });
        let playload = {
          version: "1.1",
          data: { ...this.monitorDataData },
        };
        console.log(playload);
        this.client.publish(topic, JSON.stringify(playload));
        console.log(this.client);
      }
    },
    ota() {
      let topic = "Topic/sh1/box/10102020080001/system/OTA";
      let playload = {
        version: "1.1",
        path: "121.40.99.207/static/connect-box/ConnectBox",
        file: "/home/fa/UPDATEFILE/ConnectBox",
      };
      let option = {
        qos: 1,
      };
      this.client.publish(topic, JSON.stringify(playload), option, (error) => {
        console.log(error);
      });
      console.log(this.client);
    },
    restart() {
      let topic = "Topic/sh1/box/10102020080001/system/exit";
      let playload = {
        version: "1.1",
        command: "exit",
      };
      let option = {
        qos: 1,
      };
      this.client.publish(topic, JSON.stringify(playload), option, (error) => {
        console.log(error);
      });
      console.log(this.client);
    },
  },
  computed: {
    client: function () {
      return this.$store.state.client;
    },
    name: function () {},
  },
  mounted() {
    this.menuType = 1;
  },
  watch: {
    menuType: function (val) {
      if (val === 1) {
        this.columns = this.monitorColumns;
        this.data = this.monitorData;
        this.buttonTxt = "设置监控点";
      } else if (val === 2) {
        this.columns = this.monitorDataColumns;
        this.data = this.monitorDataData;
        this.buttonTxt = "设置监控点数据";
      }
    },
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
  height: 46px;
  li {
    height: 100%;
    line-height: 46px;
  }
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
