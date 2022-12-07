import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import store from './store';
import router from './router';
import apexcharts from './plugins/apexcharts';

Vue.config.productionTip = false;

new Vue({
    vuetify,
    store,
    router,
    apexcharts,
    render: h => h(App),
}).$mount('#app');