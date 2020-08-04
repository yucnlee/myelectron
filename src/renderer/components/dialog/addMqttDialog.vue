<template>
    <a-modal title="新建Mqtt配置信息" :visible="visible" @cancel="cancel">
        <a-form-model :model="form" :label-col="{span:8}" :wrapper-col="{span:16}">
            <a-row :gutter="24">
                <a-col :span="12">
                    <a-form-model-item label="add">
                        <a-input placeholer="" v-model="form.add" />
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
                    <a-form-model-item label="pubTopic">
                        <a-input placeholer="" v-model="form.pub_topic" />
                    </a-form-model-item>
                </a-col>
                <a-col :span="12">
                    <a-form-model-item label="subTopic">
                        <a-input placeholer="" v-model="form.sub_topic" />
                    </a-form-model-item>
                </a-col>
            </a-row>
            <a-row :gutter="24">
                <a-col :span="12">
                    <a-form-model-item label="userName">
                        <a-input placeholer="" v-model="form.user_name" />
                    </a-form-model-item>
                </a-col>
                <a-col :span="12">
                    <a-form-model-item label="passWord">
                        <a-input placeholer="" v-model="form.pass_word" />
                    </a-form-model-item>
                </a-col>
            </a-row>
            <a-row :gutter="24">
                <a-col :span="24">
                    <a-form-model-item label="clientId" :label-col="{span:4 }" :wrapper-col="{span:20}">
                        <a-input placeholer="" v-model="form.client_id" />
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
        props: ["visible"],
        data() {
            return {
                form: {
                }
            }
        },
        methods: {
            cancel() {
                this.$emit("cancel");
                this.form={};
            },
            ensure() {
                this.$emit("ensure",this.form);
                this.form={};
            }
        }
    }
</script>

<style lang="scss" scoped>
    .ant-form.model {
        margin: 0 auto;
    }
</style>