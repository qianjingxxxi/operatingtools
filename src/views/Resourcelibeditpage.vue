<template>
  <div class="editpage takingworkbox">
    <!-- 标题栏 -->
    <header>
      <a @click="backpage">
        <img src="../assets/backIcon.png">
      </a>
      <p>编辑</p>
      <span @click="submitform">提交</span>
    </header>
    <!-- 表单填写 -->
    <div class="infoList">
      <h2 @click="show1 = !show1">
        <span>基本资料</span>
        <img :src="!show1 ? arrowUp : arrowDown" alt>
      </h2>
      <transition name="el-zoom-in-top">
        <section v-show="show1" class="formData ignore">
          <div>
            <label>
              <i>*</i>联系电话:
            </label>
            <el-input v-model="tel" placeholder="请输入联系电话" value></el-input>
          </div>
          <div>
            <label>
              <i>*</i>姓名:
            </label>
            <el-input v-model="name" placeholder="请输入姓名"></el-input>
          </div>
          <span class="job-time">
            <label>
              <i></i>性别:
            </label>
            <el-radio-group v-model="sex">
              <el-radio :label="0">男</el-radio>
              <el-radio :label="1">女</el-radio>
            </el-radio-group>
          </span>
          <div>
            <label>
              <i>*</i>年龄:
            </label>
            <el-input v-model="age" placeholder="请输入年龄" type="number"></el-input>
          </div>
          <div class="selectcheckbox dispositiontag selectbusiness">
            <label class="widthanohter">
              <i>*</i>适合业务:
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
              <i>*</i>居住地:
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
          <i>*</i>工作经历:
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
              <i>*</i>工作经历:
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
            <label class="widthanohter">
              <i>*</i>性格标签:
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
              <i></i>可用时间:
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
              <i></i>是否可用:
            </label>
            <el-radio-group v-model="is_die">
              <el-radio :label="0">是</el-radio>
              <el-radio :label="1">否</el-radio>
            </el-radio-group>
          </span>
        </section>
      </transition>
      <!-- 入职资料 -->
      <h2 @click="show2 = !show2" v-if="datas.is_entry=='1' ? true : false">
        <span>入职信息</span>
        <img :src="!show2 ? arrowUp : arrowDown" alt>
      </h2>
      <transition name="el-zoom-in-top">
        <section v-show="show2" class="formData ignore" v-if="datas.is_entry=='1' ? true : false">
          <!-- <div v-for="(add,indexVal) in addbusiness" v-bind:key="indexVal" class="businessBox">
            <div class="selectcheck">
              <label>
                <i>*</i>所属业务:
              </label>
              <el-select
                v-model="add.b_uuid"
                placeholder="请选择"
                @change="getUUID(add.b_uuid,indexVal)"
              >
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
          </div>-->
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
        </section>
      </transition>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-console */

