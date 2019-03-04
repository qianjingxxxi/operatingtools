<template>
  <div class="fontsize workcontent enptybox">
    <!-- 标题栏 -->
    <header>
      <a @click="backpage">
        <img src="../../assets/backIcon.png">
      </a>
      <p>入职</p>
    </header>
    <div class="searchbox">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="今日" name="first"></el-tab-pane>
        <el-tab-pane label="昨日" name="second"></el-tab-pane>
        <el-tab-pane label="一周内" name="third"></el-tab-pane>
        <el-tab-pane label="一月内" name="fourth"></el-tab-pane>
        <el-tab-pane label="所有" name="fifth"></el-tab-pane>
      </el-tabs>
    </div>
    <!-- <hr> -->
    <!-- content -->
    <div class="scroller-box ziyuanku">
      <scroller
        :on-infinite="infinite"
        :on-refresh="refresh"
        ref="my_scroller"
        style="flex-grow: 1"
      >
        <div class="datalist ignore" v-for="(item, index) in items" v-bind:key="index">
          <div class="basicInfo ignore">
            <div>
              <h3>{{item.eguard.name}}</h3>
              <p>{{item.eguard.sex=="0" ? "男":"女"}}</p>
              <!-- <p>{{item.age}}</p>
              <p>岁</p>-->
              <p>{{item.eguard.age}}岁</p>
            </div>
            <a class="el-icon-phone" :href="'tel:' + item.eguard.phone">{{item.eguard.phone}}</a>
          </div>
          <p class="address el-icon-location" v-if="hasaddress">{{item.eguard.address}}</p>
          <p class="district">{{item.eguard.address_d}}</p>
          <ul class="charactertag">
            <li>
              <label>性格标签：</label>
              <span>{{item.eguard.tag=="" ? "未添加" : item.eguard.tag}}</span>
            </li>
            <li>
              <label>适合业务：</label>
              <span>{{item.eguard.trade=="" ? "未添加" : item.eguard.trade}}</span>
            </li>
            <li class="goutong">
              <!-- <label>沟通：</label> -->
              <span>{{item.eguard.remark=="" ? "未填写" : item.eguard.remark}}</span>
            </li>
          </ul>
          <div class="operation">
            <el-row>
              <el-button type="info" @click="detailsPage(item.eguard.uuid)" plain>查看详情</el-button>
              <!-- <el-button
                v-if="item.is_interview=='1' && item.is_entry=='0' ? true : false"
                type="success"
                @click="enptypage(item.phone,item.name)"
                plain
              >入职</el-button>-->
              <div>
                <el-button
                  v-if="item.eguard.is_interview=='1' ? true : false"
                  type="primary"
                  @click="editpage(item.eguard.uuid)"
                  plain
                >编辑</el-button>
                <el-button
                  v-if="item.eguard.is_interview=='1' ? true : false"
                  type="danger"
                  @click="delpage(item.eguard.uuid,item.eguard.name)"
                  plain
                >删除</el-button>
                <el-button
                 
                  type="success"
                  @click="visitpage(item.eguard.phone,item.eguard.name,item.eguard.uuid)"
                  plain
                >拜访</el-button>
              </div>
            </el-row>
          </div>
        </div>
      </scroller>
    </div>
  </div>
</template>

<style scoped lang="less" >
@import url("../../style/basic/basics.less");
@import url("../../style/Resoutcelib.less");
</style>
<style lang="less">
.workcontent {
  .operation > div .el-button {
    padding: 8px 16px;
    font-size: 14px;
  }
  .operation > div {
    display: flex;
    flex-direction: row;
    width: 100%;
  }
  .operation > div > div {
    display: flex;
    flex-direction: row;
    width: 82%;
    justify-content: flex-end;
  }
  .el-button {
    padding: 6px 14px;
  }
  .datalist .el-button {
    font-size: 16px;
  }
  .el-message-box {
    position: absolute;
    left: 0;
    top: 0;
    width: 92%;
    margin: auto;
    right: 0;
    bottom: 0;
    height: 150px;
  }
  .no-data-text {
    font-size: 30px;
  }
  ._v-content > datalist:nth-child(2) {
    border: none;
  }
  ._v-content > div:last-child {
    margin-top: 60px;
  }

  .fontsize .el-input {
    font-size: 18px;
  }
  .searchbox .el-input__inner {
    // line-height: 32px;
    // height: 28px;
    border: none;
    background-image: url(../../assets/sousuo.png);
    background-size: 20px;
    background-repeat: no-repeat;
    background-position: 18px center;
    text-indent: 30px;
    width: 60%;
  }
  .searchbox .el-input__inner {
    font-size: 18px;
    width: 100%;
  }
  .el-checkbox__label {
    font-size: 16px;
  }
  .ziyuanku {
    margin-top: 190px;
    position: relative;
  }
  // .charactertag .goutong {
  //   font-size: 26px;
  //   line-height: 32px;
  // }
}
.el-message-box {
  width: 90%;
}
.enptybox {
  .searchbox {
    padding: 0 !important;
  }
  .searchbox > div:first-child {
    width: 100%;
  }
  .searchbox > div > div {
    width: 100%;
    text-align: center;
  }
  .el-tabs__header {
    margin: 0;
  }
  .el-tabs__nav {
    float: unset;
  }
  .scroller-box {
    border: none;
  }
}
</style>

