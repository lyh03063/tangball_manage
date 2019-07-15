<template>
  <el-form
    ref="form"
    :model="value"
    :label-width="cf.labelWidth||'100px'"
    :size="cf.size||'small'"
    :inline="cf.inline"
  >
    <el-row>
      <template v-for="(item,index) in cf.formItems">
        <el-col :span="cf.col_span" :key="item.prop" :class="{clear:spanIndex==index}">
          <el-form-item
            :label="item.label"
            :prop="item.prop"
            :rules="item.rules||[]"
            v-if="satisfyTerm(item)"
          >
            <!--slot自定义组件-注意是isReadyFormData为真时才开始渲染-->
            <slot :name="item.slot" :formData="value" v-if="item.slot&&isReadyFormData"></slot>
            <!--下拉框-->
            <div class v-else-if="item.type=='select'">
              <select_ajax
                class
                v-model="formDataNeed[item.prop]"
                :keyLabel="item.ajax.keyLabel"
                :keyValue="item.ajax.keyValue"
                :ajaxUrl="item.ajax.url"
                :param="item.ajax.param"
                v-if="item.ajax&&isReadyFormData"
              ></select_ajax>
              <el-select v-model="formDataNeed[item.prop]" v-else clearable>
                <el-option
                  :label="option.label"
                  :value="option.value"
                  v-for="option in item.options"
                  :key="option.value"
                ></el-option>
              </el-select>
            </div>

            <!--单选框-->
            <el-radio-group v-model="formDataNeed[item.prop]" v-else-if="item.type=='radio'">
              <el-radio
                :label="option.value"
                v-for="option in item.options"
                :key="option.value"
              >{{option.label}}</el-radio>
            </el-radio-group>
            <!--复选框-->
            <el-checkbox-group v-model="formDataNeed[item.prop]" v-else-if="item.type=='checkbox'">
              <el-checkbox
                :label="option.value"
                v-for="option in item.options"
                :key="option.value"
              >{{option.label}}</el-checkbox>
            </el-checkbox-group>
            <!--文本域-->
            <el-input
              type="textarea"
              v-model="formDataNeed[item.prop]"
              v-else-if="item.type=='textarea'"
            ></el-input>

            <!--date日期选择-->
            <el-date-picker
              v-model="formDataNeed[item.prop]"
              value-format="yyyy-MM-dd"
              align="right"
              type="date"
              placeholder="选择日期"
              v-else-if="item.type=='date'"
            ></el-date-picker>
            <!--如果是时间段-->
            <time_period v-model="formDataNeed[item.prop]" v-else-if="item.type=='time_period'"></time_period>
            <!--如果是vue-json编辑器-->
            <vue-json-editor
              v-model="formDataNeed[item.prop]"
              v-else-if="item.type=='vueJsonEditor'"
              lang="zh"
            ></vue-json-editor>
            <!--如果是普通json编辑器-->
            <json_editor v-model="formDataNeed[item.prop]" v-else-if="item.type=='jsonEditor'"></json_editor>
            <!--如果是图片上传控件-->
            <upload_img v-model="formDataNeed[item.prop]" v-else-if="item.type=='upload'"></upload_img>
            <!--富文本编辑器-->
            <quillEditor
              v-model="formDataNeed[item.prop]"
              :options="editorOption"
              v-else-if="item.type=='editor'"
            ></quillEditor>
            <!--模糊查询文本框-->
            <input_find_vague
              v-model="formDataNeed[item.prop]"
              v-else-if="item.type=='input_find_vague'"
            ></input_find_vague>

            <!--密码框-->

            <el-input
              placeholder="请输入密码"
              v-model="formDataNeed[item.prop]"
              v-else-if="item.type=='password'"
              show-password
            ></el-input>
            <!--普通文本框-->
            <el-input v-model="formDataNeed[item.prop]" v-else></el-input>
          </el-form-item>
        </el-col>
      </template>
    </el-row>

    <el-form-item>
      <!-- 查询按钮 -->
      <el-button
        :type="item.type"
        @click="btnClick(item.event,item.validate)"
        v-for="(item,index) in cf.btns"
        :key="index"
      >{{item.text}}</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
// import "quill/dist/quill.core.css";
// import "quill/dist/quill.snow.css";
// import "quill/dist/quill.bubble.css";
// import { quillEditor } from "vue-quill-editor";
// import vueJsonEditor from "vue-json-editor";
// import select_ajax from "@/components/form_item/select_ajax.vue";
// import input_find_vague from "@/components/form_item/input_find_vague.vue";
// import json_editor from "@/components/form_item/json_editor.vue";
// import upload_img from "@/components/form_item/upload_img.vue";
// import time_period from "@/components/form_item/time_period.vue";
export default {
  components: {
    //注册组件
    // quillEditor,
    // vueJsonEditor,
    // select_ajax,
    // input_find_vague,
    // json_editor,
    // upload_img,
    // time_period
  },
  mounted() {

    this.spanIndex = Math.floor(24 / this.cf.col_span);
  },

  props: {
    cf: {
      type: Object,
      default() {
        return {
          btns: [
            { text: "提交", event: "submit", type: "primary", validate: true },
            { text: "取消", event: "cancel" }
          ],
          col_span: null
        };
      }
    },
    value: Object
    // formData: Object
  },
  data() {
    return {
      spanIndex: null,
      isReadyFormData: false, //表单初始化数据是否已备好的逻辑标记
      formDataNeed: this.value,
      editorOption: {
        //编辑器的配置
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"],
            ["link", "image", "video"]
          ]
        }
      }
    };
  },
  created() {},

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.clear {
  clear: both;
}
</style>
