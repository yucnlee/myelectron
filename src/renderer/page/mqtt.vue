<template>
    <div>
        <a-layout-content>
            <a-menu mode="horizontal" theme="dark" :default-selected-keys="['1']" class="table-menu">
                <a-menu-item key="1" @click="setMenuType(1)">设置监控点</a-menu-item>
                <a-menu-item key="2" @click="setMenuType(2)">OTA</a-menu-item>
                <a-menu-item key="3" @click="setMenuType(3)">设置监控点数据</a-menu-item>
                <a-menu-item key="4" @click="setMenuType(4)">重启</a-menu-item>
            </a-menu>
            <a-table :columns="columns" :data-source="data" bordered>
            </a-table>
        </a-layout-content>

        <a-layout-footer>
            <a-row class="action">
                <a-button type="primary" icon="plus" @click="openDialog(menuType)">添加数据</a-button>
                <a-button type="primary" icon="copy" >发布</a-button>
            </a-row>
        </a-layout-footer>
        <addCollectDialog :visible="addCollectDialogVisible" @cancel="cancelAddCollectDialog"
            @ensure="ensureAddCollectDialog"></addCollectDialog>
    </div>
</template>

<script>
    import addCollectDialog from '@/components/dialog/addCollectDialog';
    export default {
        components: {
            addCollectDialog,
        },
        data() {
            return {
                // 控制调出弹框选择
                menuType:0,
                // 控制采集点弹框
                addCollectDialogVisible: false,

                columns: [],
                data:[],
                // 监控点表
                monitorColumns: [{
                        title: 'name',
                        dataIndex: 'name',
                        key: 'name',
                        align: 'center',
                        ellipsis: true,
                    },
                    {
                        title: 'areatype',
                        dataIndex: 'areatype',
                        key: 'areatype',
                        align: 'center',
                        ellipsis: true,
                    },
                    {
                        title: 'db',
                        dataIndex: 'db',
                        key: 'db',
                        align: 'center',
                        ellipsis: true,
                    },
                    {
                        title: 'dbtype',
                        dataIndex: 'dbtype',
                        key: 'dbtype',
                        align: 'center',
                        ellipsis: true,
                    },
                    {
                        title: 'pos',
                        dataIndex: 'pos',
                        key: 'pos',
                        align: 'center',
                        ellipsis: true,
                    },
                    {
                        title: 'bit',
                        dataIndex: 'bit',
                        key: 'bit',
                        align: 'center',
                        ellipsis: true,
                    },
                    {
                        title: '操作',
                        key: 'action',
                        scopedSlots: {
                            customRender: 'action'
                        },
                        ellipsis: true,
                    }
                ],
                monitorData:[],
                otaColumns: [],
                monitorDataColumns: [

                ],

            }
        },
        methods: {
            openDialog() {
                if (this.menuType === 1) {
                    this.addCollectDialogVisible = true
                } else if (this.menuType === 2) {
                    this.addCollectDialogVisible = true;
                } else if (this.menuType === 3) {
                    this.addMqttDialogVisible = true;
                }
                console.log(this.menuType)
            },
            setMenuType(i) {
                this.menuType = i;
            },
            ensureAddCollectDialog(obj) {
                this.dataCollect.push(obj);
                this.dataDev.forEach((e, i) => {
                    e.key = "Col" + i;
                    return e;
                })
                this.cancelAddCollectDialog();
            },
            cancelAddCollectDialog() {
                this.addCollectDialogVisible = false;
            },
        },
        mounted() {
            this.menuType = 1;
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