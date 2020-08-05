<template>
    <a-modal title="新建设备信息" :visible="visible" @cancel="cancel">
        <a-form-model :model="form" :label-col="{span:8}" :wrapper-col="{span:16}">
            <a-row :gutter="24">
                <a-col :span="12">
                    <a-form-model-item label="protocol">
                        <a-input placeholer="" v-model="form.protocol" />
                    </a-form-model-item>
                </a-col>
                <a-col :span="12">
                    <a-form-model-item label="connectType">
                        <a-input placeholer="" v-model="form.connectType" />
                    </a-form-model-item>
                </a-col>
            </a-row>
            <a-row :gutter="24">
                <a-col :span="12">
                    <a-form-model-item label="slavePort">
                        <a-input placeholer="" v-model.number="form.slavePort" type="nnumber" />
                    </a-form-model-item>
                </a-col>
                <a-col :span="12">
                    <a-form-model-item label="baudRate">
                        <a-input placeholer="" v-model.number="form.baudRate" />
                    </a-form-model-item>
                </a-col>
            </a-row>
            <a-row :gutter="24">
                <a-col :span="12">
                    <a-form-model-item label="ipAddr">
                        <a-input placeholer="" v-model="form.ipAddr" />
                    </a-form-model-item>
                </a-col>
                <a-col :span="12">
                    <a-form-model-item label="port">
                        <a-input placeholer="" v-model="form.port" />
                    </a-form-model-item>
                </a-col>
            </a-row>
            <a-row :gutter="24">
                <a-col :span="12">
                    <a-form-model-item label="rack">
                        <a-input placeholer="" v-model.number="form.rack" />
                    </a-form-model-item>
                </a-col>
                <a-col :span="12">
                    <a-form-model-item label="slot">
                        <a-input placeholer="" v-model.number="form.slot" />
                    </a-form-model-item>
                </a-col>
            </a-row>
            <a-row :gutter="24">
                <a-col :span="12">
                    <a-form-model-item label="intervalTime">
                        <a-input placeholer="" v-model.number="form.intervalTime" />
                    </a-form-model-item>
                </a-col>
            </a-row>
        </a-form-model>
        <template slot="footer">
            <a-button type="primary" @click="ensure">
                确定
            </a-button>
            <a-button @click="cancel">
                取消
            </a-button>
        </template>
    </a-modal>
</template>

<script>
    export default {
        props: ["visible","itemForm","isAdd", "flag"],
        data() {
            return {
                form: {
                    protocol: '',
                    connectType: '',
                    slavePort: '',
                    baudRate: '',
                    ipAddr: '',
                    port: '',
                    rack: '',
                    slot: '',
                    intervalTime: '',
                }
            }
        },
        methods: {
            cancel() {
                this.$emit("cancel");
                this.form={};
            },
            ensure() {
                this.$emit("ensure",this.form)
                this.form={};
            }
        },
        watch:{
            flag: function (val) {
                if(this.isAdd === false) {
                    this.form = this.itemForm;
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .ant-form.model {
        margin: 0 auto;
    }
</style>