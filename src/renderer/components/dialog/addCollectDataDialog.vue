<template>
  <a-modal title="新建采集点信息" :visible="visible" @cancel="cancel" :centered="true">
    <a-form-model :model="form" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
      <a-row>
        <a-col :span="12">
          <a-form-model-item label="name">
            <a-input placeholer v-model="form.name" />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="areatype">
            <a-select v-model="form.areatype">
              <a-select-option value="V">变量存储区(PLC -200 smart独有)</a-select-option>
              <a-select-option value="DB">DB块</a-select-option>
              <a-select-option value="M">位存储区</a-select-option>
              <a-select-option value="I">数字量输入DI</a-select-option>
              <a-select-option value="Q">数字量输出DO</a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12">
          <a-form-model-item label="db">
            <a-input v-model="form.db"></a-input>
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="dbtype">
            <a-input placeholer v-model.number="form.dbtype" />
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12">
          <a-form-model-item label="pos">
            <a-input placeholer v-model.number="form.pos" />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="bit">
            <a-input v-model.number="form.bit" />
          </a-form-model-item>
        </a-col>
      </a-row>
    </a-form-model>
    <a-row>
      <a-form-model-item label="value">
        <a-input placeholer v-model.number="form.value" />
      </a-form-model-item>
    </a-row>
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
      this.form = {
        name: "",
        areatype: "",
        db: "",
        dbtype: "",
        pos: "",
        bit: "",
        value: "",
      };
    },
    ensure() {
      this.$emit("ensure", this.form);
      this.form = {
        name: "",
        areatype: "",
        db: "",
        dbtype: "",
        pos: "",
        bit: "",
        value: "",
      };
    },
    edit() {
      this.$emit("edit", this.form);
      this.$emit("cancel");
      this.form = {
        name: "",
        areatype: "",
        db: "",
        dbtype: "",
        pos: "",
        bit: "",
        value: "",
      };
    },
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
