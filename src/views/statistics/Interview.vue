<template>
  <div class="fontsize interviewBox">
    <!-- 标题栏 -->
    <header>
      <a @click="backpage">
        <img src="../../assets/backIcon.png">
      </a>
      <p>
        面试记录
        <span>({{sum}})</span>
      </p>
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
    <div class="scroller-box">
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
            <a class="el-icon-phone" :href="'tel:' + item.phone">{{item.eguard.phone}}</a>
          </div>
          <p class="address">{{item.eguard.address}}</p>
          <p class="district">{{item.eguard.address_d}}</p>
          <ul class="charactertag">
            <li>
              <label>性格标签：</label>
              <span>{{item.eguard.tag=="" ? "未添加" : item.eguard.tag}}</span>
            </li>
            <li>
              <label>沟通记录：</label>
              <span>{{item.eguard.remark=="" ? "未填写" : item.eguard.remark}}</span>
            </li>
          </ul>
          <div class="operation">
            <el-row>
              <el-button type="info" @click="detailsPage(item.eguard.uuid)" plain>查看详情</el-button>
              <div>
                <el-button type="warning" @click="interviewpage(item.eguard.uuid)" plain>面试</el-button>
                <el-button type="primary" @click="editpage(item.eguard.uuid)" plain>编辑</el-button>
                <el-button
                  type="danger"
                  @click="delpage(item.uuid)"
                  plain
                >删除</el-button>
              </div>
            </el-row>
          </div>
          <!--删除 -->
          <aside class="quitdelbox quitAgain" v-if="causeBox">
            <div>
              <div>
                <h3 style="color:red">删除</h3>
                <a class="el-icon-close" @click="closeAside"></a>
              </div>
              <p>是否删除该条面试记录</p>
              <div>
                <el-button size="small" @click="cancelbox">取消</el-button>
                <el-button size="small" type="primary" @click="surecause()">确认</el-button>
              </div>
            </div>
          </aside>
          <!-- 再次确认删除 -->
          <aside class="quitdelbox quitAgain" v-if="againbox">
            <div>
              <div>
                <h3>
                  <span class="el-icon-warning"></span>提示
                </h3>
                <a class="el-icon-close" @click="closeAside"></a>
              </div>
              <p>再次确认?</p>
              <div>
                <el-button size="small" @click="cancelbox">取消</el-button>
                <el-button size="small" type="primary" @click="isQuit()">确认</el-button>
              </div>
            </div>
          </aside>
          <!-- end -->
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
.interviewBox {
  .quitdelbox {
    background-color: rgba(0, 0, 0, 0.1);
  }
  .el-textarea {
    width: 90%;
    margin-bottom: 20px;
  }
  .operation > div {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    width: 100%;
  }
  .operation > div > div {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    width: 82%;
  }
  .el-button {
    padding: 6px 14px;
  }
  .el-button {
    font-size: 18px;
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
  .searchbox {
    position: fixed;
    background-color: #fff;
    width: 100%;
    z-index: 1;
    top: 90px;
    // border-bottom: 1px solid #f2f2f2;
  }
  .el-input {
    font-size: 14px;
  }
  .el-tabs__header {
    margin: 0;
  }
  .searchbox .el-input__inner {
    line-height: 28px;
    height: 28px;
    border: none;
    //   border-bottom: 2px solid #f2f2f2;
    background-image: url(../../assets/sousuo.png);
    background-size: 18px;
    background-repeat: no-repeat;
    background-position: 18px center;
    text-indent: 30px;
  }
  .interviewBox .el-tabs__nav {
    text-align: center;
    float: unset;
  }
  .ignore .address {
    font-size: 16px !important;
  }
  .ignore .searchbox .el-input__inner {
    font-size: 18px;
  }
  .scroller-box {
    margin-top: 180px;
  }
  .el-tabs__nav-wrap::after {
    height: 0;
  }
  .el-tabs__nav {
    width: 100%;
    float: unset;
    text-align: center;
  }
  .searchbox > div:first-child {
    width: 100%;
  }
}
</style>

<script>
import axios from "axios";
import { mapState } from "vuex";
import Vue from "vue";
import VueScroller from "vue-scroller";
Vue.use(VueScroller);
export default {
  data() {
    return {
      items: [],
      page: 1,
      noDate: true,
      search: "",
      activeName: "first",
      startTime: "",
      endTime: "",
      sum: 0,
      cause: "",
      causeBox: false,
      againbox: false,
      delUUID:""
    };
  },
  watch: {},
  methods: {
    getData() {
      let url = this.httpsBasic.httpsBasic + "interview/selectList";
      let _this = this;
      axios
        .get(url, {
          params: {
            token: window.localStorage.getItem("operatingToken"),
            page: this.page,
            page_max_row: 10,
            start_time: this.startTime,
            end_time: this.endTime
          }
        })
        .then(function(response) {
          //  console.log(response);
          if (response.data.code == 1001) {
            if (_this.page == 1) {
              _this.items = response.data.data.list;
              _this.sum = response.data.data.total_count;
            } else {
              _this.items = _this.items.concat(response.data.data.list);
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
          } else if (response.data.code == 1010) {
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
      window.localStorage.setItem("uuid_details", uuid);
      this.$router.push({ name: "Resoutcelibdetails", params: { uuid: uuid } });
      // this.$router.push("resoutcelibdetails")
    },
    interviewpage(uuid) {
      // event.stopImmediatePropagation();
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
      // event.stopImmediatePropagation();
      this.$router.push({
        name: "Resourcelibeditpage",
        params: { uuid: uuid }
      });
    },
    enptypage(tel, name, e_uuid) {
      // event.stopImmediatePropagation();
      this.$router.push({
        name: "TakingWork",
        params: { tel: tel, name: name, e_uuid: e_uuid }
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
    cancelbox() {
      this.$message("取消删除");
      this.causeBox = false;
      this.againbox = false;
    },
    closeAside() {
      this.causeBox = false;
      this.againbox = false;
    },
    delpage(uuid) {
      this.delUUID=uuid
      // console.log(uuid)
      this.causeBox = true;
    },
    surecause() {
      this.causeBox = false;
      this.againbox = true;
    },
    isQuit() {
      let _this = this;
      const url = this.httpsBasic.httpsBasic + "interview/delete";
      axios
        .post(url, {
          token: window.localStorage.getItem("operatingToken"),
          uuid: this.delUUID
        })
        .then(function(res) {
          if (res.data.code == 1001) {
            _this.$message.success("删除成功");
            _this.againbox = false;
            setTimeout(() => {
              window.scrollTo(0, 0);
              // _this.$router.push({ name: "Interview" });
              location.reload()
            }, 2000);
          } else {
            _this.$message.error(res.data.msg);
          }
        })
        .catch(function(error) {
          _this.$message.error(error);
        });
    },
    getDataAndTime() {
      this.items = [];
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
      this.startTime = String(year) + month + String(strDate) + "000000";
      this.endTime = String(year) + month + String(strDate) + "235959";
      this.getData();
    }
  },
  mounted() {
    this.getDataAndTime();
  },
  computed: {
    ...mapState({
      token: state => state.auth.token
    })
  },
  components: {
    // search
  }
};
</script>

