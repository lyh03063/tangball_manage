<template>
  <tr>
    <td class>{{pathNeed}}</td>
    <td class>{{text}}</td>
    <td class="PSR" :class="{'changing':isChanging}" @dblclick="isEdit=true">
      <el-tooltip class="item MR6 PSA L3 T2" effect="dark" placement="left">
        <i class="el-icon-view"></i>
        <div slot="content">
          <pre class="valueShowInTip">{{getValueStr(pathNeed)}}</pre>
        </div>
      </el-tooltip>
      <!-- <i class="el-icon-edit MR6 PSA L3 T16 CurP" @click="isEdit=true">

      </i> -->
      <span class="DPIB valueShow" v-if="!isEdit" >{{valueNeed}}</span>
      <div class="PL18 " v-if="isEdit">
        <!-- -{{editComType}} -->
        

        <input type="number"  v-model.number="valueNeed" class="WP100" v-if="editComType=='number'" @blur="isEdit=false" />
        <textarea  v-model="valueNeed" class="WP100" v-if="editComType=='text'" @blur="isEdit=false" ></textarea>
      <json_editor  v-model="valueNeed" class="WP100" v-if="editComType=='json'" @blur="isEdit=false" ></json_editor>
        </div>
  
    </td>
  </tr>
</template>

<script>
import json_editor from "@/components/form_item/json_editor.vue";
export default {
  components: {
    //注册组件
    json_editor
  },
mixins: [MIX.form_item],//混入
  props: ["path", "text", "value"],
  data() {
    return {
      isEdit:false,
      pathNeed: this.path,
      isChanging: false,
      editComType:"text"
    };
  },
  watch: {
    value: {
      async handler(newName, oldName) {
         this.addClassChange ()//调用：{切换样式防抖函数}

     let type = util.type(this.value);
      let arrType = ["object", "array"];
      if (arrType.includes(type)) {
        
        this.editComType = "json"; //转成字符串
      } else if (type=="number") {
        this.editComType = "number"; //转成字符串
      } else {
        this.editComType = "text"; //转成字符串
      }




      },
      immediate: true,
      deep: true
    }
  },

  methods: {
    async addClassChange() {
      this.isChanging = true;
      await util.timeout(300); //延迟
      this.isChanging = false;
    },
    getValueStr(path) {
      let data = this.valueNeed;
      let type = util.type(data);
      let arrType = ["object", "array"];
      if (arrType.includes(type)) {
        //如果类型是对象或数组
        data = JSON.stringify(data, null, 4); //{Json对象转换Json字符串函数}-后面两个参数可以设置缩进
      } else {
        data += ""; //转成字符串
      }
      return data;
    },
    // getValue(path) {
    //   if (this.value) {
    //     //如果v-model有绑定
    //     return this.value;
    //   }
    //   // let objDebugList = this.$parent;
    //   // let objNeed = objDebugList.objNeedDebug; //需要调试的组件对象
    //   // //变量：{根据属性路径获取到对应的属性值}
    //   // //lodash.get函数*****
    //   // let isData = lodash.has(objNeed.$data, path); //变量：{是否为data},通过lodash.has方法来判断

    //   // let value;
    //   // //如果path在data中存在，则在data中读取，否则从props中读取
    //   // if (isData) {
    //   //   value = lodash.get(objNeed.$data, path);
    //   // } else {
    //   //   value = lodash.get(objNeed.$props, path);
    //   // }

    //   // return value;
    // }
  },
  created() {
    //获取v-model变量名（表达式）
    this.pathNeed =
      this.pathNeed || lodash.get(this, "$vnode.data.model.expression");
     
    //切换样式防抖函数
    // this.changeDebounce = lodash.debounce(this.addClassChange, 300);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.valueShow {
  width: 100%;
  overflow-y: auto;
  max-height: 50px;
  padding: 0 0 0 18px;
}



.valueShowInTip {
  overflow-y: auto;
  max-height: 350px;
  font-size: 16px;
}
table.n-table.n-table-debug td,
table.n-table.n-table-debug th {
  padding: 3px;
}
.changing {
  background: #f60;
  color: #fff;
}
</style>
