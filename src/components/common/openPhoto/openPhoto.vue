<template>
  <div class>
    <!--弹出图片显示 -->
    <el-dialog
      custom-class="n-el-dialog"
      width="70%"
      title="显示大图"
      :close-on-press-escape="false"
      :visible.sync="showDialogBigImg"
    >
      <div class="TAC">
        <img :src="urlBigImg" alt />
      </div>
    </el-dialog>
    <div>
      <img
        @click.stop="showBigImg(url)"
        :src="urlBigImg"
        alt
        class="W100 H100"
      />
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    showBigImg(url) {
      this.showDialogBigImg = true;
      this.urlBigImg = url;
    }
  },
  data() {
    return {
      album: [],
      urlBigImg: "",
      showDialogBigImg: false
    };
  }
};
</script>
