import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Login from  "./views/Login.vue";
import User from "./views/User.vue";
import Resourcelib from "./views/Resourcelib.vue";
import Workbench from "./views/Workbench.vue";
import Setting from "./views/Setting.vue";
import Changepassword from "./views/Changepassword.vue";
import Resoutcelibdetails from "./views/Resoutcelibdetails.vue";
import Resourcelibeditpage from "./views/Resourcelibeditpage.vue";
import Resourcelibinterview from "./views/Resourcelibinterview.vue";
Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "Login",
      component: Login
    },
    {
      path: "/home",
      name: "Home",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/Home.vue")
    },
    {
      path:"/resoutcelib",
      name:'Resourcelib',
      component:() =>
        import("./views/Resourcelib.vue")
    },
    {
      path:'/workbench',
      name:'Workbench',
      component:() =>
        import("./views/Workbench.vue")
    },
    {
      path:'/user',
      name:'User',
      component:() =>
        import("./views/User.vue")
    },
    {
      path:'/setting',
      name:"Setting",
      component:() =>
        import("./views/Setting.vue")
    },
    {
      path:'/changepassword',
      name:'Changepassword',
      component:() =>
        import("./views/Changepassword.vue")
    },
    {
      path:'/resoutcelibdetails',
      name:'Resoutcelibdetails',
      component:() =>
        import("./views/Resoutcelibdetails.vue")
    },
    {
      path:'/resourcelibeditpage',
      name:'Resourcelibeditpage',
      component:() =>
        import("./views/Resourcelibeditpage.vue")
    },
    {
      path:'/resourcelibinterview',
      name:'Resourcelibinterview',
      component:() =>
      import("./views/Resourcelibinterview.vue")
    }
  ]
});
