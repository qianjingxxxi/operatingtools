
<template>
  <div class="resumedetails">
    <!-- 标题栏 -->
    <header>
      <a @click="backpage">
        <img src="../assets/backIcon.png">
      </a>
      <p>管家详情</p>
      <span @click="editpage(datas.uuid)" v-if="datas.is_interview=='1' ? true : false">编辑</span>
    </header>
    <hr>
    <!-- content -->
    <section class="container fontsize">
      <div class="resoutcelibinfo">
        <!-- <a class="detailsHeader">
          <img src="../assets/details.png" alt>
        </a>-->
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
        <div class="buttonList">
          <el-button
            v-if="datas.is_interview=='1' && datas.is_entry=='0' ? true : false"
            @click="enptypage(datas.phone,datas.name,datas.uuid)"
            type="success"
            plain
          >入职</el-button>
          <el-button v-if="datas.is_entry=='1' ? true : false" type="warning" plain>拜访</el-button>
          <el-button
            @click="interviewpage(datas.uuid)"
            v-if="datas.is_entry=='0' ? true : false"
            type="warning"
            plain
          >面试</el-button>
          <el-button
            @click="quitBtn(datas.uuid)"
            v-if="datas.is_entry=='1' ? true : false"
            type="danger"
            plain
          >离职</el-button>
        </div>
      </div>
      <div class="infoList">
        <h2 @click="show1 = !show1">
          <span>面试信息</span>
          <img :src="!show1 ? arrowUp : arrowDown" alt>
        </h2>
        <transition name="el-zoom-in-top">
          <div v-show="show1">
            <div class="tagline">
              <label class="tagtitle">适合业务:</label>
              <p>{{datas.trade}}</p>
            </div>
            <div class="evaluatetag tagline">
              <label class="tagtitle">评价标签:</label>
              <ul>
                <li v-for="(tag,index) in tags" v-bind:key="index">{{tag}}</li>
              </ul>
            </div>
            <div class="tagline">
              <label class="tagtitle">工作经历:</label>
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
              <label class="tagtitle">工作时间:</label>
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
        <label class="tagtitle">最近一次沟通记录:</label>
        <p>{{datas.remark}}</p>
            </div>-->
            <div class="tagline line-none">
              <label class="tagtitle">面试记录:</label>
              <ul class="interview">
                <li v-for="(interview,index) in datas.interview" v-bind:key="index">
                  <span>{{index+1}}.</span>
                  <span>{{interview.admin.name}}</span>
                  <span>{{interview.create_time_type_datetime}}</span>
                  <span>的沟通记录:</span>
                  <span>{{interview.content}}</span>
                </li>
              </ul>
            </div>
          </div>
        </transition>
        <!-- --- -->
        <h2 @click="show2 = !show2" v-if="datas.is_entry=='1' ? true : false">
          <span>入职信息</span>
          <img :src="!show2 ? arrowUp : arrowDown" alt>
        </h2>
        <transition name="el-zoom-in-top" v-if="datas.is_entry=='1' ? true : false">
          <div v-show="show2">
            <div class="tagline">
              <label class="tagtitle">入职业务:</label>
              <ul>
                <li 
                  class="addcolor"
                  v-for="(businessetxt,index) in datas.businesseguard"
                  :key="index"
                >{{businessetxt.business.name}}</li>
              </ul>
            </div>
            <div  v-if="datas.yhshop!=''  ? true : false" class="tagline">
              <label class="tagtitle">永辉门店:</label>
              <ul>
                <li class="addcolor" v-for="(yhtxt,index) in datas.yhshop" :key="index">{{yhtxt.shop.shop_name}}</li>
              </ul>
            </div>
            <div class="tagline">
              <label class="tagtitle">身份证号码:</label>
              <p>{{datas.id_num}}</p>
            </div>
            <div class="tagline">
              <label class="tagtitle">身份证照片:</label>
              <img @click="imgDetails" :src="datas.id_img_n" alt>
              <img @click="imgDetails" :src="datas.id_img_p" alt>
            </div>
            <div class="tagline">
              <label class="tagtitle">银行卡账号:</label>
              <p>{{datas.bank_card_num}}</p>
            </div>
            <div class="tagline">
              <label class="tagtitle">银行卡照片:</label>
              <img @click="imgDetails" :src="datas.bank_card_img" alt>
            </div>
            <div class="tagline line-none">
              <label class="tagtitle">入职记录:</label>
              <ul class="interview">
                <li v-for="(entrytxt,index) in datas.entry" v-bind:key="index">
                  <span>{{index+1}}.</span>
                  <span>{{entrytxt.admin.name}}</span>
                  <span>{{entrytxt.create_time_type_datetime}}</span>
                  <span>操作</span>
                </li>
              </ul>
            </div>
          </div>
        </transition>
        <!-- --- -->
        <h2 @click="show3 = !show3" v-if="datas.quit!='' ? true : false">
          <span>离职信息</span>
          <img :src="!show3 ? arrowUp : arrowDown" alt>
        </h2>
        <transition name="el-zoom-in-top" v-if="datas.quit!='' ? true : false">
          <div v-show="show3">
            <div class="tagline line-none">
              <label class="tagtitle">离职记录:</label>
              <ul class="interview">
                <li v-for="(quittxt,index) in datas.quit" v-bind:key="index">
                  <span>{{index+1}}.</span>
                  <span>{{quittxt.admin.name}}</span>
                  <span>{{quittxt.create_time_type_datetime}}</span>
                  <span>操作</span>
                  <br>
                  <span>&nbsp&nbsp离职原因:</span>
                  <span>{{quittxt.content}}</span>
                </li>
              </ul>
            </div>
          </div>
        </transition>
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
  .buttonList .el-button {
    margin-left: 30px;
    padding: 8px 14px;
    margin-bottom: 6px;
  }
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
    width: 100%;
    margin: 0;
    text-align: left;
    margin-left: -1px;
  }
  .el-checkbox__input.is-disabled.is-checked .el-checkbox__inner::after {
    border-color: #333;
  }
  .el-checkbox__input.is-disabled.is-checked .el-checkbox__inner {
    background-color: #f2f6fc;
    border-color: #333;
  }
}
</style>