import axios from "axios";
import _ from "lodash";
import Vue from "vue";
import BaiduMap from "vue-baidu-map";
import wx from "weixin-js-sdk";
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
      is_die: 0,
      show1: true,
      show2: true,
      arrowUp: require("../assets/arrowUp.png"),
      arrowDown: require("../assets/arrowDown.png"),
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
      bankNum: "",
      id_img_n: "",
      id_img_p: "",
      bank_card_img: "",
      isEntry: 0
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
      this.$router.go(-1); //返回上一层
      // this.$router.push({ name: "Resourcelib" });
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
      let url = this.httpsBasic.httpsBasic + "eguard/update";
      let _this = this;
      this.tags = this.checktag.join(",");
      this.businesstag = this.businesses.join(",");
      // 全职or兼职
      this.jobtime.forEach(v => {
        this.compute[v] = "1";
      });
      // console.log(this.wockexp)
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
        let params = "";
        // this.compute=this.compute.join(',')
    
        if (parseFloat(this.isEntry) == 1) {
          if (this.bankNum != "" && this.identity != "") {
            params = {
              token: window.localStorage.getItem("operatingToken"),
              phone: this.tel,
              name: this.name,
              sex: this.sex,
              address: this.keyword,
              address_l_l: this.selectTip.location,
              work_experience: this.wockexp,
              tag: this.tags,
              is_full_time: this.workTime,
              able_work_time: this.compute,
              age: this.age,
              address_d: this.address_d,
              trade: this.businesstag,
              is_die: this.is_die,
              uuid: this.$route.params.uuid,
              id_num: this.identity,
              location: JSON.stringify(this.addbusiness),
              bank_card_num: this.bankNum,
              id_img_p: this.id_img_p,
              id_img_n: this.id_img_n,
              bank_card_img: this.bank_card_img
            };
          } else {
            _this.$message.warning("资料未填写完整");
          }
        }else{
           params = {
              token: window.localStorage.getItem("operatingToken"),
              phone: this.tel,
              name: this.name,
              sex: this.sex,
              address: this.keyword,
              address_l_l: this.selectTip.location,
              work_experience: this.wockexp,
              tag: this.tags,
              is_full_time: this.workTime,
              able_work_time: this.compute,
              age: this.age,
              address_d: this.address_d,
              trade: this.businesstag,
              is_die: this.is_die,
              uuid: this.$route.params.uuid,
              id_num: this.identity,
              location: JSON.stringify(this.addbusiness)
            };
        }
        if (this.id_img_p == "") {
          delete params.id_img_p;
        }
        if (this.id_img_n == "") {
          delete params.id_img_n;
        }
        if (this.bank_card_img == "") {
          delete params.bank_card_img;
        }
        axios
          .post(url, params)
          .then(function(response) {
            // console.log(response);
            if (response.data.code == 1001) {
              // _this.$router.push("Workbench");
              _this.$message.success("编辑成功");
              setTimeout(() => {
                window.scrollTo(0, 0);
                _this.$router.push({ name: "Resourcelib" });
              }, 2000);
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
        // this.$message.success("已有该管家信息");
        console.log(data);
        this.datas = data.data;
        this.isEntry = data.data.is_entry;
        this.tipstoggle = false;
        this.hasdata = true;
        this.tel = data.data.phone; //电话
        this.name = data.data.name; //姓名
        this.sex = parseFloat(data.data.sex); //性别
        this.keyword = data.data.address; //居住地
        if (
          data.data.work_experience != null &&
          data.data.work_experience != ""
        ) {
          this.wockexp = data.data.work_experience; //工作经
          for (let i = 0; i < this.wockexp.length; i++) {
            this.wockexp[i].age = "添加";
            this.wockexp[i].age = require("../assets/add.png");
          }
        }
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
        // console.log(data)
        this.bankNum = data.data.bank_card_num; //银行卡号
        this.identity = data.data.id_num; //身份证号
        this.identityFrount = data.data.id_img_p; //身份证正面
        this.identitySide = data.data.id_img_n; //身份证反面
        this.bankcard = data.data.bank_card_img; //银行卡
      } else {
        // this.hasdata = false;
      }
    },
    async getDefaultData() {
      const url = this.httpsBasic.httpsBasic + "eguard/selectInfo";
      const { data } = await axios.get(url, {
        params: {
          token: window.localStorage.getItem("operatingToken"),
          uuid: this.$route.params.uuid
        }
      });
      //  console.log(data)
      if (data.code === 1001) {
        this.datas = data.data;
        this.tipstoggle = false;
        this.hasdata = true;
        // _self.datas = res.data.data;
        this.tel = data.data.phone; //电话
        this.name = data.data.name; //姓名
        this.sex = parseFloat(data.data.sex); //性别
        this.keyword = data.data.address; //居住地
        if (
          data.data.work_experience != null &&
          data.data.work_experience != ""
        ) {
          this.wockexp = data.data.work_experience; //工作经历
          for (let i = 0; i < this.wockexp.length; i++) {
            this.wockexp[i].age = "添加";
            this.wockexp[i].age = require("../assets/add.png");
          }
        }
        this.remark = data.data.remark; //备注
        this.age = data.data.age;
        this.checkchannel = parseFloat(data.data.origin); //渠道
         this.businesstag = data.data.trade.split(",");
        this.businesses = this.businesstag;
        // console.log(_self.checktag);
        data.data.is_full_time === "1"
          ? (this.workTime = 1)
          : (this.workTime = 0);
        const len = data.data.able_work_time.length;
        for (let i = 0; i < len; i++) {
          if (data.data.able_work_time[i] === "1") {
            this.checkState[i] = true;
          }
        } //可用时间
        this.tags = data.data.tag.split(",");
        this.checktag = this.tags;
            // this.addbusiness=data.data.businesseguard
        // console.log(data)
        this.bankNum = data.data.bank_card_num; //银行卡号
        this.identity = data.data.id_num; //身份证号
        this.identityFrount = data.data.id_img_p; //身份证正面
        this.identitySide = data.data.id_img_n; //身份证反面
        this.bankcard = data.data.bank_card_img; //银行卡
        // console.log(this.tags)
        // for(let j=0;j<this.tags.length;j++){

        //    console.log(this.tagToggle)
        // }//性格标签
      } else if (data.code == 1010 || data.code == 1009) {
        this.$alert("登录失效或过期，请重新登录", "登录失效", {
          confirmButtonText: "确定",
          callback: action => {
            this.$router.push({ name: "Login" });
          }
        });
    
      }
    },
    addmodel(add, index) {
      if (add == "添加") {
        console.log("添加");
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
            this.$router.push({ name: "Login" });
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
            this.$router.push({ name: "Login" });
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
                _this.id_img_p = result;
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
                _this.id_img_n = result;
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
                _this.bank_card_img = result;
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
    }
  },
  mounted() {
    this.getDefaultData();
    // 限流，当用户停止输入0.8s后请求，如果连续输入的情况下不请求api
    this.debounce = _.debounce(() => this.search(this.keyword), 800);
    this.getbusiness();
    this.getwx(); //获取微信JSSDK
  }
};
</script>


