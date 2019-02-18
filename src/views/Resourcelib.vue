<template>
  <div class="fontsize workcontent">
    <!-- 标题栏 -->
    <header>
      <a @click="backpage">
        <img src="../assets/backIcon.png">
      </a>
      <p>资源库</p>
      <router-link tag="span" to="/Workbench">新增</router-link>
    </header>
    <div class="searchbox">
      <el-input v-model="search" placeholder="关键字搜索"></el-input>
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
        <div class="datalist ignore" v-for="(item, index) in items" v-bind:key="index" @click="detailsPage(item.uuid)" >
          <div class="basicInfo ignore">
            <div>
              <h3>{{item.name}}</h3>
              <p>{{item.sex=="0" ? "男":"女"}}</p>
              <!-- <p>{{item.age}}</p>
              <p>岁</p> -->
              <p>{{item.is_full_time=="1" ? "全职" : "兼职"}}</p>
            </div>
            <a class="el-icon-phone" :href="'tel:' + item.phone">{{item.phone}}</a>
          </div>
          <p class="address">{{item.address}}</p>
          <p class="district">{{item.address_d}}</p>
          <ul class="charactertag">
            <li>
              <label>性格标签：</label>
              <span>{{item.tag=="" ? "未添加" : item.tag}}</span>
            </li>
            <li>
              <label>沟通记录：</label>
              <span>{{item.remark=="" ? "未填写" : item.remark}}</span>
            </li>
          </ul>
          <div class="operation">
            <el-row>
              <el-button type="info" @click="interviewpage(item.uuid)" plain>面试</el-button>
              <el-button type="primary" @click="editpage(item.uuid)" plain>编辑</el-button>
            </el-row>
          </div>
        </div>
      </scroller>
    </div>
  </div>
</template>

<style scoped lang="less" >
@import url("../style/basic/basics.less");
@import url("../style/Resoutcelib.less");
</style>
<style lang="less">
.workcontent .operation {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}
.workcontent .el-button {
  padding: 6px 14px;
}
.fontsize .el-button{
  font-size: 12px;
}
.workcontent .el-message-box {
  position: absolute;
  left: 0;
  top: 0;
  width: 92%;
  margin: auto;
  right: 0;
  bottom: 0;
  height: 150px;
}
.fontsize .no-data-text {
  font-size: 12px;
}
.workcontent ._v-content > datalist:nth-child(2) {
  border: none;
}
.workcontent ._v-content > div:last-child {
  margin-top: 60px;
}
.workcontent .searchbox {
  position: fixed;
  top: 88px;
  background-color: #fff;
  width: 100%;
  z-index: 1;
}
.workcontent .fontsize .el-input {
  font-size: 12px;
}
.workcontent .searchbox .el-input__inner {
  line-height: 28px;
  height: 28px;
  border: none;
  border-bottom: 2px solid #f2f2f2;
  background-image: url(../assets/sousuo.png);
  background-size: 18px;
  background-repeat: no-repeat;
  background-position: 18px center;
  text-indent: 30px;
}
.ignore .address{
    font-size: 12px!important
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
      search: ""
    };
  },
  watch: {
    search() {
      this.getData();
    }
  },
  methods: {
    getData() {
      let url = this.httpsBasic.httpsBasic + "eguard/selectList";
      let _this = this;
      axios
        .get(url, {
          params: {
            token: window.localStorage.getItem("operatingToken"),
            page: this.page,
            page_max_row: 10,
            search_key: this.search
          }
        })
        .then(function(response) {
          if (response.data.code == 1001) {
            if (_this.page == 1) {
              _this.items = response.data.data.list;
            } else {
              _this.items = _this.items.concat(response.data.data.list);
            }
            if (response.data.data.list.length > 0) {
              if (
                response.data.data.total_page >= response.data.data.current_page
              ) {
                _this.noDate =false;
              } else {
                _this.noDate = true;
              }
            } else {
              _this.noDate = true;
            }
          }else if(response.data.code == 1010){
            _this.$alert('登录失效或过期，请重新登录', '登录失效', {
              confirmButtonText: '确定',
              callback: action => {
                _this.$message({
                  type: '',
                  message: _this.$router.push({ name: "Login"})
                });
              }
            })
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
      if (this.noDate==true) {
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
      // console.log(uuid)
      this.$router.push({ name: "Resoutcelibdetails", params: { uuid: uuid } });
      // this.$router.push("resoutcelibdetails")
    },
    interviewpage(uuid){
      event.stopImmediatePropagation();
      // console.log(uuid)
      this.$router.push({ name: "Resourcelibinterview", params: { uuid: uuid } });
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
    }
  },
  mounted() {
    this.items=[]
    this.getData();
    
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

