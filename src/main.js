import Vue from "vue";
import Vuex from "vuex";

import App from "./App.vue";
import store from "./store";
import questions from "./data/questions";
import "normalize.css";

Vue.config.productionTip = false;
Vue.use(Vuex);

new Vue({
  render: h => h(App),
  store,
  mounted() {
    this.$store.commit("setUnanswered", questions);
    this.$store.dispatch("init");
  }
}).$mount("#app");