<style scoped lang="less" >
@import url("../style/basic/basics.less");
@import url("../style/workbench.less");
@import url("../style/TakingWork.less");
</style>
<style lang="less">
.editpage {
  .el-checkbox__label,
  .el-radio__label,
  .el-input,
  .el-textarea {
    font-size: 18px;
    color: #556677;
  }

  .el-radio-group {
    line-height: normal;
  }
  .el-radio {
    line-height: 20px;
  }
  .selectlabel {
    width: 70%;
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
    font-size: 14px;
  }
  .el-range-editor.el-input__inner {
    width: 85%;
    padding: 3px 6px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .el-date-editor .el-range-input,
  .el-date-editor .el-range-separator {
    font-size: 18px;
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
    padding: 10px;
  }

  .el-input__icon,
  .el-date-editor .el-range-input,
  .el-date-editor .el-range-separator {
    height: fit-content !important;
  }
  .wockexp > div {
    display: inline-block;
    vertical-align: top;
    width: 70%;
    position: relative;
  }
  .wockexp > div .el-textarea__inner {
    margin-top: 4px;
  }
  .el-radio__label {
    min-width: 46px;
    display: inline-block;
  }
  .el-date-editor .el-range-input,
  .el-date-editor .el-range-separator {
    font-size: 14px;
    width: auto;
  }
  .formData {
    margin-top: 0;
    border-top: none;
    padding: 0;
  }
  .infoList {
    margin-top: 98px;
  }
  .infoList > h2 {
    display: flex;
    flex-direction: row;
    align-items: center;
    border-bottom: 1px solid #f2f2f2;
    padding: 10px 4%;
    background: rgba(85, 102, 119, 0.7);
    justify-content: space-between;
    margin-bottom: 10px;
  }
  .infoList > h2 span {
    color: #fff;
    font-size: 30px;
  }
  .infoList > h2 > img {
    height: 32px;
  }
  .formData .widthanohter {
    width: 48% !important;
  }
}
.el-date-range-picker__content.is-right .el-date-range-picker__header div {
  margin: 0;
}
.el-date-table td div {
  height: 16px;
}
.el-picker-panel {
  top: 452px;
}
.el-textarea__inner {
  font-size: 16px;
}
</style>



