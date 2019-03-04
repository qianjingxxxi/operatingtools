<template>
  <div class="takingworkbox">
    <!-- 标题栏 -->
    <header>
      <a @click="backpage">
        <img src="../assets/backIcon.png">
      </a>
      <p>管家入职</p>
      <!-- <router-link tag="span" to="/Workbench">新增</router-link> -->
    </header>
    <section class="formData ignore">
      <div class="hasdata">
        <label>
          <i></i>姓名:
        </label>
        <p>{{name}}</p>
      </div>
      <div class="hasdata">
        <label>
          <i></i>联系电话:
        </label>
        <p>{{tel}}</p>
      </div>
      <div v-for="(add,indexVal) in addbusiness" v-bind:key="indexVal" class="businessBox">
        <div class="selectcheck">
          <label>
            <i>*</i>所属业务:
          </label>
          <el-select v-model="add.b_uuid" placeholder="请选择" @change="getUUID(add.b_uuid,indexVal)">
            <el-option
              :key="business.uuid"
              :label="business.name"
              :value="business.uuid"
              v-for="business in add.businessList"
            ></el-option>
          </el-select>
          <div class="addbusiness" @click="addmodel(add.addtitle,indexVal)">
            <img :src="add.addicon">
            <span>{{add.addtitle}}</span>
          </div>
        </div>
        <div class="selectcheck selectshops" v-if="add.ifshops">
          <label>
            <i>*</i>所属门店:
          </label>
          <el-select v-model="add.c_uuids" multiple placeholder="请选择">
            <el-option
              v-for="(shop,index) in add.shops"
              :label="shop.shop_name"
              :key="index"
              :name="shop.uuid"
              :value="shop.uuid"
            ></el-option>
          </el-select>
        </div>
      </div>
      <div class="widthOhter">
        <label>
          <i>*</i>身份证号:
        </label>
        <el-input v-model="identity" placeholder="请输入身份证号:" value></el-input>
      </div>
      <div class="labelTwoLine">
        <label>
          <i>*</i>身份证(正面):
        </label>
        <div>
          <!-- <input type="text" readonly> -->
          <img :src="identityFrount" @click="identityFrountSrc">
        </div>
      </div>
      <div class="labelTwoLine">
        <label>
          <i>*</i>身份证(背面):
        </label>
        <div>
          <img :src="identitySide" @click="identitySideSrc">
        </div>
      </div>
      <div class="widthOhter">
        <label>
          <i>*</i>银行卡号:
        </label>
        <el-input v-model="bankNum" placeholder="请输入身份证号:" value></el-input>
      </div>
      <div class="labelTwoLine">
        <label>
          <i>*</i>银行卡(正面):
        </label>
        <div>
          <img :src="bankcard" @click="bankcardSrc">
        </div>
      </div>
      <el-row class="submitBtn borderNone">
        <el-button type="primary" @click="submitform">提交</el-button>
      </el-row>
    </section>
  </div>
</template>
<style scoped lang="less" >
@import url("../style/basic/basics.less");
@import url("../style/workbench.less");
@import url("../style/TakingWork.less");
</style>
<style lang="less">
.takingworkbox {
  .widthOhter .el-input {
    width: 90%;
  }
  .formData > div > label {
    width: 48%;
  }
  .formData .hasdata > label {
    width: 38%;
  }
  .el-input {
    font-size: 16px;
  }
  .formData .hasdata {
    border-bottom: 1px solid #ccc;
  }
  .el-button--primary {
    margin: auto;
  }
  .addbusiness {
    display: flex;
    margin-left: 10px;
    width: 18%;
    flex-direction: row;
    align-items: center;
  }
  .addbusiness img {
    height: 30px;
  }
  .addbusiness span {
    font-size: 28px;
  }
  .formData .businessBox {
    display: block;
    padding: 0;
    border: none;
    width: 100%;
  }
  .formData .businessBox > div {
    padding: 2.67vw 3.2%;
    border-bottom: 1px solid #f2f2f2;
    display: flex;
    -ms-flex-direction: row;
    flex-direction: row;
    width: 93.6%;
    position: relative;
  }
  .formData > .businessBox label {
    font-size: 16px;
    color: #556677;
    width: 48%;
    vertical-align: top;
    line-height: 32px;
  }
  .el-checkbox-group {
    width: 93.5%;
  }
  .el-checkbox {
    margin-right: 10px;
  }
  .el-checkbox__label {
    padding-left: 4px;
  }
  .ignore .el-checkbox__label {
    font-weight: normal;
  }
  .formData .businessBox div div label {
    width: unset;
  }
   .formData .selectshops .el-select{
      width: 88%;
  }
}
</style>

