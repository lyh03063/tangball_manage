<template>
  <el-form
    ref="form"
    :model="value"
    :label-width="cf.labelWidth||'100px'"
    :size="cf.size||'small'"
    :inline="cf.inline"
  >
    <template v-for="item in cf.formItems">
      <el-form-item
        :label="item.label"
        :prop="item.prop"
        :rules="item.rules||[]"
        v-if="satisfyTerm(item)"
        :key="item.prop"
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
    </template>

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
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";
import vueJsonEditor from "vue-json-editor";
import select_ajax from "../form_item/select_ajax.vue";
import input_find_vague from "../form_item/input_find_vague.vue";
import json_editor from "../form_item/json_editor.vue";
import upload_img from "../form_item/upload_img.vue";
import time_period from "../form_item/time_period.vue";
export default {
  components: {
    //注册组件
    quillEditor,
    vueJsonEditor,
    select_ajax,
    input_find_vague,
    json_editor,
    upload_img,
    time_period
  },

  props: {
    cf: {
      type: Object,
      default() {
        return {
          btns: [
            { text: "提交", event: "submit", type: "primary", validate: true },
            { text: "取消", event: "cancel" }
          ]
        };
      }
    },
    value: Object
    // formData: Object
  },
  data() {
    return {
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
  watch: {
    formDataNeed: {
      handler(newName, oldName) {
        console.log("formDataNeed changed");
        this.$emit("input", this.formDataNeed);
      }
    }
  },
  methods: {
    satisfyTerm(item) {
      //函数：{返回是否满足显示条件的函数}
      let flag = true;
      //函数定义：{递归检查条件函数}
      let checkTerm = objTerm => {
        let flagIn = true;
        for (var key in objTerm) {
          //遍历term对象
          //QK1:或查询
          if (key == "$or") {
            //或条件
            let arrOr = objTerm[key];//变量：{或条件数组}
            let arrFlagOr = []; //变量：{或条件结果数组}
            //循环：{或条件数组}
            arrOr.forEach(orEach => {
              let flagTemp = checkTerm(orEach); //递归获取***
              arrFlagOr.push(flagTemp);//数组添加元素：{或条件结果数组}
            });
            if (!arrFlagOr.includes(true)) {//如果{或条件结果数组}连一个true都没有
              return false;
            }
          }
          //QK2:{普通查询}
          else {
            let valueTerm = objTerm[key];
            if (valueTerm != this.formDataNeed[key]) {
              return false;
            }
          }
        }
        return flagIn;
      };

      //如果存在term条件
      if (item.term) {
        flag = checkTerm(item.term);
      }


      return flag;
    },
    btnClick(eventName, validate) {
      //Q1：需要校验
      if (validate) {
        //如果{000}000
        this.$refs.form.validate(valid => {
          if (valid) {
            this.$emit(eventName);
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      } else {
        //Q2：不需要校验
        this.$emit(eventName);
      }
    },
    //初始化表单函数
    initForm() {
      console.log("initForm");
      if (this.docGet) {
        //ajax获取到的表单数据存在
        let jsonData = {};
        this.cf.formItems.forEach(itemEach => {
          //循环：{表单字段配置数组}
          jsonData[itemEach.prop] = this.docGet[itemEach.prop];
          //遍历：{文档字段}
          let valCurr = jsonData[itemEach.prop];
          if (util.type(valCurr) == "object" || util.type(valCurr) == "array") {
            //如果是json类型
            var t_json = JSON.stringify(valCurr); //json转字符串
            console.log("t_json", t_json);
          }
        });
        this.formDataNeed = jsonData; //******非得这样，不能属性赋值，否则element表单组件不能输入值，坑!!
      }
      this.isReadyFormData = true; //***表单初始化数据是否已备好的逻辑标记,某些字段需要等待这个标记为true
    }
  },
  async created() {
    this.docGet = this.value || {}; //**** */
    this.cf.formItems.forEach(itemEach => {
      //循环：{表单字段配置数组}c处理默认值
      this.docGet[itemEach.prop] =
        this.value[itemEach.prop] || itemEach.default;
    });

    //如果初始化的ajax地址存在
    if (this.cf.urlInit) {
      let { data } = await axios({
        //请求接口
        method: "post",
        url: this.cf.urlInit,
        data: {
          id: this.value.P1
        } //传递参数
      });
      // console.log("doc", doc);
      this.docGet = data.doc;
    }

    console.log("this.docGet######", this.docGet);
    this.initForm(); //调用：{初始化表单函数}
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
