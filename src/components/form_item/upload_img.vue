<template>
  <div class>
    <el-upload
      action="http://www.dmagic.cn/ServiceItem36"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :on-success="uploaded"
      :file-list="valueNeed"
      name="ImgParame"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt>
    </el-dialog>
  </div>
</template>

<script>
// action="https://jsonplaceholder.typicode.com/posts/"
export default {
  props: {
    value: [Array]
  },
  data() {
    return {
      valueNeed: this.value,
      dialogImageUrl: "",
      dialogVisible: false
    };
  },
  methods: {
    //处理图片上传后的同步
    uploaded(response) {
      console.log("response", response);
      let url = response.url.replace("./", "");
      url = `http://www.dmagic.cn/${url}`;
      this.valueNeed.push({ url });
      this.$emit("input", this.valueNeed); //触发双向绑定
    },

    //处理图片删除后的同步
    handleRemove(file, fileList) {
      console.log(file, fileList);
      this.valueNeed = fileList;
      this.$emit("input", this.valueNeed); //触发双向绑定
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  },
  async created() {
    //如果{value}不存在
    if (!this.value) {
      this.valueNeed = [];
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
