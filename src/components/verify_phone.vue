<template>
  <div class="phone-box">
    <div class="input-box">
      <el-input v-model="phone" placeholder="请输入手机号" @change="verigyPhone"></el-input>
    </div>
    <div class="rules-box">
      <div v-if="showPhoneError">手机号格式不正确,请重新输入</div>
      <div v-if="showPhoneExist">该手机号球员已经属于其他加盟商,无法录入</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["value"],
  data() {
    return {
      phone: this.value,
      showPhoneError: false,
      showPhoneExist: false
    };
  },
  methods: {
    async verigyPhone() {
      this.showPhoneError = false;
      this.showPhoneExist = false;
      if (
        !/^1([38][0-9]|14[579]|5[^4]|16[6]|7[1-35-8]|9[189])\d{8}$/.test(
          this.phone
        )
      ) {
        this.showPhoneError = true;
        this.phone = "";
        this.$emit("input", this.phone);
      } else {
        let { data } = await axios({
          method: "post",
          url: PUB.domain + "/crossList?page=tangball_member",
          data: {
            findJson: {
              phone: this.phone
            }
          }
        }).catch(() => {});
        if (data.list.length>0) {
            this.showPhoneExist = true
            this.phone = "";
            this.$emit("input", this.phone);
        }else{
            this.$emit("input", this.phone);
        }
        
      }
    }
  },
  created() {}
};
</script>

<style scoped>
.phone-box {
  display: flex;
}
.input-box {
  flex: 0 0 15s%;
}
.rules-box {
  flex: 0 0 50%;
}
.rules-box div {
  padding-left: 5px;
  color: red;
}
</style>