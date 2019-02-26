<template>
  <div class="loginForm loginfromnone">
    <a class="logo">
      <img src="../assets/logo.png" alt="logo">
    </a>
    <div class="userName">
      <input type="text" v-model="userName" placeholder="请输入账号">
      <span class="mark-error">请输入账号</span>
    </div>
    <div class="userPassword">
      <input type="password" v-model="userPassword" placeholder="默认密码：手机号后六位">
      <span class="mark-error">请输入密码</span>
    </div>
     <el-checkbox class="ignore" v-model="rememberID">记住账号和密码</el-checkbox>
    <div class="submitBtn">
      <el-button @click="loginHref">登录</el-button>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import {mapMutations, mapState} from 'vuex';

export default {
  data() {
    return {
      userName: "",
      userPassword: "",
      visible: false,
      rememberID:true
    };
  },
  methods: {
    ...mapMutations([
      'setToken',
    ]),
    loginHref() {
      let _this = this;
      // console.log($route.path=""), 
      let url = this.httpsBasic.httpsBasic + "loginByPhonePassword";

      axios
        .post(url, {
          phone: this.userName,
          password: this.userPassword
        })
        .then(function(response) {
          // console.log(response)
          if (response.data.code == "1001") {
              _this.setToken({
              token: response.data.data.token,
            });
            window.localStorage.setItem("operatingToken", response.data.data.token);
            // //判断是否保存用户名
            if(_this.rememberID){
                window.localStorage.setItem("operatingName", _this.userName)
                window.localStorage.setItem("operatingPassword",_this.userPassword);
            }else {
                window.localStorage.removeItem('operatingName')
                window.localStorage.removeItem('operatingPassword')
            }

            // console.log(_this.token);

            _this.$router.push("user");
          } else {
            _this.$message.error(response.data.msg);
          }
        })
        .catch(function(error) {
          // console.log(error);
        });
    }
  },
  mounted() {
    if(window.localStorage.getItem('operatingName')!=null){
        this.userName=window.localStorage.getItem('operatingName');
        this.userPassword=window.localStorage.getItem('operatingPassword');
    }else{
      this.userName="";
      this.userPassword="";
    }
  },
  computed: {
    ...mapState({
      token: state => state.auth.token,
    })
  },
  components: {}
};
</script>
<style lang="less">
@import url("../style/basic/reset.less");
.ignore .el-checkbox__label{
    font-size: 16px
}
</style>

<style scoped lang="less">
@import url("../style/login.less");
</style>
