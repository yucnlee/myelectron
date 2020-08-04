<template>
    <div style="width：30%;">
        <a-modal  :visible="visible" title="添加FBOX" @cancel="cancel">
            <a-form :form="form">
                <a-form-item label="">
                    <a-input placeholder="请输入Fbox 名称" v-model="form.name" />
                </a-form-item>
                <a-form-item label="">
                    <a-input v-model="form.ip" placeholder='请输入Fbox Ip地址'
                   />
                </a-form-item>
                <a-form-item label="">
                    <a-input v-model="form.port" placeholder="请输入Fbox 端口号" />
                </a-form-item>
                <a-form-item label="分组">
                    <a-select v-model="form.group">
                        <a-select-option value="1" key="1">
                            默认组
                        </a-select-option>
                        <a-select-option value="2" key="2">
                            水泥组
                        </a-select-option>
                    </a-select>
                </a-form-item>
            </a-form>
            <template slot="footer">
                <a-button key="cancel"  @click="ensure" type="primary">
                    确认
                </a-button>
                <a-button key="back"  @click="cancel">
                    取消
                </a-button>
            </template>
        </a-modal>
    </div>
</template>

<script>
    export default {
        name: "addBoxDialog",
        props: ["visible"],
        data() {
            return {
                form:{
                    name:'',
                    ip:'',
                    port:'',
                    group:'',
                }
            }
        },
        methods: {
            ensure() {
                this.$emit("ensure",this.form);
                this.cancel();
                this.form = {};
            },
            cancel() {
                this.$emit("cancel");
                this.form={};
            },
        }
    }
</script>

<style>

</style>