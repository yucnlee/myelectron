<template>
  <div>
    <a-layout-content>
      <a-menu mode="horizontal" theme="dark" :default-selected-keys="['1']" class="table-menu">
        <a-menu-item key="1" @click="setMenuType(1)">设置监控点</a-menu-item>
        <a-menu-item key="2" @click="setMenuType(2)">设置监控点数据</a-menu-item>
      </a-menu>
      <a-table :columns="columns" :data-source="data" :pagination="false" bordered>
        <span slot="action" slot-scope="text, record" class="dfsa">
          <a-icon type="edit" class="pointer dib" @click="onedit(record)"></a-icon>
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
        <a-button type="primary" icon="copy">发布</a-button>
        <a-button type="primary" icon="copy">OTA</a-button>
        <a-button type="primary" icon="copy">重启</a-button>
      </a-row>
    </a-layout-footer>
    <addCollectDialog
      :visible="addCollectDialogVisible"
      :isAdd="isAdd"
      :flag="flag"
      :itemForm="itemForm"
      @cancel="cancelAddCollectDialog"
      @ensure="ensureAddCollectDialog"
    ></addCollectDialog>
  </div>
</template>

<script>
import addCollectDialog from "@/components/dialog/addCollectDialog";
export default {
  components: {
    addCollectDialog,
  },
  data() {
    return {
      // 控制调出弹框选择
      menuType: 0,
      // 控制采集点弹框
      addCollectDialogVisible: false,

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
      monitorData: [
        {
          key: "0",
          name: "温度",
          areatype: "DB",
          db: 1,
          dbtype: 5,
          pos: 0,
          bit: 0,
        },
        {
          key: "1",
          name: "温度",
          areatype: "DB",
          db: 1,
          dbtype: 5,
          pos: 0,
          bit: 0,
        },
      ],
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
      monitorDataData: [
        {
          key: "0",
          name: "温度",
          areatype: "DB",
          db: 1,
          dbtype: 5,
          pos: 0,
          bit: 0,
          value: 123,
        },
      ],
      // 修改控制
      isAdd: true,
      itemForm: {},
      flag: true,
    };
  },
  methods: {
    openDialog() {
      if (this.menuType === 1) {
        this.addCollectDialogVisible = true;
      } else if (this.menuType === 2) {
        this.addCollectDialogVisible = true;
      } else if (this.menuType === 3) {
        this.addMqttDialogVisible = true;
      }
    },
    setMenuType(i) {
      this.menuType = i;
    },
    ensureAddCollectDialog(obj) {
      this.dataCollect.push(obj);
      this.dataDev.forEach((e, i) => {
        e.key = "Col" + i;
        return e;
      });
      this.cancelAddCollectDialog();
    },
    cancelAddCollectDialog() {
      this.addCollectDialogVisible = false;
    },
    ondelete(key) {
      console.log("key", key);
      this.data = this.data.filter((e) => {
        return e.key != key;
      });
    },
    onedit(record) {
      this.openDialog();
      this.isAdd = false;
      this.itemForm = record;
      this.flag = !this.flag;
      console.log(this.itemForm);
    },
  },
  mounted() {
    this.menuType = 1;
  },
  watch: {
    menuType: function (val) {
      if (val === 1) {
        this.columns = this.monitorColumns;
        this.data = this.monitorData;
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
