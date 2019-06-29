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

      },
      // immediate: true
      // deep: true
    }
  },
  methods: {
    async ajaxGetData() {
      this.ajax.param = this.ajax.param || {};
      this.ajax.param[this.idKey] = this.id;
      let { data } = await axios({
        //请求接口
        method: "post",
        url: this.ajax.url,
        data: this.ajax.param //传递参数
      }).catch(function(error) {
        alert("异常:" + error);
      });

      this.doc = data.doc||{};
      //Q1:{文档存在}
      if (this.doc) {
        console.log("this.doc#####", this.doc);
        this.text = this.doc[this.populateKey];
      } else {
        //Q2:{文档不存在}
        this.text = "[error]";
      }
    }
  },
  created() {
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
