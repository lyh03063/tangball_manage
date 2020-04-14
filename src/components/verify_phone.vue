<template>
  <div class="phone-box">
    <div class="input-box">
      <el-input v-model="phone" placeholder="请输入手机号" @change="verigyPhone"></el-input>
    </div>
    <div class="rules-box">
      <div v-if="showPhoneError">手机号格式不正确,请重新输入</div>
      <div v-if="showPhoneExist">改手机号已经隶属于某个加盟商，无法再录入</div>
    </div>
    <el-dialog
      title="修改球员信息"
      :visible.sync="showModifyMember"
      v-if="showModifyMember"
      width="60%"
      append-to-body
    >
      <dm_dynamic_form
        v-model="modifyMemberMsg"
        :cf="cfModifyMember"
        @submit="modifyMember"
        @cancel="showModifyMember=false"
      ></dm_dynamic_form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "verify_phone",
  props: ["value"],
  data() {
    return {
      phone: this.value,
      showPhoneError: false,
      showPhoneExist: false,
      showModifyMember: false,
      cfModifyMember: {
        formItems: [
          {
            label: "所属加盟商",
            prop: "franchiseeId",
            type: "select",
            ajax: {
              url: "/crossList?page=tangball_franchisee",
              keyLabel: "name",
              keyValue: "P1"
            }
          },
          {
            label: "所属球场",
            prop: "venueId",
            type: "select",
            ajax: {
              url: "/crossList?page=tangball_venue",
              keyLabel: "name",
              keyValue: "P1"
            }
          }
        ],
        btns: [
          { text: "修改", event: "submit", type: "primary", validate: true },
          { text: "取消", event: "cancel" }
        ]
      },
      modifyMemberMsg: {}
    };
  },
  methods: {
    async modifyMember() {
      let { data } = await axios({
        method: "post",
        url: PUB.domain + "/crossModify?page=tangball_member",
        data: {
          findJson: {
            P1: this.modifyMemberMsg.P1
          },
          modifyJson: this.modifyMemberMsg
        }
      }).catch(() => {});
      this.$message.success("修改成功");
      this.showModifyMember = false;
      //对应的文件列表更新数据
      this.$emit("closeAddDialog");
      this.$emit("getDataList");

      // this.$refs.member.getDataList()
    },
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
        if (data.list.length > 0) {
          if (data.list[0].franchiseeId) {
            this.showPhoneExist = true;
            this.phone = "";
            this.$emit("input", this.phone);
          } else {
            this.$confirm(
              "该手机号球员已经录入球员信息库,是否添加到自己名下?",
              "提示",
              {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
              }
            )
              .then(() => {
                this.modifyMemberMsg = data.list[0];
                this.showModifyMember = true;
              })
              .catch(() => {
                this.phone = "";
                this.$emit("input", this.phone);
              });
          }
        } else {
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
  flex: 0 0 15%;
}
.rules-box {
  flex: 0 0 50%;
}
.rules-box div {
  padding-left: 5px;
  color: red;
}
</style>