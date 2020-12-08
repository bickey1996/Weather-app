import Vue from "vue";
import BootstrapVue from "bootstrap-vue/dist/bootstrap-vue.esm";
import App from "./App.vue";
import VueGeolocation from "vue-browser-geolocation";
import VueApexCharts from "vue-apexcharts";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(VueGeolocation);
Vue.use(VueApexCharts);

Vue.component("apexchart", VueApexCharts);
new Vue({
  render: (h) => h(App),
}).$mount("#app");
