import 'babel-polyfill'
import Vue from 'vue'
import App from './App.vue'
//import Vuex from 'vuex'
import router from './router/index'
import store from './store/index'
import vuetify from './plugins/vuetify';
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import { mapActions } from 'vuex'
import AsyncComputed from 'vue-async-computed'
import VueApexCharts from 'vue-apexcharts'
import { Promised } from 'vue-promised'
import VuetifyConfirm from 'vuetify-confirm'

Vue.config.productionTip = false
    //Vue.use(Vuex)
Vue.component('Promised', Promised)
Vue.component('apexchart', VueApexCharts)
Vue.use(AsyncComputed)
Vue.use(VuetifyConfirm, {
    buttonTrueText: 'Accepter',
    buttonFalseText: 'Retour',
    color: 'red',
    icon: 'warning',
    title: 'Warning',
    width: 500,
    property: '$confirm'
})
new Vue({
    router,
    store,
    vuetify,
    render: h => h(App),
    methods: {
        ...mapActions('login', {
            fetchData: 'fetchData'
        })
    },
    created() {
        store.dispatch('login/fetchData')
    }
}).$mount('#app')