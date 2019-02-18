<template>
  <div>
    <!-- 标题栏 -->
    <header>
      <a @click="backpage">
        <img src="../assets/backIcon.png">
      </a>
      <p>新增</p>
    </header>
    <!-- 表单填写 -->
    <section class="formData ignore">
      <div>
        <label>
          <i>*</i>联系电话：
        </label>
        <el-input v-model="tel" placeholder="请输入联系电话" value></el-input>
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
          <i>*</i>年龄：
        </label>
        <el-input v-model="age" placeholder="请输入年龄" type="number"></el-input>
      </div>
      <div class="selectcheckbox dispositiontag selectbusiness">
        <label>
          <i>*</i>面试业务：
        </label>
        <el-checkbox-group class="selectlabel" v-model="businesses">
          <el-checkbox
            :label="business"
            :checked="businessToggle(business)"
            v-for="(business, index) in businessLabel"
            v-bind:key="index"
          ></el-checkbox>
        </el-checkbox-group>
      </div>
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
      <!-- <div>
        <label>
          <i>*</i>工作经历：
        </label>
        <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4}"
          placeholder="如 2018.01-2019.01  永辉超市配送员"
          v-model="wockexp"
        ></el-input>
      </div>-->
      <span class="wockexp job-time">
        <label>
          <i>*</i>工作经历：
        </label>
        <div>
          <div v-for="(workexpcon,index) in wockexp" v-bind:key="index">
            <el-date-picker
              v-model="workexpcon.wockexptime"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
            <div class="addworkexp" @click="addmodel(workexpcon.addtitle,index)">
              <img :src="workexpcon.addicon">
              <span>{{workexpcon.addtitle}}</span>
            </div>
            <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder
              v-model="workexpcon.wockexpcontent"
            ></el-input>
          </div>
        </div>
      </span>
      <div class="selectcheckbox dispositiontag">
        <label>
          <i>*</i>性格标签：
        </label>
        <el-checkbox-group class="selectlabel" v-model="checktag">
          <el-checkbox
            :label="tag"
            :checked="tagToggle(tag)"
            v-for="(tag, index) in tagLabel"
            v-bind:key="index"
          ></el-checkbox>
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
          <ul>
            <li></li>
            <li>上午</li>
            <li>下午</li>
            <li>晚上</li>
          </ul>
          <div class="job-section">
            <ul class="job-week">
              <li>星期一</li>
              <li>星期二</li>
              <li>星期三</li>
              <li>星期四</li>
              <li>星期五</li>
              <li>星期六</li>
              <li>星期日</li>
            </ul>

            <el-checkbox-group class="job-check" v-model="jobtime">
              <el-checkbox
                :label="index"
                :checked="checkState[index]"
                v-for="(jobcheck,index) in checkState"
                v-bind:key="index"
              ></el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
      </span>
      <span class="job-time">
        <label>
          <i></i>是否可用：
        </label>
        <el-radio-group v-model="is_die">
          <el-radio :label="0">是</el-radio>
          <el-radio :label="1">否</el-radio>
        </el-radio-group>
      </span>
      <div>
        <label>
          <i></i>沟通记录：
        </label>
        <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4}"
          placeholder
          v-model="remark"
        ></el-input>
      </div>
      <div class="qudao">
        <label>
          <i></i>渠道：
        </label>
        <el-radio-group v-model="checkchannel">
          <el-radio :label="0">平台简历</el-radio>
          <el-radio :label="1">转介绍</el-radio>
          <el-radio :label="2">自主开发</el-radio>
          <!-- <el-radio :label="3">资源库</el-radio> -->
        </el-radio-group>
      </div>
      <el-row class="submitBtn borderNone">
        <el-button type="primary" @click="submitform">提交</el-button>
      </el-row>
    </section>
  </div>
</template>

<script>
/* eslint-disable no-console */

