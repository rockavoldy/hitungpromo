import Vue from "vue";
import App from "./App.vue";
import "./assets/tailwind.css";
import VueCurrencyFilter from "vue-currency-filter";
import wb from "./registerServiceWorker";

Vue.config.productionTip = false;

Vue.prototype.$workbox = wb;
Vue.use(VueCurrencyFilter, {
  symbol: "Rp.",
  thousandsSeparator: ".",
  fractionCount: 0,
  fractionSeparator: ",",
  symbolPosition: "front",
  symbolSpacing: true,
});
new Vue({
  render: (h) => h(App),
}).$mount("#app");
