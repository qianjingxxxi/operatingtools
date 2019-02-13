<template>
  <div>
    <!-- 标题栏 -->
    <header>
      <a @click="backpage">
        <img src="../assets/backIcon.png">
      </a>
      <p>编辑</p>
    </header>
    <!-- 表单填写 -->
    <section class="formData ignore">
      <div>
        <label>
          <i></i>渠道：
        </label>
        <el-radio-group v-model="checkchannel">
          <el-radio :label="0">平台简历</el-radio>
          <el-radio :label="1">转介绍</el-radio>
          <el-radio :label="2">自主开发</el-radio>
          <el-radio :label="3">资源库</el-radio>
        </el-radio-group>
      </div>
      <div>
        <label>
          <i>*</i>联系电话：
        </label>
        <el-input v-model="tel" placeholder="请输入联系电话">{{datas.phone}}</el-input>
      </div>
      <div>
        <label>
          <i>*</i>姓名：
        </label>
        <el-input v-model="name" placeholder="请输入姓名"></el-input>
      </div>
      <span class="job-time">
        <label>
          <i></i>性别：
        </label>
        <el-radio-group v-model="sex">
          <el-radio :label="0">男</el-radio>
          <el-radio :label="1">女</el-radio>
        </el-radio-group>
      </span>
      <div>
        <label>
          <i>*</i>居住地：
        </label>
        <el-input v-model="keyword" placeholder="请输入详细地址"></el-input>
        <span v-if="false">{{selectTip.location}}</span>
        <!-- <span v-if="false">请输入详细地址</span> -->
        <ul class="tips" v-if="tipstoggle">
          <li
            class="tip"
            v-for="(tip, index) in tips"
            @click="selectTips(index)"
            v-bind:key="index"
          >
            <div>{{tip.name}}</div>
            <div class="address">{{ tip.district + tip.address }}</div>
          </li>
        </ul>
      </div>
      <div>
        <label>
          <i>*</i>工作经历：
        </label>
        <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4}"
          placeholder="如 2018.01-2019.01  永辉超市配送员"
          v-model="wockexp"
        ></el-input>
      </div>
      <div class="selectcheckbox dispositiontag">
        <label>
          <i>*</i>性格标签：
        </label>
        <el-checkbox-group class="selectlabel" v-model="checktag">
          <el-checkbox label="老实"></el-checkbox>
          <el-checkbox label="外向"></el-checkbox>
          <el-checkbox label="热情"></el-checkbox>
          <el-checkbox label="勤奋"></el-checkbox>
          <el-checkbox label="滑头"></el-checkbox>
          <el-checkbox label="自私"></el-checkbox>
          <el-checkbox label="易怒"></el-checkbox>
          <el-checkbox label="冷漠"></el-checkbox>
          <el-checkbox label="迟钝"></el-checkbox>
          <el-checkbox label="肯学习"></el-checkbox>
        </el-checkbox-group>
      </div>
      <span class="job-time">
        <label>
          <i></i>可用时间：
        </label>
        <el-radio-group v-model="workTime">
          <el-radio :label="1">全职</el-radio>
          <el-radio :label="0">兼职</el-radio>
        </el-radio-group>

        <div class="part-time-job" v-if="!workTime">
          <ul class="job-week">
            <li></li>
            <li>星期一</li>
            <li>星期二</li>
            <li>星期三</li>
            <li>星期四</li>
            <li>星期五</li>
            <li>星期六</li>
            <li>星期日</li>
          </ul>
          <div class="job-section">
            <ul>
              <li>上午</li>
              <li>下午</li>
              <li>晚上</li>
            </ul>
            <el-checkbox-group class="job-check" v-model="jobtime" ref="calendar">
              <el-checkbox label="0"></el-checkbox>
              <el-checkbox label="1"></el-checkbox>
              <el-checkbox label="2"></el-checkbox>
              <el-checkbox label="3"></el-checkbox>
              <el-checkbox label="4"></el-checkbox>
              <el-checkbox label="5"></el-checkbox>
              <el-checkbox label="6"></el-checkbox>
              <el-checkbox label="7"></el-checkbox>
              <el-checkbox label="8"></el-checkbox>
              <el-checkbox label="9"></el-checkbox>
              <el-checkbox label="10"></el-checkbox>
              <el-checkbox label="11"></el-checkbox>
              <el-checkbox label="12"></el-checkbox>
              <el-checkbox label="13"></el-checkbox>
              <el-checkbox label="14"></el-checkbox>
              <el-checkbox label="15"></el-checkbox>
              <el-checkbox label="16"></el-checkbox>
              <el-checkbox label="17"></el-checkbox>
              <el-checkbox label="18"></el-checkbox>
              <el-checkbox label="19"></el-checkbox>
              <el-checkbox label="20"></el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
      </span>
      <div class="borderNone">
        <label>
          <i></i>备注：
        </label>
        <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4}"
          placeholder
          v-model="remark"
        ></el-input>
      </div>
      <el-row class="submitBtn borderNone">
        <el-button type="primary" @click="submitform">提交</el-button>
      </el-row>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import _ from "lodash";