import axios from "axios";
import _ from "lodash";
import Vue from "vue";
import BaiduMap from "vue-baidu-map";
Vue.use(BaiduMap, {
  ak: "FP1dPaBGaieVuvaXIticP53c8qxVCiqi"
});
export default {
  data() {
    // 初始化默认全不选中
    let list = [];
    for (let i = 1; i <= 21; i++) {
      list.push(false);
    }
    let tagsbox = [];
    for (let j = 0; j <= 10; j++) {
      tagsbox.push(false);
    }
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
      wockexp: [
        {
          addtitle: "添加",
          addicon: require("../assets/add.png"),
          wockexptime: "",
          start_time: "",
          end_time: "",
          content: ""
        }
      ],
      remark: "",
      jobtime: [],
      showjobtime: false,
      tags: [],
      compute: [
        "0",
        "0",
        "0",
        "0",
        "0",
        "0",
        "0",
        "0",
        "0",
        "0",
        "0",
        "0",
        "0",
        "0",
        "0",
        "0",
        "0",
        "0",
        "0",
        "0",
        "0"
      ],
      datas: "",
      hasdata: false,
      checkState: list,
      checkedtag: tagsbox,
      tagLabel: [
        "老实",
        "外向",
        "热情",
        "勤奋",
        "滑头",
        "自私",
        "易怒",
        "冷漠",
        "迟钝",
        "肯学习"
      ],
      age: "",
      address_d: "",
      createTime: "",
      checkbusiness: [false, false, false],
      businesses: [],
      businessLabel: ["配送", "运维", "物流"],
      businesstag: [],
      is_die: 0
    };
  },
  watch: {
    tel() {
      if (this.tel.length === 11) {
        this.getData();
      } else {
        // this.tel = ""; //电话
        // this.name = ""; //姓名
        // this.sex = 0; //性别
        // this.keyword = ""; //居住地
        // this.wockexp = ""; //工作经历
        // this.remark = ""; //备注
        // this.checkchannel = 0; //渠道
      }
    },
    keyword: function() {
      // event.stopImmediatePropagation();
      this.debounce();
    }
  },
  methods: {
    selectChannel: () => console.log("a"),
    backpage() {
      // this.$router.go(-1); //返回上一层
      this.$router.push({ name: "Resourcelib" });
    },
    tagToggle(tag) {
      if (this.tags.indexOf(tag) != -1) {
        return true;
      } else {
        return false;
      }
    },
    businessToggle(business) {
      if (this.businesstag.indexOf(business) != -1) {
        return true;
      } else {
        return false;
      }
    },
    submitform() {
      let url = this.httpsBasic.httpsBasic + "interview/insert";
      let _this = this;
      this.tags = this.checktag.join(",");
      this.businesstag = this.businesses.join(",");
      // 全职or兼职
      this.jobtime.forEach(v => {
        this.compute[v] = "1";
      });

      for (let i = 0; i < this.wockexp.length; i++) {
        this.wockexp[i].start_time = this.wockexp[i]["wockexptime"][0];
        this.wockexp[i].end_time = this.wockexp[i]["wockexptime"][1];
        this.wockexp[i].content = this.wockexp[i]["wockexpcontent"];
      }
      if (
        this.tags != "" &&
        this.name != "" &&
        this.tel != "" &&
        this.keyword != "" &&
        this.wockexp != "" &&
        this.age != "" &&
        this.wockexp.start_time != "" &&
        this.wockexp.end_time != "" &&
        this.wockexp.content != "" &&
        this.businesstag != ""
      ) {
        // this.compute=this.compute.join(',')

        axios
          .post(url, {
            token: window.localStorage.getItem("operatingToken"),
            origin: this.checkchannel,
            phone: this.tel,
            name: this.name,
            sex: this.sex,
            address: this.keyword,
            address_l_l: this.selectTip.location,
            work_experience: this.wockexp,
            tag: this.tags,
            remark: this.remark,
            is_full_time: this.workTime,
            able_work_time: this.compute,
            age: this.age,
            address_d: this.address_d,
            trade: this.businesstag,
            is_die: this.is_die
          })
          .then(function(response) {
            if (response.data.code == 1001) {
              // _this.$router.push("Workbench");
              _this.$message.success("提交成功");
              setTimeout(() => {
                window.scrollTo(0, 0);
                _this.$router.push({ name: "Resourcelib" });
              }, 2000);
              // setTimeout(() => {
              //
              //   _this.tel = ""; //电话
              //   _this.name = ""; //姓名
              //   _this.sex = 0; //性别
              //   _this.keyword = ""; //居住地
              //   _this.wockexp = ""; //工作经历
              //   _this.remark = ""; //备注
              //   _this.checkchannel = 0; //渠道
              //   _this.jobtime = [];
              //   _this.checktag = [];
              //   _this.workTime = 1;
              //   _this.age = "";
              //   _this.is_die=0;
              //   _this.checkbusiness=[];
              //   _this.businesstag=[]
              // }, 2000);
            } else {
              _this.$message.error(response.data.msg);
            }
            // console.log(response);
          })
          .catch(function(error) {
            _this.$message.error(error);
            // console.log(error);
          });
      } else {
        _this.$message.warning("资料未填写完整");
      }
    },
    async search(keyword) {
      const url = "https://restapi.amap.com/v3/assistant/inputtips";
      const params = new URLSearchParams();
      params.append("keywords", keyword);
      // console.log(keyword)
      // 开发者key
      params.append("key", "0474a745d094cec483b7f9f988ba8216");
      params.append("output", "JSON");
      const { data } = await axios.get(`${url}?${params.toString()}`);
      // console.log(data);
      if (data.status === "1") {
        this.tips = data.tips;
        if (data.tips.length > 0 && !this.hasdata) {
          this.tipstoggle = true;
        } else {
          this.tipstoggle = false;
        }
        setTimeout(() => {
          this.hasdata = false;
        }, 500);
      }
    },
    selectTips(index) {
      // event.stopImmediatePropagation()
      this.selectTip = this.tips[index];
      this.keyword = this.tips[index]["name"];
      this.address_d =
        this.tips[index]["district"] + this.tips[index]["address"];
      this.hasdata = true;
      this.tipstoggle = false;
      //  console.log(this.hasdata)
      if (this.selectTip.location.length > 0) {
      } else {
        // this.$message.error("请输入详细地址");
        // this.keyword=""
      }
    },
    async getData() {
      const url = this.httpsBasic.httpsBasic + "eguard/selectInfo";
      const { data } = await axios.get(url, {
        params: {
          token: window.localStorage.getItem("operatingToken"),
          phone: this.tel
        }
      });

      if (data.code === 1001) {
        this.$message.success("已有该管家信息");
        this.tipstoggle = false;
        this.hasdata = true;
        this.datas = data.data.data;
        this.tel = data.data.phone; //电话
        this.name = data.data.name; //姓名
        this.sex = parseFloat(data.data.sex); //性别
        this.keyword = data.data.address; //居住地
        this.wockexp = data.data.work_experience; //工作经历
        this.remark = data.data.remark; //备注
        this.checkchannel = parseFloat(data.data.origin); //渠道
        this.tags = data.data.tag.split(",");
        this.checktag = this.tags;
        this.age = data.data.age;
        this.is_die = parseFloat(data.data.is_die); //简历是否可用
        this.businesstag = data.data.trade.split(",");
        this.businesses = this.businesstag;
        data.data.is_full_time === "1"
          ? (this.workTime = 1)
          : (this.workTime = 0);
        const len = data.data.able_work_time.length;
        for (let i = 0; i < len; i++) {
          if (data.data.able_work_time[i] === "1") {
            this.checkState[i] = true;
          }
        } //可用时间
        //  console.log(this.checktag)
        // for(let j=0;j<this.tags.length;j++){

        //    console.log(this.tagToggle)
        // }//性格标签
      } else {
        // this.hasdata = false;
      }
    },
    addmodel(add, index) {
      if (add == "添加") {
        this.wockexp.push({
          addtitle: "删除",
          addicon: require("../assets/delete.png"),
          start_time: "",
          end_time: "",
          content: ""
        });
      } else {
        this.wockexp.splice(index, 1);
      }
    }
  },
  mounted() {
    // 限流，当用户停止输入0.8s后请求，如果连续输入的情况下不请求api
    this.debounce = _.debounce(() => this.search(this.keyword), 800);
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
  width: 100% !important;
}
.formData .job-check .el-checkbox {
  width: 13.9%;
  border: 1px solid #dcdfe6;
  line-height: 30px;
  text-align: center;
  margin: -1px -1px 0 0;
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
#app .ignore > .qudao label {
  width: 22%;
  line-height: 22px;
}
.el-checkbox {
  margin-right: 15px;
}
.ignore .el-date-editor .el-range-input {
  width: 40%;
}
.ignore .el-input__inner{
  font-size: 14px
}
.el-range-editor.el-input__inner {
  width: 85%;
  padding: 3px 6px;
}

.el-date-editor .el-range-input,
.el-date-editor .el-range-separator {
  font-size: 12px;
}
.el-range__close-icon {
  background: url(../assets/close.png) no-repeat;
  background-size: 14px;
  background-position: right center;
}
/* .selectcheckbox .el-radio{margin-bottom: 6px} */
.el-picker-panel {
  width: 100vw;
  left: 0;
}
.el-date-range-picker .el-picker-panel__body {
  min-width: 100vw;
}
.el-date-range-picker__header div,
.el-date-range-picker__content.is-right .el-date-range-picker__header div {
  margin: 0;
}
.el-input__icon,
.el-date-editor .el-range-input,
.el-date-editor .el-range-separator {
  height: fit-content !important;
}
.wockexp > div {
  display: inline-block;
  vertical-align: top;
  width: 76%;
  position: relative;
}
.wockexp > div .el-textarea__inner {
  margin-top: 4px;
}
</style>

