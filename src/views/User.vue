<template>
  <div>
    <header>
      <div>
        <a>
          <img class="headerImg" src="../assets/user/header.png" alt="headerBg">
        </a>
        <p>{{name}}</p>
      </div>
      <router-link tag="a" :to="'setting'" class="setting">
        <img src="../assets/user/setting.png" alt="setting">
      </router-link>
    </header>
    <section class="workbench">
      <h2>我的工作台</h2>
      <ul>
        <!-- <li @click="interviewHref">
          <a>
            <img src="../assets/user/interview.png" alt="interview">
          </a>
          <p>招聘</p>
        </li> -->
        <li @click="resourceHref">
          <a>
            <img src="../assets/user/resource.png" alt="resource">
          </a>
          <p>资源库</p>
        </li>
      </ul>
    </section>
  </div>
</template>
<script>
import axios from "axios";
import { mapState } from "vuex";

export default {
  data() {
    return {
      name: ""
    };
  },
  methods: {
    resourceHref() {
      this.$router.push("resoutcelib");
    },
    interviewHref(){
      this.$router.push("workbench");
    }
  },
  mounted() {
    let url =
      this.httpsBasic.httpsBasic +
      "getMyInfo?token=" +
      window.localStorage.getItem("operatingToken");
    let _this = this;
    axios
      .get(url)
      .then(function(response) {
         console.log(response);
        if (response.data.code == 1001) {
          _this.name = response.data.data.name;
          // console.log(_this.name);
        } else if(response.data.code == 1010){
            _this.$alert('登录失效或过期，请重新登录', '登录失效', {
              confirmButtonText: '确定',
              callback: action => {
                _this.$message({
                  type: '',
                  message: _this.$router.push({ name: "Login"})
                });
              }
            })
        }else{
            // console.log(response);
          _this.$message.error(response.data.msg);
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  computed: {
    ...mapState({
      token: state => state.auth.token
    })
  }
};
</script>

<style scoped lang="less">
@import url("../style/User.less");
</style>
