<template>
  <div class="app_contaner">
    <div class="mask"></div>
    <div class="loginBox">
      <el-form ref="loginForm" :model="loginForm" :rules="loginFormRules">
        <el-form-item prop="username">
          <el-input
            prefix-icon="iconfont icon-dengluyemianyonghuming"
            v-model="loginForm.username"
            placeholder="请输入用户名"
          >
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            prefix-icon="iconfont icon-suo"
            v-model="loginForm.password"
            autocomplete="new-password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item prop="validCode">
          <div style="display: flex">
            <el-input
              prefix-icon="iconfont icon-ERP_yanzhengma"
              v-model="loginForm.validCode"
              style="width: 50%"
            ></el-input>
            <div @click="refreshIdentifyCode" class="codeValidate">
              <SIdentify :identifyCode="identifyCode"></SIdentify>
            </div>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="loginBtn" @click="login()">Login</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import SIdentify from "./verificationCode.vue";
export default {
  name: "login",
  components: { SIdentify },
  data() {
    let validateCode = (rule,value,callback) => {
      if(value != this.identifyCode) {
        return callback(new Error('验证码错误'))
      }else{
        callback()
      }
    }
    return {
      loginForm: {
        username: "admin",
        password: "123456",
        validCode: "",
      },
      loginFormRules: {
        username: [
          { required: true, message: "登录用户名不能为空", trigger: "blur" },
        ],
        password: [
          { required: true, message: "登录密码不能为空", trigger: "blur" },
        ],

        validCode: [
          { required: true, message: "验证码不能为空", trigger: "blur" },
          { validator:validateCode, trigger: "blur" },
        ],
      },
      identifyCode: "", //密码登录图形验证码
      identifyCodes: "1234567890abcdefghijklmnopqrstuvwxyz", //生成图形验证码的依据
    };
  },
  mounted() {
    // 初始化验证码
    this.identifyCode = "";
    this.makeIdentifyCode(4);
  },
  computed: {},
  methods: {
    // 登录
    login(){
      // this.$refs['loginForm'].validate(valid => {
      //   if(valid){
         this.$message.success('登录成功');
                    localStorage.setItem('ms_username', this.loginForm.username);
                    this.$router.push('/');
      //   }
      // })
    },
    // 刷新验证码
    refreshIdentifyCode() {
      this.identifyCode = "";
      this.makeIdentifyCode(4);
    },
    // 生成4位数的随机验证码
    makeIdentifyCode(l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode +=
          this.identifyCodes[this.randomNum(0, this.identifyCodes.length)];
      }
      console.log(this.identifyCode)
    },
    // 生成单个验证码
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
  },
};
</script>
<style lang='scss' scoped>
// el样式
::v-deep .el-input__prefix {
  left: 12px;
}
::v-deep .el-input--prefix .el-input__inner {
  padding-left: 40px;
}
.app_contaner {
  background: url("../../assets/images/bg.png") no-repeat center;
  position: relative;
  height: 100%;
  .mask {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background: rgba(255, 255, 255, 0.7);
  }
  .loginBox {
    width: 25%;
    height: 35%;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    background: #fff;
    padding: 50px;
    border-radius: 10px;
    box-sizing: border-box;
    box-shadow: 0px 0px 20px 0 rgba($color: #000000, $alpha: 0.5);
    .codeValidate {
      cursor: pointer;
    }
    .loginBtn {
      width: 100%;
      margin-top: 30px;
    }
  }
}
</style>
