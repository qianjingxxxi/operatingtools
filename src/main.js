
import Vue from "vue";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from "./App.vue";
import router from "./router";
import store from "./store";
import httpsBasic from './store/global';
import VueScroller from 'vue-scroller'
Vue.use(ElementUI);
Vue.use(VueScroller);
Vue.config.productionTip = false;
Vue.prototype.httpsBasic = httpsBasic;
  // 初始化vue-amap
import AMap from 'vue-amap';
Vue.use(AMap);
  AMap.initAMapApiLoader({
    // 高德key
    key: '你的key',
    // 插件集合 （插件按需引入）
    plugin: ['AMap.Geolocation']
  });

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
