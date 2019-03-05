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
      <div>
        <label>只看：</label>
        <el-checkbox v-model="checkedInterview">未沟通</el-checkbox>
      </div>
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
        <div
          class="datalist ignore"
          v-for="(item, index) in items"
          v-bind:key="index"
        >
          <div class="basicInfo ignore">
            <div>
              <h3>{{item.name}}</h3>
              <p>{{item.sex=="0" ? "男":"女"}}</p>
              <!-- <p>{{item.age}}</p>
              <p>岁</p>-->
              <p>{{item.age}}岁</p>
            </div>
            <a class="el-icon-phone" :href="'tel:' + item.phone">{{item.phone}}</a>
          </div>
          <p class="address el-icon-location" v-if="hasaddress">{{item.address}}</p>
          <p class="district">{{item.address_d}}</p>
          <ul class="charactertag">
            <li>
              <label>性格标签：</label>
              <span>{{item.tag=="" ? "未添加" : item.tag}}</span>
            </li>
             <li>
              <label>适合业务：</label>
              <span>{{item.trade=="" ? "未添加" : item.trade}}</span>
            </li>
            <li class="goutong">
              <label>沟通记录：</label>
              <span >{{item.remark=="" ? "未填写" : item.remark}}</span>
            </li>
          </ul>
          <div class="operation">
            <el-row>
               <el-button type="info" @click="detailsPage(item.uuid)" plain>查看详情</el-button>
              <!-- <el-button
                v-if="item.is_interview=='1' && item.is_entry=='0' ? true : false"
                type="success"
                @click="enptypage(item.phone,item.name)"
                plain
              >入职</el-button> -->
              <div>
                 <el-button
                v-if="item.is_interview=='1' && item.is_entry=='1' ? true : false"
                type="success"
                @click="visitpage(item.phone,item.name,item.uuid)"
                plain
              >拜访</el-button>
              <el-button   v-if="item.is_entry=='0' ? true : false" type="warning" @click="interviewpage(item.uuid)" plain>面试</el-button>
              <el-button  v-if="item.is_interview=='1' ? true : false" type="primary" @click="editpage(item.uuid)" plain>编辑</el-button>
              </div>
            </el-row>
          </div>
        </div>
      </scroller>
    </div>
  <!-- <resoutdetails :detailspage="detailsID"></resoutdetails> -->
  </div>
</template>

<style scoped lang="less" >
@import url("../style/basic/basics.less");
@import url("../style/Resoutcelib.less");
</style>
<style lang="less">
.workcontent {
  .operation>div .el-button{
      padding: 8px 16px;
      font-size:14px;
  }
   .operation>div{
       display: flex;
    flex-direction: row;
    width: 100%;
   }
   .operation>div>div{
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
    line-height: 32px;
    // height: 28px;
    border: none;
    background-image: url(../assets/sousuo.png);
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
.el-checkbox__label{
  font-size:16px;
}
.ziyuanku{
    margin-top: 180px;
    position: relative;
}
// .charactertag .goutong {
//   font-size:26px;
//   line-height:32px;
// }
}
.el-message-box {
    width: 90%;
  }
</style>

<script>
import axios from "axios";
import { mapState } from "vuex";
import Vue from "vue";
import VueScroller from "vue-scroller";
import resoutdetails from "../components/details.vue"
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
      hasaddress:true,
      total:0
    };
  },
  watch: {
    search() {
      this.items =[];
      this.page=1
      this.getData();
    },
    checkedInterview() {
       this.items =[]
      this.page=1
      this.getData();
    }
  },
  methods: {
    getData() {
      this.checkedInterview == false
        ? (this.isInterview = "all")
        : (this.isInterview = 0);
      let url = this.httpsBasic.httpsBasic + "eguard/selectList";
      let _this = this;
      axios
        .get(url, {
          params: {
            token: window.localStorage.getItem("operatingToken"),
            page: this.page,
            page_max_row: 10,
            search_key: encodeURI(this.search),
            is_interview: this.isInterview
          }
        })
        .then(function(response) {
          if (response.data.code == 1001) {
            if (_this.page == 1) {
              _this.items = response.data.data.list;
              _this.total=response.data.data.total_count
            } else {
              _this.items = _this.items.concat(response.data.data.list);
            }
            for(let i=0 ; i<_this.items.length; i++){
          _this.items[i].address=="" ? _this.hasaddress=false : _this.hasaddress=true
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
                 _this.$router.push({ name: "Login" })
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
      this.$router.push({
        name: "Resourcelibeditpage",
        params: { uuid: uuid }
      });
    },
    visitpage(tel, name,uuid){
      this.$router.push({
        name: "Addvisit",
        params: { tel: tel, name: name,e_uuid:uuid }
      });
    }
  },
  mounted() {
    this.items = [];
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

