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
        <div class="selectcheck" v-if="add.ifshops">
          <label>
            <i>*</i>所属门店:
          </label>
          <el-checkbox-group class="selectlabel" v-model="shopValue">
            <el-checkbox
              v-for="shop in add.shops"
              :key="shop.uuid"
              :label="shop.shop_name"
              :value="shop.uuid"
              :checked="shopsToggle(shopValue)"
            ></el-checkbox>
          </el-checkbox-group>
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
        <el-input v-model="identity" placeholder="请输入身份证号:" value></el-input>
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
    font-size: 18px;
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
    font-size: 18px;
    color: #556677;
    width: 48%;
    vertical-align: top;
    line-height: 32px;
  }
}
</style>

<script>
import axios from "axios";
export default {
  data() {
    return {
      tel: this.$route.params.tel,
      name: this.$route.params.name,
      identity: "",
      shopValue: "",
      identityFrount: require("../assets/interview/identityFrount.png"),
      identitySide: require("../assets/interview/identitySide.png"),
      bankcard: require("../assets/interview/yinhangqia.png"),
      addbusiness: [
        {
          addtitle: "添加",
          addicon: require("../assets/add.png"),
          b_uuid: "",
          c_uuid: [],
          businessList: [],
          ifshops: false,
          shops: []
        }
      ]
    };
  },
  watch: {
    b_uuid: function() {
      console.log(  this.addbusiness)
      // this.addbusiness.businessValue != ""
      //   ? (this.addbusiness.ifshops = true && this.getshops())
      //   : (this.addbusiness.ifshops = false);
    }
  },
  methods: {
    backpage: function() {
      this.$router.go(-1); //返回上一层
    },
    getUUID(e,i) {
        if(e!=""){
          this.addbusiness[i].ifshops=true
          this.businessValue=e
          this.getshops()
        }
      console.log(e);
    },
    onUpload: function(e) {
      let formData = new FormData();
      formData.append("file", e.target.files[0]);
      formData.append("type", "test");
      console.log(formData);
    },
    async submitform() {
      if (
        this.businessValue != "" &&
        this.shopValue != "" &&
        this.identity != ""
      ) {
        const url = this.httpsBasic.httpsBasic + "";
      } else {
        this.$message.warning("资料未填写完整");
      }
      console.log(this.tel);
    },
    identityFrountSrc: function() {},
    identitySideSrc: function() {},
    bankcardSrc: function() {},
    async getbusiness() {
      const url = this.httpsBasic.httpsBasic + "business/selectBusinessList";
      const params = new URLSearchParams();
      params.append("token", window.localStorage.getItem("operatingToken"));
      const { data } = await axios.get(`${url}?${params.toString()}`);
      if (data.code == 1001) {
        for(let i=0;i<this.addbusiness.length;i++){
         this.addbusiness[i].businessList=data.data
        }
      } else if (data.code == 1010) {
        this.$alert("登录失效或过期，请重新登录", "登录失效", {
          confirmButtonText: "确定",
          callback: action => {
            this.$message({
              type: "重新登录",
              message: this.$router.push({ name: "Login" })
            });
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
         for(let i=0;i<this.addbusiness.length;i++){
         this.addbusiness[i].shops=data.data
        }
      } else if (data.code == 1010) {
        this.$alert("登录失效或过期，请重新登录", "登录失效", {
          confirmButtonText: "确定",
          callback: action => {
            this.$message({
              type: "重新登录",
              message: this.$router.push({ name: "Login" })
            });
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
          c_uuid: [],
          businessList: [],
          ifshops: false,
          shops:[]
        });
      } else {
        this.addbusiness.splice(index, 1);
      }
    },
    shopsToggle: function(shop) {
      console.log(shop);
    }
  },
  mounted() {
    this.getbusiness();
    console.log(this.addbusiness)
    // console.log(this.businessList);
  }
};
</script>

