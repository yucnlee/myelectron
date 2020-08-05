<template>
  <a-modal title="设置监控点数据" :visible="visible" @cancel="cancel">
    <a-form-model :model="form" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
      <a-form-model-item label="name">
        <a-input placeholer v-model="form.name" />
      </a-form-model-item>
      <a-form-model-item label="areatype">
        <a-select v-model="form.areatype">
          <a-select-option value="V">变量存储区(PLC -200 smart独有)</a-select-option>
          <a-select-option value="DB">DB块</a-select-option>
          <a-select-option value="M">位存储区</a-select-option>
          <a-select-option value="I">数字量输入DI</a-select-option>
          <a-select-option value="Q">数字量输出DO</a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="db">
        <a-select v-model="form.db">
          <a-select-option value="0">_Bit</a-select-option>
          <a-select-option value="1">_Word</a-select-option>
          <a-select-option value="2">_DWord</a-select-option>
          <a-select-option value="3">_Int</a-select-option>
          <a-select-option value="4">_Dint</a-select-option>
          <a-select-option value="5">_Real</a-select-option>
          <a-select-option value="6">_Byte</a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="dbtype">
        <a-input placeholer v-model.number="form.dbtype" />
      </a-form-model-item>
      <a-form-model-item label="pos">
        <a-input placeholer v-model.number="form.pos" />
      </a-form-model-item>
      <a-form-model-item label="bit">
        <a-input-number :max="7" :min="0" v-model.number="form.bit" />
      </a-form-model-item>
      <a-form-model-item label="value">
        <a-input-number v-model.number="form.value" />
      </a-form-model-item>
    </a-form-model>
    <template slot="footer">
      <a-button type="primary" @click="ensure" v-if="isAdd">新增</a-button>
      <a-button type="primary" @click="edit" v-if="!isAdd">修改</a-button>
      <a-button @click="cancel">取消</a-button>
    </template>
  </a-modal>
</template>

<script>
export default {
  props: ["visible", "itemForm", "isAdd", "flag"],
  data() {
    return {
      form: {
        name: "",
        areatype: "",
        db: "",
        dbtype: "",
        pos: "",
        bit: "",
        value: "",
      },
    };
  },
  methods: {
    cancel() {
      this.$emit("cancel");
      this.form = {};
    },
    ensure() {
      this.$emit("ensure", this.form);
      this.form = {};
    },
    edit() {},
  },
  watch: {
    flag: function (val) {
      if (this.isAdd == false) {
        this.form = this.itemForm;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.ant-form.model {
  margin: 0 auto;
}
</style>

<style>
.ant-modal-footer {
  text-align: center !important;
}
</style>
