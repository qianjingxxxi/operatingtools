<template>
  <div>
    <!-- 标题栏 -->
    <header>
      <a @click="backpage">
        <img src="../assets/backIcon.png">
      </a>
      <p>修改密码</p>
    </header>
    <!-- 内容     -->
    <section>
      <div>
        <el-input v-model="password" type="password" placeholder="请输入密码"></el-input>
        <span class="passwordhint" v-show="!passwordhint">密码输入不一致</span>
      </div>
      <hr>
      <div>
        <el-input v-model="passwordConfirm" type="password" placeholder="请再次输入"></el-input>
        <span class="passwordConfirmhint" v-show="!passwordConfirmhint">密码输入不一致</span>
      </div>
      <el-row class="submitBtn">
        <el-button type="primary" @click="submitform">提交</el-button>
      </el-row>
    </section>
  </div>
</template>
<style scoped lang="less">
@import url("../style/basic/basics.less");
@import url("../style/Changepassword.less");
</style>
<style lang="less">
.el-input {
  width: 100%;
}
.el-input__inner {
  border-radius: 0;
  // border-left:none;
  // border-right:none;
}
</style>

<script>
import axios from "axios";
export default {
  data() {
    return {
      password: "",
      passwordConfirm: "",
      passwordhint: true,
      passwordConfirmhint: true
    };
  },
  watch: {
    password() {
      if (this.password !== "" && this.passwordConfirm != "") {
        if (this.password === this.passwordConfirm) {
          this.passwordhint = true;
          this.passwordConfirmhint = true;
        } else {
          this.passwordhint = false;
        }
      }
    },
    passwordConfirm() {
      if (this.password !== "" && this.passwordConfirm != "") {
        if (this.password === this.passwordConfirm) {
          this.passwordConfirmhint = true;
          this.passwordhint = true;
        } else {
          this.passwordConfirmhint = false;
        }
      }
    }
  },
  methods: {
    backpage() {
      this.$router.go(-1);
    },
    submitform() {
      if (this.password !== "" && this.passwordConfirm != "") {
        if (this.passwordhint && this.passwordConfirmhint) {
          let url = this.httpsBasic.httpsBasic + "updatePassword";
          let _this = this;
          axios
            .post(url, {
              token: window.localStorage.getItem("operatingToken"),
              password: this.password
            })
            .then(function(res) {
              if (res.data.code == 1001) {
                _this.$message.success("密码修改成功");
                _this.$router.push({ path: "/changepassword" });
              } else {
                _this.$message.error(res.data.msg);
              }
              // console.log(res)
            })
            .catch(function(error) {
              _this.$message.error(error);
              // console.log(error)
            });
        }
      } else {
        this.$message.error("密码未填写完整");
      }
    }
  }
};
</script>

