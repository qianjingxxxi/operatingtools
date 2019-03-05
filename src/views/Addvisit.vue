<template>
  <div class="addvisitBox">
    <!-- 标题栏 -->
    <header>
      <a @click="backpage">
        <img src="../assets/backIcon.png">
      </a>
      <p>拜访</p>
      <!-- <router-link tag="span" to="/Workbench">新增</router-link> -->
    </header>
    <section class="formData ignore">
      <div class="hasdata">
        <label>
          <i></i>姓名:
        </label>
        <p>{{name}}</p>
      </div>
      <div class="selectcheck">
        <label>
          <i>*</i>所属业务:
        </label>
        <el-select v-model="businessValue" placeholder="请选择">
          <el-option
            :key="business.uuid"
            :label="business.name"
            :value="business.name"
            v-for="business in businessList"
          ></el-option>
        </el-select>
      </div>
      <div class="selectcheck">
        <label>
          <i>*</i>拜访类型:
        </label>
        <el-select v-model="typeValue" placeholder="请选择">
          <el-option
            :key="index"
            :label="type.name"
            :value="type.name"
            v-for="(type,index) in typeList"
          ></el-option>
        </el-select>
      </div>
      <div class="selectcheck">
        <label>
          <i>*</i>拜访目的:
        </label>
        <el-select v-model="goalValue" placeholder="请选择">
          <el-option
            :key="index"
            :label="goal.name"
            :value="goal.name"
            v-for="(goal,index) in goalList"
          ></el-option>
        </el-select>
      </div>
      <div>
        <label>
          <i>*</i>内容:
        </label>
        <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4}"
          v-model="content"
          placeholder="请填写至少14个中文字符"
        ></el-input>
      </div>
      <div class="visitSrc">
        <label>
          <i>*</i>相关附件:
        </label>
        <div>
          <span @click="visitrc">上传</span>
          <ul class="enclosure">
            <!-- -->
            <li v-for="(urlSrc,index) in visitImg" :key="index">
              <img :src="urlSrc">
              <!-- <div>
                <span>{{urlSrc.del}}</span>
              </div>-->
            </li>
          </ul>
        </div>
      </div>
      <el-row class="submitBtn borderNone">
        <el-button type="primary" @click="submitform">提交</el-button>
      </el-row>
    </section>
  </div>
</template>
<style lang="less" scoped>
@import url("../style/basic/basics.less");
@import url("../style/workbench.less");
@import url("../style/Addvisit.less");
</style>

<script>
import axios from "axios";
// import wx from "weixin-js-sdk";
import wx from "weixin-js-sdk";
export default {
  data() {
    return {
      name: this.$route.params.name,
      businessList: [],
      businessValue: "",
      typeList: [{ name: "面访" }, { name: "电话" }, { name: "社交APP" }],
      typeValue: "",
      goalList: [{ name: "培训" }, { name: "纠纷" }, { name: "回访" }],
      goalValue: "",
      content: "",
      visitImg: [],
      ioslocId: [] //用于兼容ios的本地id列表 图片是base64格式的
    };
  },
  watch: {},
  methods: {
    backpage() {
      this.$router.go(-1); //返回上一层
    },
    async getbusiness() {
      const url = this.httpsBasic.httpsBasic + "business/selectBusinessList";
      const params = new URLSearchParams();
      params.append("token", window.localStorage.getItem("operatingToken"));
      const { data } = await axios.get(`${url}?${params.toString()}`);
      if (data.code == 1001) {
        this.businessList = data.data;
        // console.log(data)
      } else if (data.code == 1010) {
        this.$alert("登录失效或过期，请重新登录", "登录失效", {
          confirmButtonText: "确定",
          callback: action => {
            this.$router.push({ name: "Login" });
          }
        });
      } else {
        this.$message.error(data.msg);
      }
    },
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
    visitrc() {
      // alert("aaa")
      let _this = this;
      //
      this.getwx();
      wx.ready(function() {
        wx.chooseImage({
          count: 9, // 默认9
          sizeType: ["compressed"], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
          success: function(res) {
            let localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图
            _this.ioslocId = [];
            _this.visitImg = [];
            _this.localimg(localIds);
            _this.upimg(localIds);
          }
        });
      });
    },
    localimg(localIds) {
      // alert(JSON.stringify(bosImg));
      // alert(bosImg.length);
      let _this = this;
      // 判断设备
      wx.ready(function() {
        for (let i = 0; i < localIds.length; i++) {
          var xt = navigator.userAgent;
          if (window.__wxjs_is_wkwebview) {
            // alert("设备" + window.__wxjs_is_wkwebview)
            // alert(localIds[i]);
            wx.getLocalImgData({
              localId: localIds[i].toString(), // 图片的localID
              success: function(res) {
                //  alert("这是预览" + JSON.stringify(res));
                // localData是图片的base64数据，可以用img标签显示
                _this.visitImg.push(res.localData);
              }
            });
          } else {
            _this.visitImg.push(localIds[i]);
          }
        }
      });
    },
    upimg(localIds) {
      let _this = this;
      let localId = localIds.pop();
      // alert("上传wx"+ wx)
      wx.ready(function() {
        wx.uploadImage({
          localId: localId.toString(),
          success: function(res) {
            _this.ioslocId.push(res.serverId);
            if (localIds.length > 0) {
              setTimeout(function() {
                _this.upimg(localIds); //
              }, 200);
            }
          },
          fail: function(res) {
            alert(JSON.stringify(res));
          }
        });
      });
    },
    submitform() {
      // console.log(this.businessValue)
      const url = this.httpsBasic.httpsBasic + "eguard/visit";
      const _this = this;
      axios
        .post(url, {
          e_uuid: this.$route.params.e_uuid,
          business: this.businessValue,
          type: this.typeValue,
          desitination: this.goalValue,
          content: this.content,
          imgs: this.ioslocId,
          token: window.localStorage.getItem("operatingToken")
        })
        .then(function(res) {
            // alert(JSON.stringify(res));
          if(res.data.code==1001){
               _this.$message.success("提交成功");
              setTimeout(() => {
                window.scrollTo(0, 0);
                _this.$router.push({ name: "Visit" });
              }, 2000);
          }else{
            _this.$message.error(res.data.msg);
          }
        })
        .catch(function(error) {
           _this.$message.error(error);
        });
    }
  },
  mounted() {
    this.getbusiness();
  }
};
</script>

<style>
</style>