<script>
import axios from "axios";
import wx from "weixin-js-sdk";
export default {
  data() {
    return {
      tel: this.$route.params.tel,
      name: this.$route.params.name,
      identity: "",
      shopValue: [],
      identityFrount: require("../assets/interview/identityFrount.png"),
      identitySide: require("../assets/interview/identitySide.png"),
      bankcard: require("../assets/interview/yinhangqia.png"),
      addbusiness: [
        {
          addtitle: "添加",
          addicon: require("../assets/add.png"),
          b_uuid: "",
          c_uuids: [],
          businessList: [],
          ifshops: false,
          shops: []
        }
      ],
      bankNum:"",
      id_img_n:"",
      id_img_p:"",
      bank_card_img:""
    };
  },
  watch: {
    b_uuid: function() {
      console.log(this.addbusiness);
      // this.addbusiness.businessValue != ""
      //   ? (this.addbusiness.ifshops = true && this.getshops())
      //   : (this.addbusiness.ifshops = false);
    },
    shopValue:function(){
      console.log(this.shopValue)
    }
  },
  methods: {
    backpage: function() {
      this.$router.go(-1); //返回上一层
    },
    checkboxClick(e) {
      console.log(e);
    },
    getUUID(e, i) {
      if (e != "") {
        this.addbusiness[i].ifshops = true;
        this.businessValue = e;
        this.getshops();
      }
    },
    submitform:function() {
      let _this=this;
      if (
        this.bankNum != "" &&
        this.identity != ""
      ) {
         const url = this.httpsBasic.httpsBasic + "eguard/entry";
          axios.post(url,{
              e_uuid:this.$route.params.e_uuid,
              id_num:this.identity,
              token:window.localStorage.getItem("operatingToken"),
              location:JSON.stringify(this.addbusiness),
              bank_card_num:this.bankNum,
              id_img_p:this.id_img_p,
              id_img_n: this.id_img_n,
              bank_card_img:this.bank_card_img

          }).then(function(res){
            // console.log(res)
             _this.$message.success("提交成功");
            // alert(JSON.stringify(res))
          }).catch(function(error){
              alert(JSON.stringify(error))
          })
      } else {
        _this.$message.warning("资料未填写完整");
      }
      console.log(this.tel);
    },
    async getbusiness() {
      const url = this.httpsBasic.httpsBasic + "business/selectBusinessList";
      const params = new URLSearchParams();
      params.append("token", window.localStorage.getItem("operatingToken"));
      const { data } = await axios.get(`${url}?${params.toString()}`);
      if (data.code == 1001) {
        for (let i = 0; i < this.addbusiness.length; i++) {
          this.addbusiness[i].businessList = data.data;
        }
      } else if (data.code == 1010) {
        this.$alert("登录失效或过期，请重新登录", "登录失效", {
          confirmButtonText: "确定",
          callback: action => {
             this.$router.push({ name: "Login" })
          }
        });
      } else {
        this.$message.error(data.msg);
      }
    },
    async getshops() {
      const url =
        this.httpsBasic.httpsBasic + "business/selectBusinessChildList";
      const params = new URLSearchParams();
      params.append("token", window.localStorage.getItem("operatingToken"));
      params.append("uuid", this.businessValue);
      const { data } = await axios.get(`${url}?${params.toString()}`);
      if (data.code == 1001) {
        for (let i = 0; i < this.addbusiness.length; i++) {
          this.addbusiness[i].shops = data.data;
        }
      } else if (data.code == 1010) {
        this.$alert("登录失效或过期，请重新登录", "登录失效", {
          confirmButtonText: "确定",
          callback: action => {
            this.$router.push({ name: "Login" })
          }
        });
      } else {
        this.$message.error(data.msg);
      }
    },
    addmodel: function(add, index) {
      this.getbusiness();
      console.log(add);
      if (add == "添加") {
        this.addbusiness.push({
          addtitle: "删除",
          addicon: require("../assets/delete.png"),
          start_time: "",
          b_uuid: "",
          c_uuids: [],
          businessList: [],
          ifshops: false,
          shops: []
        });
      } else {
        this.addbusiness.splice(index, 1);
      }
    },
    shopsToggle: function(uuid, index) {
      // console.log(index);
      // console.log(uuid);
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
    async identityFrountSrc() {
      const _this = this;
      wx.ready(function() {
        wx.chooseImage({
          count: 1, // 默认9
          sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
          success: function(res) {
            let bosImg = res.localIds[0].toString(); // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图
            wx.uploadImage({
              localId: bosImg, // 需要上传的图片的本地ID，由chooseImage接口获得
              isShowProgressTips: 1, // 默认为1，显示进度提示
              success: function(res) {
                const result = res.serverId; // 返回图片的服务器端ID
                 _this.id_img_p=result
                // 判断设备
                var xt = navigator.userAgent;
                if (xt.indexOf("OS") > -1) {
                  wx.getLocalImgData({
                    localId: bosImg, // 图片的localID
                    success: function(res) {
                      // localData是图片的base64数据，可以用img标签显示
                      _this.identityFrount = res.localData;
                    }
                  });
                } else {
                  _this.identityFrount = result;
                }
              }
            });
          }
        });
      });
    },
async identitySideSrc() {
      const _this = this;
      wx.ready(function() {
        wx.chooseImage({
          count: 1, // 默认9
          sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
          success: function(res) {
            let bosImg = res.localIds[0].toString(); // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图
            wx.uploadImage({
              localId: bosImg, // 需要上传的图片的本地ID，由chooseImage接口获得
              isShowProgressTips: 1, // 默认为1，显示进度提示
              success: function(res) {
                const result = res.serverId; // 返回图片的服务器端ID
                 _this.id_img_n=result
                // 判断设备
                var xt = navigator.userAgent;
                if (xt.indexOf("OS") > -1) {
                  wx.getLocalImgData({
                    localId: bosImg, // 图片的localID
                    success: function(res) {
                      // localData是图片的base64数据，可以用img标签显示
                      _this.identitySide = res.localData;
                    }
                  });
                } else {
                  _this.identitySide = result;
                }
              }
            });
          }
        });
      });
    },
    async bankcardSrc() {
      const _this = this;
      wx.ready(function() {
        wx.chooseImage({
          count: 1, // 默认9
          sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
          success: function(res) {
            let bosImg = res.localIds[0].toString(); // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图
            wx.uploadImage({
              localId: bosImg, // 需要上传的图片的本地ID，由chooseImage接口获得
              isShowProgressTips: 1, // 默认为1，显示进度提示
              success: function(res) {
                const result = res.serverId; // 返回图片的服务器端ID
                   _this.bank_card_img=result
                // 判断设备
                var xt = navigator.userAgent;
                if (xt.indexOf("OS") > -1) {
                  wx.getLocalImgData({
                    localId: bosImg, // 图片的localID
                    success: function(res) {
                      // localData是图片的base64数据，可以用img标签显示
                      _this.bankcard = res.localData;
                    }
                  });
                } else {
                  _this.bankcard = result;
                }
              }
            });
          }
        });
      });
    },
  },
  mounted() {
    this.getbusiness();
    this.getwx(); //获取微信JSSDK
    // console.log(this.businessList);
  }
};
</script>