<script>
import axios from "axios";
import wx from "weixin-js-sdk";
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
      calendar: [],
      show1: true,
      show2: true,
      show3: true,
      arrowUp: require("../assets/arrowUp.png"),
      arrowDown: require("../assets/arrowDown.png"),
      imgList: []
    };
  },
  methods: {
    getwx: function() {
      let wechaturl = window.location.href.split("#")[0];
      if (window.wechaturl !== undefined) {
        wechaturl = window.wechaturl;
      }
      const url = this.httpsBasic.httpsBasicWx + "wechat/jssdk";
      // alert(wxUrl)
      axios
        .post(url, {
          url: wechaturl
        })
        .then(function(res) {
          wx.config({
            debug: false, // 开启调试模式,
            appId: res.data.data.appId, // 必填，企业号的唯一标识，此处填写企业号corpid
            timestamp: res.data.data.timestamp, // 必填，生成签名的时间戳
            nonceStr: res.data.data.nonceStr, // 必填，生成签名的随机串
            signature: res.data.data.signature, // 必填，签名，见附录1
            jsApiList: res.data.data.jsApiList // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
          });
        });
    },
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
            _self.imgList.push(_self.datas.id_img_n);
            _self.imgList.push(_self.datas.id_img_p);
            _self.imgList.push(_self.datas.bank_card_img);
            _self.tags = res.data.data.tag.split(",");
            console.log(res);
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
            _self.$message.error(res.data.msg);
          }
          // console.log(res);
        })
        .catch(function(error) {
          _self.$message.error(error);
        });
    },
    editpage(uuid) {
      event.stopImmediatePropagation();
      this.$router.push({
        name: "Resourcelibeditpage",
        params: { uuid: uuid }
      });
    },
    interviewpage(uuid) {
      event.stopImmediatePropagation();
      // console.log(uuid)
      this.$router.push({
        name: "Resourcelibinterview",
        params: { uuid: uuid }
      });
    },
    enptypage(tel, name, e_uuid) {
      event.stopImmediatePropagation();
      this.$router.push({
        name: "TakingWork",
        params: { tel: tel, name: name, e_uuid: e_uuid }
      });
    },
    quitBtn: function(uuid) {
      console.log("lizhi");
      this.$prompt("请输入离职原因", "管家离职", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(({ value }) => {
          if (value != null && value != "") {
            this.$confirm("是否确定该管家离职?", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            })
              .then(() => {
                this.isQuit(uuid, value);
              })
              .catch(() => {
                this.$message({
                  type: "info",
                  message: "已取消"
                });
              });
          } else {
            this.$message.error("请填写离职原因");
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消离职"
          });
        });
    },
    async isQuit(e_uuid, value) {
      const url = this.httpsBasic.httpsBasic + "eguard/quit";
      const params = new URLSearchParams();
      params.append("token", window.localStorage.getItem("operatingToken"));
      params.append("e_uuid", e_uuid);
      params.append("content", value);
      const { data } = await axios.post(`${url}?${params.toString()}`);
      if (data.code == 1001) {
        this.$message.success("离职成功");
      } else {
        this.$message.error(data.msg);
      }
    },
    imgDetails() {
      // WeixinJSBridge.invoke("imagePreview", {
      //   urls: imgs,
      //   current: nowImgurl
      // });
    }
  },
  mounted() {
    this.getData();
    this.getwx();
  }
};
</script>
