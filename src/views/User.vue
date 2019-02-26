<template>
  <div class="userbox">
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
     <!-- <section class="workbench workstatistics">
      <h2>今日工作统计</h2>
      <ul>
        <li @click="InterviewHref">
          <p>{{interview}}</p>
          <span>面试</span>
        </li>
        <li>
          <p>{{entry}}</p>
          <span>入职</span>
        </li>
        <li>
          <p>{{visit}}</p>
          <span>拜访</span>
        </li>
        <li>
          <p>{{quit}}</p>
          <span>离职</span>
        </li>
      </ul>
    </section> -->
     <section class="workbench">
      <h2>我的工作台</h2>
      <ul>
        <li @click="resourceHref">
          <a>
            <img src="../assets/user/resource.png" alt="resource">
          </a>
          <p>资源库</p>
        </li>
        <!-- <li>
          <a>
            <img src="../assets/user/enpty.png" alt="interview">
          </a>
          <p>在职管家</p>
        </li> -->
      </ul>
    </section>
  </div>
</template>
<script>
import axios from "axios";
import { mapState } from "vuex";
import { async } from "q";

export default {
  data() {
    return {
      name: "",
      interview: 0,
      quit: 0,
      visit: 0,
      entry: 0
    };
  },
  methods: {
    resourceHref() {
      this.$router.push("resoutcelib");
    },
    InterviewHref() {
      this.$router.push("interview");
    },
    getData() {
      let url =
        this.httpsBasic.httpsBasic +
        "getMyInfo?token=" +
        window.localStorage.getItem("operatingToken");
      let _this = this;
      axios
        .get(url)
        .then(function(response) {
          //  console.log(response);
          if (response.data.code == 1001) {
            _this.name = response.data.data.name;
            // console.log(_this.name);
          } else if (response.data.code == 1010 || response.data.code == 1009) {
            _this.$alert("登录失效或过期，请重新登录", "登录失效", {
              confirmButtonText: "确定",
              callback: action => {
                _this.$message({
                  type: "重新登录",
                  message: _this.$router.push({ name: "Login" })
                });
              }
            });
          } else {
            // console.log(response);
            _this.$message.error(response.data.msg);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    async getWorkNumCount() {
      let date = new Date(),
        Y = String(date.getFullYear()),
        M =
          date.getMonth() + 1 > 9
            ? (M = parseFloat(date.getMonth()) + 1)
            : (M = "0" + parseFloat(date.getMonth() + 1)),
        D = String(date.getDate()),
        start = Y + M + D + "000000",
        end = Y + M + D + "235959";
      const url = this.httpsBasic.httpsBasic + "count/workNumCount";
      const params = new URLSearchParams();
      params.append("start_time", start);
      params.append("end_time", end);
      params.append("token", window.localStorage.getItem("operatingToken"));
      const { data } = await axios.get(`${url}?${params.toString()}`);
      if (data.code == 1001) {
        this.interview = data.data.interview;
        this.entry = data.data.entry;
        this.visit = data.data.visit;
        this.quit = data.data.quit;
      } else {
        this.$message.error(data.msg);
      }
    }
  },
  mounted() {
    this.getWorkNumCount(); //今日数据统计
    this.getData(); //获取基本资料
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
