<template>
  <div class="wrapper">
    <a-form-model :model="form" :label-col="{span:6}" :wrapper-col="{span:16}">
      <a-row :gutter="24">
        <a-col :span="12">
          <a-form-model-item label="host">
            <a-input v-model="form.host"></a-input>
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="port">
            <a-input v-model="form.port"></a-input>
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row :gutter="24">
        <a-col :span="12">
          <a-form-model-item label="clientId">
            <a-input v-model="form.clientId"></a-input>
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="keep-alive">
            <a-input v-model.number="form.keep"></a-input>
          </a-form-model-item>
        </a-col>
      </a-row>

      <a-row :gutter="24">
        <a-col :span="12">
          <a-form-model-item label="userName">
            <a-input v-model="form.userName"></a-input>
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="passWord">
            <a-input v-model="form.host"></a-input>
          </a-form-model-item>
        </a-col>
      </a-row>
    </a-form-model>
    <div class="button-group">
      <a-button @click="connect" type="primary">确定</a-button>
      <a-button type="primary" @click="$router.push('/mqtt')">取消</a-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        host: "",
        port: "",
        clientId: "",
        keep: "",
        userName: "",
        passWord: "",
      },
    };
  },
  methods: {
    connect() {
      this.$store.commit("setMqttObj", this.form);
      this.$router.push("/mqtt");
    },
  },
};
</script>

<style scoped lang="scss">
.wrapper {
  margin-top: 30px;
}
.button-group {
  text-align: center;
}
</style>