<script>
import axios from "axios";
import { mapState } from "vuex";
import Vue from "vue";
import VueScroller from "vue-scroller";
import resoutdetails from "../../components/details.vue";
Vue.use(VueScroller);
export default {
  data() {
    return {
      items: [],
      page: 1,
      noDate: true,
      search: "",
      checkedInterview: false,
      isInterview: 0,
      hasaddress: true,
      total: 0,
      activeName: "first"
    };
  },
  watch: {
    search() {
      this.items = [];
      this.getData();
    },
    checkedInterview() {
      this.items = [];
      this.getData();
    }
  },
  methods: {
    getData() {
      this.checkedInterview == false
        ? (this.isInterview = "all")
        : (this.isInterview = 0);
      let url = this.httpsBasic.httpsBasic + "entryquit/selectList";
      let _this = this;
      axios
        .get(url, {
          params: {
            token: window.localStorage.getItem("operatingToken"),
            page: this.page,
            page_max_row: 10,
            type: 0,
            start_time: this.startTime,
            end_time: this.endTime
          }
        })
        .then(function(response) {
          if (response.data.code == 1001) {
            if (_this.page == 1) {
              _this.items = response.data.data.list;
            } else {
              _this.items = _this.items.concat(response.data.data.list);
            }

            console.log(_this.items);
            for (let i = 0; i < _this.items.length; i++) {
              _this.items[i].address == ""
                ? (_this.hasaddress = false)
                : (_this.hasaddress = true);
            }

            if (response.data.data.list.length > 0) {
              if (
                response.data.data.total_page >= response.data.data.current_page
              ) {
                _this.noDate = false;
              } else {
                _this.noDate = true;
              }
            } else {
              _this.noDate = true;
            }
            // console.log(  _this.items )
          } else if (response.data.code == 1010 || response.data.code == 1009) {
            _this.$alert("登录失效或过期，请重新登录", "登录失效", {
              confirmButtonText: "确定",
              callback: action => {
                _this.$router.push({ name: "Login" });
              }
            });
          } else {
            _this.$message.error(response.data.msg);
          }
          //  console.log(response);
        })
        .catch(function(error) {
          _this.$message.error(error);
        });
    },
    infinite(done) {
      if (this.noDate == true) {
        // this.$refs.myscroller.noDataText = "没有更多数据了"; //更改上拉加载的文字
        this.$refs.my_scroller.finishInfinite(true);
      } else {
        setTimeout(() => {
          this.page++; //下拉一次页数+1
          this.getData();
          done(); //进行下一次加载操作
        }, 1500);
      }
    },
    refresh(done) {
      // console.log("刷新...");
      this.page = 1; //重置页数刷新每次页数都是第一页
      this.noDate = true; //重置数据判断
      this.$refs.my_scroller.finishPullToRefresh();
      // this.$router.go(0)
      this.getData();
    },
    detailsPage(uuid) {
      event.stopImmediatePropagation();
      //   this.detailsID=uuid;
      // console.log(uuid)
      // this.$router.push({ name: "Resoutcelibdetails", params: { uuid: uuid } });
      // this.$router.push("resoutcelibdetails")
    },
    interviewpage(uuid) {
      event.stopImmediatePropagation();
      // console.log(uuid)
      this.$router.push({
        name: "Resourcelibinterview",
        params: { uuid: uuid }
      });
    },
    backpage() {
      this.$router.push({ name: "User" });
    },
    editpage(uuid) {
      event.stopImmediatePropagation();
      this.$router.push({
        name: "Resourcelibeditpage",
        params: { uuid: uuid }
      });
    },
    visitpage(tel, name, uuid) {
      event.stopImmediatePropagation();
      this.$router.push({
        name: "Addvisit",
        params: { tel: tel, name: name, e_uuid: uuid }
      });
    },
    handleClick(tab, event) {
      const date = new Date();
      const year = date.getFullYear();
      let month = date.getMonth() + 1;
      let strDate = date.getDate();
      parseFloat(month) > 9
        ? (month = month)
        : (month = "0" + parseFloat(month));
      parseFloat(strDate) > 9
        ? (strDate = strDate)
        : (strDate = "0" + parseFloat(strDate));
      const todayStart = String(year) + month + String(strDate) + "000000";
      const todayEnd = String(year) + month + String(strDate) + "235959";
      const preDate = new Date(date.getTime() - 24 * 60 * 60 * 1000); //昨日
      const yearpre = preDate.getFullYear();
      let monthpre = preDate.getMonth() + 1;
      parseFloat(monthpre) > 9
        ? (monthpre = monthpre)
        : (monthpre = "0" + parseFloat(monthpre));
      let strDatepre = preDate.getDate();
      parseFloat(strDatepre) > 9
        ? (strDatepre = strDatepre)
        : (strDatepre = "0" + parseFloat(strDatepre));
      const yesterdayStart =
        String(yearpre) + monthpre + String(strDatepre) + "000000";
      const yesterdayend =
        String(yearpre) + monthpre + String(strDatepre) + "235959";
      const weekDate = new Date(date.getTime() - 24 * 60 * 60 * 1000 * 7); //本周
      const yearweek = weekDate.getFullYear();
      let monthweek = weekDate.getMonth() + 1;
      parseFloat(monthweek) > 9
        ? (monthweek = monthweek)
        : (monthweek = "0" + parseFloat(monthweek));
      let strDateweek = weekDate.getDate();
      parseFloat(strDateweek) > 9
        ? (strDateweek = strDateweek)
        : (strDateweek = "0" + parseFloat(strDateweek));
      const weekStart =
        String(yearweek) + monthweek + String(strDateweek) + "000000";
      const monthDate = new Date(date.getTime() - 24 * 60 * 60 * 1000 * 30); //本月
      const yearmonth = monthDate.getFullYear();
      let monthmonth = monthDate.getMonth() + 1;
      parseFloat(monthmonth) > 9
        ? (monthmonth = monthmonth)
        : (monthmonth = "0" + parseFloat(monthmonth));
      let strDatemonth = monthDate.getDate();
      parseFloat(strDatemonth) > 9
        ? (strDatemonth = strDatemonth)
        : (strDatemonth = "0" + parseFloat(strDatemonth));
      const monthStart =
        String(yearmonth) + monthmonth + String(strDatemonth) + "000000";
      switch (tab.label) {
        case "今日":
          this.startTime = todayStart;
          this.endTime = todayEnd;
          break;
        case "昨日":
          this.startTime = yesterdayStart;
          this.endTime = yesterdayend;
          break;
        case "一周内":
          this.startTime = weekStart;
          this.endTime = todayEnd;
          break;
        case "一月内":
          this.startTime = monthStart;
          this.endTime = todayEnd;
          break;
        case "所有":
          this.startTime = "all";
          this.endTime = "all";
          break;
      }
      this.page = 1;
      this.noDate = true; //重置数据判断
      this.getData();
    },
    delpage(uuid, name) {
      this.$alert("确定删除" + name + "的入职信息吗", "安全提示", {
        confirmButtonText: "确定",
        callback: action => {
          this.sureDel(uuid);
        }
      });
    },
    sureDel(uuid) {
      this.$confirm("此操作将永久删除该条入职信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.delAgain(uuid);
        })
        .catch(() => {
          console.log("njncdj");
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    delAgain(uuid) {
      const _this=this
      const url = this.httpsBasic.httpsBasic + "entryquit/delete";
      axios
        .post(url, {
          token: window.localStorage.getItem("operatingToken"),
          uuid: uuid
        })
        .then(function(response) {
          console.log(response);
          if (response.data.code == 1001) {
            _this.$message.success("删除成功");
            _this.items = [];
            _this.getData();
          } else if (response.data.code == 1010 || response.data.code == 1009) {
            _this.$alert("登录失效或过期，请重新登录", "登录失效", {
              confirmButtonText: "确定",
              callback: action => {
                _this.$router.push({ name: "Login" });
              }
            });
          } else {
            _this.$message.error(response.data.msg);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  mounted() {
    this.items = [];
    const date = new Date();
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    let strDate = date.getDate();
    parseFloat(month) > 9 ? (month = month) : (month = "0" + parseFloat(month));
    parseFloat(strDate) > 9
      ? (strDate = strDate)
      : (strDate = "0" + parseFloat(strDate));
    this.startTime = String(year) + month + String(strDate) + "000000";
    this.endTime = String(year) + month + String(strDate) + "235959";
    this.getData();
  },
  computed: {
    ...mapState({
      token: state => state.auth.token
    })
  },
  components: {
    resoutdetails
    // search
  }
};
</script>

