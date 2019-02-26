
<template>
  <div class="resumedetails">
    <!-- 标题栏 -->
    <header>
      <a @click="backpage">
        <img src="../assets/backIcon.png">
      </a>
      <p>管家详情</p>
    </header>
    <hr>
    <!-- content -->
    <section class="container fontsize">
      <div class="resoutcelibinfo">
        <a class="detailsHeader">
          <img src="../assets/details.png" alt>
        </a>
        <div class="basictitle">
          <div>
            <h3>{{datas.name}}</h3>
            <p>{{datas.sex=="0" ? "男":"女"}}</p>
            <span>{{datas.age}}</span>
            <span>岁</span>
          </div>
          <a class="el-icon-phone" :href="'tel:' + datas.phone">{{datas.phone}}</a>
          <p class="address">{{datas.address}}</p>
          <p class="district">{{datas.address_d}}</p>
        </div>
      </div>
      <div class="tagline">
        <label class="tagtitle">适合业务：</label>
        <p>{{datas.trade}}</p>
      </div>
      <div class="evaluatetag tagline">
        <label class="tagtitle">评价标签：</label>
        <ul>
          <li v-for="(tag,index) in tags" v-bind:key="index">{{tag}}</li>
        </ul>
      </div>
      <div class="tagline">
        <label class="tagtitle">工作经历：</label>
        <ul class="workexpbox">
          <li v-for="(workexp,index) in datas.work_experience" v-bind:key="index">
            <span>{{workexp.start_time}}</span>
            <span>{{workexp.start_time==undefined ? "" : "至" }}</span>
            <span>{{workexp.end_time}}</span>
            <span>{{workexp.content}}</span>
          </li>
        </ul>
        <!-- <p>{{datas.work_experience}}</p> -->
      </div>
      <div class="tagline">
        <label class="tagtitle">工作时间：</label>
        <p class="experience">{{datas.is_full_time=="1" ? "全职" : "兼职"}}</p>
        <div class="part-time-job" v-show="showjobtime">
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
            <el-checkbox-group class="job-check" v-model="calendar">
              <el-checkbox
                :label="index"
                v-for="(jobcheck,index) in datas.able_work_time"
                v-bind:key="index"
                :checked="checkState[index]"
                disabled="disabled"
              ></el-checkbox>
            </el-checkbox-group>
          </div>
        </div>
      </div>
      <!-- <div class="tagline">
        <label class="tagtitle">最近一次沟通记录：</label>
        <p>{{datas.remark}}</p>
      </div> -->
      <div class="tagline line-none">
        <label class="tagtitle">面试记录：</label>
        <ul class="interview">
          <li v-for="(interview,index) in datas.interview" v-bind:key="index">
            <span>{{index+1}}. </span>
            <span>{{interview.admin.name}}</span>
            <span>{{interview.create_time_type_datetime}}</span>
            <span>的沟通记录：</span>
            <span>{{interview.content}}</span>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>
<style scoped lang="less" >
@import url("../style/basic/basics.less");
@import url("../style/Resoutcelibdetails.less");
</style>
<style lang="less">
.resumedetails {
  .job-check .el-checkbox__label {
    font-size: 0 !important;
    padding: 0;
  }
  .tagline .el-checkbox {
    width: 13.9%;
    border: 1px solid #dcdfe6;
    line-height: 30px;
    text-align: center;
    margin: -1px -1px 0 0;
  }
  .tagline .job-check {
    display: inline-block;
    width: 86%;
    margin: 0;
    text-align: left;
    margin-left: -1px;
  }
}
</style>

<script>
import axios from "axios";
export default {
  data() {
    // 初始化默认全不选中
    let list = [];
    for (let i = 1; i <= 21; i++) {
      list.push(false);
    }
    return {
      showjobtime: false,
      jobtime: false,
      datas: "",
      tags: [],
      checkState: list,
      calendar: []
    };
  },
  methods: {
    backpage() {
      this.$router.go(-1); //返回上一层
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
            _self.tags = res.data.data.tag.split(",");
            // console.log(res);
            _self.datas.is_full_time == "1"
              ? (_self.showjobtime = false)
              : (_self.showjobtime = true);
            // console.log(_this.tags)
            for (let i = 0; i < _self.datas.able_work_time.length; i++) {
              // console.log( _self.datas.able_work_time[i])
              if (_self.datas.able_work_time[i] == "1") {
                _self.checkState[i] = true;
              }
            }
          } else if (response.data.code == 1010) {
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
            _self.$message.error(res.data.msg);
          }
          // console.log(res);
        })
        .catch(function(error) {
          _self.$message.error(error);
        });
    }
  },
  mounted() {
    this.getData();
  }
};
</script>