export default {
  data() {
    return {
      sex: 0,
      workTime: 1,
      checktag: [],
      name: "",
      tel: "",
      checkchannel: 0,
      keyword: "",
      tips: [],
      selectTip: "",
      tipstoggle: false,
      wockexp: "",
      remark: "",
      jobtime: [],
      showjobtime: false,
      tags: "",
      datas: ""
    };
  },
  watch: {
    tel() {
      if (this.tel.length == 11) {
        let url = this.httpsBasic.httpsBasic + "";
        console.log(1);
      }
    },
    keyword: function() {
      this.debounce();
    }
  },
  methods: {
    selectChannel: () => console.log("a"),
    backpage() {
      this.$router.go(-1); //返回上一层
    },
    submitform() {
      let url = this.httpsBasic.httpsBasic + "interview/insert";
      let _this = this;
      this.tags = this.checktag.join(",");
      if (
        this.tags != "" &&
        this.name != "" &&
        this.tel != "" &&
        this.keyword != "" &&
        this.wockexp != ""
      ) {
        // console.log(this.jobtime);
        axios
          .post(url, {
            token: window.localStorage.getItem("operatingToken"),
            origin: this.checkchannel,
            phone: this.tel,
            name: this.name,
            sex: this.sex,
            address: this.selectTip.location,
            work_experience: this.wockexp,
            tag: this.tags,
            remark: this.remark,
            is_full_time: this.workTime,
            able_work_time: [
              1,
              1,
              1,
              1,
              1,
              1,
              1,
              1,
              1,
              1,
              1,
              1,
              1,
              1,
              1,
              1,
              1,
              1,
              1,
              1,
              1,
              1
            ]
          })
          .then(function(response) {
            if (response.data.code == 1001) {
              //  _this.$router.push({ name: "Resourcelib"});
              // _this.$router.push("resourcelib");
            } else {
              _this.$message.error(response.data.msg);
            }
            console.log(response);
          })
          .catch(function(error) {
            console.log(error);
          });
      } else {
        _this.$message.warning("资料未填写完整");
      }
    },
    async search(keyword) {
      const url = "https://restapi.amap.com/v3/assistant/inputtips";
      const params = new URLSearchParams();
      const _this = this;
      params.append("keywords", keyword);
      // 开发者key
      params.append("key", "0474a745d094cec483b7f9f988ba8216");
      params.append("output", "JSON");
      const { data } = await axios.get(`${url}?${params.toString()}`);
      if (data.status === "1") {
        this.tips = data.tips;
        if (data.tips.length > 0) {
          _this.tipstoggle = true;
        } else {
          _this.tipstoggle = false;
        }
      }
    },
    selectTips(index) {
      this.tipstoggle = false;

      console.log(this.tipstoggle);
      this.selectTip = this.tips[index];
      if (this.selectTip.location.length > 0) {
        this.keyword = this.tips[index]["name"];
      } else {
        this.$message.error("请输入详细地址");
        // this.keyword=""
      }
      console.log(this.selectTip.location.length);
    },
    getData() {
      const url = this.httpsBasic.httpsBasic + "eguard/selectInfo";
      const _self = this;
      axios
        .get(url, {
          params: {
            token: window.localStorage.getItem("operatingToken"),
            uuid: this.$route.params.uuid
          }
        })
        .then(function(res) {
          if (res.data.code == 1001) {
            _self.datas = res.data.data;
            console.log(_self.datas)
          } else {
            _self.$message.error(res.data.msg);
          }
          console.log(res);
        })
        .catch(function(error) {
          _self.$message.error(error);
        });
    }
  },
  mounted() {
    // console.log(this.$refs.calendar);
    this.getData();
    // 限流，当用户停止输入0.8s后请求，如果连续输入的情况下不请求api
    this.debounce = _.debounce(() => this.search(this.keyword), 800);
  },
  computed: {
    ...mapState({
      token: state => state.auth.token
    })
  }
};
</script>


<style scoped lang="less" >
@import url("../style/basic/basics.less");
@import url("../style/workbench.less");
</style>
<style>
.formData .el-checkbox__label,
.formData .el-radio__label,
.formData .el-input,
.formData .el-textarea {
  font-size: 12px !important;
  color: #556677;
}
.el-input__inner {
  height: 32px;
  line-height: 32px;
}
.el-radio-group {
  line-height: normal;
}
.el-radio {
  line-height: 20px;
}
.selectlabel {
  width: 72%;
}
.job-check {
  width: 95%;
}
.formData .job-check .el-checkbox {
  width: 13.9%;
  border: 1px solid #dcdfe6;
  line-height: 30px;
  text-align: center;
  margin: -1px 0 0 -1px;
}
.formData .job-check .el-checkbox__label {
  font-size: 0 !important;
  padding: 0;
}
.submitBtn {
  justify-content: center;
  margin: 30px 0 90px;
}
.borderNone {
  border-bottom: none !important;
}
.el-message {
  top: 0;
  justify-content: center;
}
/* .selectcheckbox .el-radio{margin-bottom: 6px} */
</style>

