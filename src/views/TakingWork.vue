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
      <div class="selectcheck">
        <label>
          <i>*</i>所属业务:
        </label>
        <el-select v-model="option" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.option"
            :label="item.option"
            :value="item.option"
          ></el-option>
        </el-select>
      </div>
      <div class="selectcheck">
        <label>
          <i>*</i>所属门店:
        </label>
        <el-select v-model="shop" placeholder="请选择">
          <el-option v-for="item in shops" :key="item.shop" :label="item.shop" :value="item.shop"></el-option>
        </el-select>
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
  .formData > div > label{width: 48%;}
  .formData .hasdata>label{width: 38%;}
  .el-input{font-size:18px;}
  .formData .hasdata{border-bottom:1px solid #ccc}
  .el-button--primary{margin:auto;}
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
      options: [{ option: "", label: "" }],
      shops: [{ shop: "", label: "" }],
      option: "",
      shop: "",
      identityFrount: require("../assets/interview/identityFrount.png"),
      identitySide: require("../assets/interview/identitySide.png"),
      bankcard: require("../assets/interview/yinhangqia.png")
    };
  },
  watch: {},
  methods: {
    backpage: function() {
      this.$router.go(-1); //返回上一层
    },
    onUpload: function(e) {
      let formData = new FormData();
      formData.append("file", e.target.files[0]);
      formData.append("type", "test");
      console.log(formData);
    },
    submitform: function() {
      console.log(this.tel);
    },
    identityFrountSrc: function() {},
    identitySideSrc: function() {},
    bankcardSrc: function() {}
  },
  mounted() {}
};
</script>

