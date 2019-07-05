<template>
  <span>
    <slot :doc="doc">{{text}}</slot>
  </span>
</template>

<script>
export default {
  props: {
    id: [String, Number],
    ajax: {
      default: function() {
        return {
          url: "",
          param: {}
        };
      }
    },
    idKey: {
      default: "id"
    },
    page: {
      default: "tangball_franchisee"
    },
    populateKey: {
      default: "name"
    }
  },
  data() {
    return {
      text: "",
      doc: null
    };
  },
  watch: {
    id: {
      async handler(newName, oldName) {
        this.ajaxGetData();
      }
      // immediate: true
      // deep: true
    }
  },
  methods: {
    async ajaxGetData() {
      if (!this.ajax.url) return;
      if (!this.id) return;
      this.keyExit = `${this.page}__${this.idKey}__${this.id}`;

      //函数：{获取缓存数据的函数}
      var getExitDoc = () => {
        console.log("getExitDoc####");
        let docExit = PUB_ajax_populate[this.keyExit];
        //如果为pending...，表示请求已经发出但还没有完成
        getExitDoc();
        // if (docExit == "pending...") {
        //   console.log("pending...,等待返回结果");
        //   setTimeout(() => {
        //     //延迟函数
        //     getExitDoc();
        //   }, 100);
        // } else {
        //   //请求已完成
        //   console.log("获取到缓存的数据");
        //   this.text = docExit[this.populateKey];
        // }
      };
      console.log(
        "PUB_ajax_populate[this.keyExit]",
        PUB_ajax_populate[this.keyExit]
      );
      if (PUB_ajax_populate[this.keyExit]) {
        return getExitDoc(); //调用：{获取缓存数据的函数}
      }

      /**以下是在没用读取到缓存数据，才发送ajax请求 */
      PUB_ajax_populate[this.keyExit] = "pending...";
      this.ajax.param = this.ajax.param || {};
      this.ajax.param[this.idKey] = this.id;
      console.log("this.ajax.url######", this.ajax.url);

      let { data } = await axios({
        //请求接口
        method: "post",
        url: this.ajax.url,
        data: this.ajax.param //传递参数
      }).catch(function(error) {
        alert("异常:" + error);
      });

      this.doc = data.doc || {};

      //Q1:{文档存在}
      if (this.doc) {
        this.text = this.doc[this.populateKey];
        PUB_ajax_populate[this.keyExit] = this.doc; //缓存数据
      } else {
        //Q2:{文档不存在}
        this.text = "[error]";
        PUB_ajax_populate[this.keyExit] = {}; //缓存数据
      }
    }
  },
  created() {
    window.PUB_ajax_populate = window.PUB_ajax_populate || {};
    if (this.page) {
      //如果{000}000
      this.ajax.url = `http://120.76.160.41:3000/crossDetail?page=${this.page}`;

      this.ajaxGetData();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
