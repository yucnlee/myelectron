<template>
  <a-modal title="新建监控" :visible="visible" @cancel="cancel">
    <a-form-model :model="form" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-model-item label="名称">
        <a-input />
      </a-form-model-item>
      <a-form-model-item label="地址">
        <a-radio-group v-model="form.a">
          <a-radio value="1">引用标签地址</a-radio>
          <a-radio value="2">直接使用地址</a-radio>
        </a-radio-group>
      </a-form-model-item>
      <a-row>
        <a-col :span="12">
          <a-form-model-item label="设备" :lable-col="{span:8}" :wrapper-col="{span:16}">
            <a-input />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="名称">
            <a-input />
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12">
          <a-form-model-item label="数据类型" :lable-col="{span:8}" :wrapper-col="{span:16}">
            <a-input />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="地址类型">
            <a-input />
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12">
          <a-form-model-item label="地址" :lable-col="{span:8}" :wrapper-col="{span:16}">
            <a-input />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="名称">
            <a-input />
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="12">
          <a-form-model-item label="标签" :lable-col="{span:8}" :wrapper-col="{span:16}">
            <a-input />
          </a-form-model-item>
        </a-col>
        <a-col :span="12">
          <a-form-model-item label="名称">
            <a-input />
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-form-model-item label="格式范围">
        sdfs124234534
      </a-form-model-item>   
      <a-form-model-item>
        <a-radio-group>
          <a-radio>只读</a-radio>
          <a-radio>读写</a-radio>
          <a-radio>只写</a-radio>
        </a-radio-group>
      </a-form-model-item>
      <a-form-model-item label="省流量模式">
        <a-check></a-check>
      </a-form-model-item>
      <a-form-model-item label="描述" >
        <a-input type="textarea" />
      </a-form-model-item>
    </a-form-model>
    <template slot="footer">
                <a-button key="cancel"  @click="ensure" type="primary">
                    确认
                </a-button>
                <a-button key="back"  @click="cancel">
                    取消
                </a-button>
            </template>
  </a-modal>  
</template>

  </a-modal>
  

<script>
  export default {
    props:["visible"],
    data() {
      return{
        labelCol:{span:4},
        wrapperCol:{span:16},
        form:{
          a:0,
        },
      }
    },
    methods:{
      cancel() {
        this.$emit("cancel");
      },
      ensure() {

      },
    }
  }
</script>

<style>

</style>