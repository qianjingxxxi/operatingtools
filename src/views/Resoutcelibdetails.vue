
<template>
  <div class="resumedetails">
    <!-- 标题栏 -->
    <header>
      <a @click="backpage">
        <img src="../assets/backIcon.png">
      </a>
      <p>管家详情</p>
      <!-- <span @click="editpage(datas.uuid)" v-if="datas.is_interview=='1' ? true : false">编辑</span> -->
    </header>
    <hr>
    <!-- content -->
    <section
      class="container fontsize"
      v-loading="loading"
    >
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
          <el-button
            @click="visitpage(datas.uuid,datas.phone,datas.name)"
            v-if="datas.is_entry=='1' ? true : false"
            type="warning"
            plain
          >拜访</el-button>
          <el-button
            @click="interviewpage(datas.uuid)"
            v-if="datas.is_entry=='0' ? true : false"
            type="warning"
            plain
          >面试</el-button>
          <el-button
            @click="quitBtn()"
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
            <div v-if="datas.yhshop!=''  ? true : false" class="tagline">
              <label class="tagtitle">永辉门店:</label>
              <ul>
                <li
                  class="addcolor"
                  v-for="(yhtxt,index) in datas.yhshop"
                  :key="index"
                >{{yhtxt.shop.shop_name}}</li>
              </ul>
            </div>
            <div class="tagline">
              <label class="tagtitle">身份证号码:</label>
              <p>{{datas.id_num}}</p>
            </div>
            <div class="tagline">
              <label class="tagtitle">身份证照片:</label>
              <img @click="imgDetails(datas.id_img_n)" :src="datas.id_img_n" alt>
              <img @click="imgDetails(datas.id_img_p)" :src="datas.id_img_p" alt>
            </div>
            <div class="tagline">
              <label class="tagtitle">银行卡账号:</label>
              <p>{{datas.bank_card_num}}</p>
            </div>
            <div class="tagline">
              <label class="tagtitle">银行卡照片:</label>
              <img @click="imgDetails(datas.bank_card_img)" :src="datas.bank_card_img" alt>
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
                  <span>离职原因:</span>
                  <span>{{quittxt.content}}</span>
                </li>
              </ul>
            </div>
          </div>
        </transition>
      </div>
    </section>
    <!--离职 -->
    <aside class="quitdelbox quitfirst" v-if="causeBox">
      <div>
        <div>
          <h3>管家离职</h3>
          <a class="el-icon-close" @click="closeAside"></a>
        </div>
        <p>请输入离职原因</p>
        <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="cause"></el-input>
        <div>
          <el-button size="small" @click="cancelbox">取消</el-button>
          <el-button size="small" type="primary" @click="surecause(datas.uuid)">确认</el-button>
        </div>
      </div>
    </aside>
    <!-- 再次确认离职 -->
    <aside class="quitdelbox quitAgain" v-if="againbox">
      <div>
        <div>
          <h3>
            <span class="el-icon-warning"></span>提示
          </h3>
          <a class="el-icon-close" @click="closeAside"></a>
        </div>
        <p>是否确定该管家离职?</p>
        <div>
          <el-button size="small" @click="cancelbox">取消</el-button>
          <el-button size="small" type="primary" @click="isQuit(datas.uuid)">确认</el-button>
        </div>
      </div>
    </aside>
    <!-- end -->
  </div>
</template>
<style scoped lang="less" >
@import url("../style/basic/basics.less");
@import url("../style/Resoutcelibdetails.less");
</style>
<style lang="less">
.resumedetails {
  .el-textarea {
    width: 90%;
    margin-bottom: 20px;
  }
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
.el-message-box {
  z-index: 9999 !important;
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
      imgList: [],
      cause: "",
      causeBox: false,
      againbox: false,
      loading: true
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
      const _this = this;
      axios
        .get(url, {
          params: {
            token: window.localStorage.getItem("operatingToken"),
            // uuid: this.$route.params.uuid
            uuid: window.localStorage.getItem("uuid_details")
          }
        })
        .then(function(res) {
          if (res.data.code == 1001) {
            _this.datas = res.data.data;
            _this.imgList.push(_this.datas.id_img_n);
            _this.imgList.push(_this.datas.id_img_p);
            _this.imgList.push(_this.datas.bank_card_img);
            _this.tags = res.data.data.tag.split(",");
              console.log(res);
            _this.datas.is_full_time == "1"
              ? (_this.showjobtime = false)
              : (_this.showjobtime = true);
            // console.log(_this.tags)
            for (let i = 0; i < _this.datas.able_work_time.length; i++) {
              // console.log( _this.datas.able_work_time[i])
              if (_this.datas.able_work_time[i] == "1") {
                _this.checkState[i] = true;
              }
            }
            _this.loading = false;
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
            _this.loading = false;
          } else {
            _this.loading = false;
            _this.$message.error(res.data.msg);
          }
          // console.log(res);
        })
        .catch(function(error) {
          _this.loading = false;
          _this.$message.error(error);
        });
    },
    editpage(uuid) {
      this.$router.push({
        name: "Resourcelibeditpage",
        params: { uuid: uuid }
      });
    },
    interviewpage(uuid) {
      this.$router.push({
        name: "Resourcelibinterview",
        params: { uuid: uuid }
      });
    },
    visitpage(uuid, tel, name) {
      // console.log(uuid)
      this.$router.push({
        name: "Addvisit",
        params: { tel: tel, name: name, e_uuid: uuid }
      });
    },
    enptypage(tel, name, e_uuid) {
      event.stopImmediatePropagation();
      this.$router.push({
        name: "TakingWork",
        params: { tel: tel, name: name, e_uuid: e_uuid }
      });
    },
    cancelbox() {
      this.$message("取消离职");
      this.causeBox = false;
      this.againbox = false;
    },
    closeAside() {
      this.causeBox = false;
      this.againbox = false;
    },
    quitBtn() {
      this.causeBox = true;
    },
    surecause(uuid) {
      if (this.cause != "") {
        this.causeBox = false;
        this.againbox = true;
      } else {
        this.$message.warning("离职原因不能为空");
      }
    },
    async isQuit(e_uuid) {
      const url = this.httpsBasic.httpsBasic + "eguard/quit";
      const params = new URLSearchParams();
      params.append("token", window.localStorage.getItem("operatingToken"));
      params.append("e_uuid", e_uuid);
      params.append("content", this.cause);
      const { data } = await axios.post(`${url}?${params.toString()}`);
      if (data.code == 1001) {
        this.$message.success("离职成功");
        this.againbox = false;
        setTimeout(() => {
          window.scrollTo(0, 0);
          // this.$router.push({ name: "Resourcelib" });
          this.$router.go(-1); //返回上一层
        }, 2000);
      } else {
        this.$message.error(data.msg);
      }
    },
    imgDetails(pic) {
      //  console.log(this.imgList)
      // console.log(this.imgList);
      WeixinJSBridge.invoke("imagePreview", {
        urls: this.imgList,
        current: pic
      });
    }
  },
  mounted() {
    this.getData();
    this.getwx();
  }
};
</script>
