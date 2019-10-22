<template>
  <div class="franch-box">
    <div class="franch-login-box">
      <div class="franch-login-user-img-box">
        <div class="franch-login-user-img el-icon-s-custom"></div>
      </div>
      <div class="franch-login-title">唐球加盟商后台登录</div>
      <div class="demo-ruleForm">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="0">
          <el-form-item prop="userName">
            <div class>
              <el-input v-model.number="ruleForm.userName" placeholder="赞助商名称">
                <!-- <template slot="prepend">管理账户</template> -->
              </el-input>
            </div>
          </el-form-item>
          <el-form-item prop="passWord">
            <el-input v-model="ruleForm.passWord" placeholder="请输入密码" show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="WP100" @click="submitForm('ruleForm')">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    var validateuserName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入加盟商名称"));
      } else {
        callback(); //通过校验
      }
    };
    var validatepassWord = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      }
      // else if (!regpassWordword.test(value)) {
      //   callback(new Error("密码格式不合规,请设置8-20位，英文字母+数字的组合"));
      // }
      else {
        callback(); //通过校验
      }
    };

    return {
      ruleForm: {
        //表单数据.
        userName: "",
        passWord: ""
      },
      rules: {
        //校验规则，需要定在el-form的rules属性上
        // validateuserName校验器是一个回调函数
        // trigger: "blur" 规则的触发方式，失焦事件
        userName: [{ validator: validateuserName, trigger: "blur" }],
        passWord: [{ validator: validatepassWord, trigger: "blur" }]
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs.ruleForm;
      this.$refs["ruleForm"];

      this.$refs.ruleForm.validate(valid => {
        //表单组件执行validate校验方法
        if (valid) {
          //如果validate为真执行以下放方法
          this.franchiseeLogin();
        }
      });
    },
   async franchiseeLogin(){
        let {data} = await axios({
        //请求接口
        method: "post",
        url: PUB.domain + "/crossList?page=tangball_franchisee",
        data: { findJson: {
            name:this.ruleForm.userName,
            password:this.ruleForm.passWord
        }}
      }).catch(function(error) {
        alert("异常:" + error);
      });
      if (data.list.length>0) {
          this.$message.success("登录成功");
          localStorage.franchisee_isLogin = 1
          localStorage.franchisee_name = this.ruleForm.userName;
          this.$router.push({ path: "/franchisee_home" });
      }else{
          alert("账号或密码不正确，请重新输入")
          this.ruleForm.userName = ''
          this.ruleForm.passWord = ''
      }
        
    }
  },
  created() {
    // console.log(localStorage.franchisee_isLogin);
    
      if (localStorage.franchisee_isLogin == 1) {
          this.$router.push({ path: "/franchisee_home" });
      }
  }
};
</script>

<style scoped>
body,
html {
  height: 100%;
}
.franch-box {
  height: 100%;
  background-color: rgb(147, 222, 254);
}
.franch-login-box {
  position: fixed;
  top: 30%;
  left: 39%;
  width: 22%;
  height: 350px;
  border-radius: 10px;
  background-color: #ffffff;
  padding: 0 25px;
}
.franch-login-user-img-box {
  margin-left: 30%;
  width: 150px;
  height: 150px;
  background-color: rgb(147, 222, 254);
  margin-top: -75px;
  border-radius: 50%;
  padding: 10px;
}
.franch-login-user-img {
  height: 130px;
  width: 130px;
  text-align: center;
  line-height: 130px;
  border-radius: 50%;
  background-color: #ffffff;
  font-size: 50px;
  color: rgb(147, 222, 254);
}
.franch-login-title {
  margin-top: 10px;
  font-size: 20px;
  line-height: 50px;
  font-weight: 700;
}
.demo-ruleForm {
  margin: 10px 10px;
}
</style>