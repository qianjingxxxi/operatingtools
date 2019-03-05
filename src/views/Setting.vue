<template>
  <div class="fontsize">
    <!-- 标题栏 -->
    <header>
      <a @click="backpage">
        <img src="../assets/backIcon.png">
      </a>
      <p>设置</p>
    </header>
    <!-- 内容     -->
    <section class="container">
      <hr>
      <router-link to="/changepassword">
        <p>修改密码</p>
        <img src="../assets/user/jiantouzuo.png" alt="arrow">
      </router-link>
      <a>
        <p>当前版本</p>
        <span>1.2.2</span>
      </a>
      <a class="quit" @click="quitHref">退出登录</a>
    </section>
  </div>
</template>

<style scoped lang="less" >
@import url("../style/basic/basics.less");
@import url("../style/Setting.less");
</style>
<script>
import axios from "axios";
export default {
  methods: {
    backpage() {
      this.$router.go(-1); //返回上一层
    },
    quitHref(){
      let url = this.httpsBasic.httpsBasic + "logout";
      let _this=this
      axios.post(url,{
        token:window.localStorage.getItem("operatingToken")
      }).then(function(response){
        if(response.data.code==1001){
          _this.$router.push("/")
        }else{
          _this.$message.error(response.data.msg)
        }
      }).catch(function(error){
          _this.$message.error(response.data.msg)
      })
    }
  }
};
</script>


