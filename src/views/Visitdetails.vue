<template>
  <div class="addvisitBox visitDetails">
    <!-- 标题栏 -->
    <header>
      <a @click="backpage">
        <img src="../assets/backIcon.png">
      </a>
      <p>拜访详情</p>
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
          <i></i>所属业务:
        </label>
        <p>{{businessValue}}</p>
      </div>
      <div class="selectcheck">
        <label>
          <i></i>拜访类型:
        </label>
        <p>{{typeValue}}</p>
      </div>
      <div class="selectcheck">
        <label>
          <i></i>拜访目的:
        </label>
        <p>{{goalValue}}</p>
      </div>
      <div>
        <label>
          <i></i>内容:
        </label>
        <p>{{content}}</p>
      </div>
      <div class="visitSrc">
        <label>
          <i></i>相关附件:
        </label>
        <ul class="enclosure">
          <!-- -->
          <li v-for="(urlSrc,index) in visitImg" :key="index">
            <img :src="urlSrc"  @click="imgDetails(urlSrc)">
            <!-- <div>
                <span>{{urlSrc.del}}</span>
            </div>-->
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>
<style lang="less" scoped>
@import url("../style/basic/basics.less");
@import url("../style/workbench.less");
@import url("../style/Addvisit.less");
</style>
<style lang="less">
.visitDetails{
    .formData>div{
         align-items: center;
    }
    p{
        font-size:30px;
        color:#556677;
        line-height:32px;
    }
}
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
    async getData() {
      const url = this.httpsBasic.httpsBasic + "visit/selectInfo";
      const params = new URLSearchParams();
      params.append("token", window.localStorage.getItem("operatingToken"));
      // console.log(this.$route.params.uuid)
      params.append("uuid", this.$route.params.uuid);
      const { data } = await axios.get(`${url}?${params.toString()}`);
      if (data.code == 1001) {
        this.typeValue = data.data.type; //类型
        this.goalValue = data.data.desitination; //目的
        this.content = data.data.content; //内容
        this.visitImg = data.data.imgs; //附件
        this.businessValue = data.data.business;
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
      // console.log(data);
    },
      imgDetails(pic) {
      // console.log(this.imgList);
       WeixinJSBridge.invoke("imagePreview", {
          urls: this.visitImg,
          current: pic
        });
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
  },
  mounted() {
    this.getData();
     this.getwx();
  }
};
</script>

<style>
</style>

