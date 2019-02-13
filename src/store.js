import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    auth: {
      token: '',
    }
    // logininfo:window.localStorage.getItem('operatingToken')
  },
  mutations: {
    setToken(state, payload) {
      state.auth = payload;
    }
  },
  actions: {}
});
