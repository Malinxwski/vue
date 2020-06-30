import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Vuelidate from 'vuelidate'
import dateFilter from './filters/date.filter'
import currencyFilter from './filters/currency.filter'
import messagePlugin from './utils/message.plugin'
import Loader from './components/app/Loader'
import 'materialize-css/dist/js/materialize.min'


import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'


Vue.use(messagePlugin)
Vue.use(Vuelidate)
Vue.component('Loader', Loader)
Vue.filter('date',dateFilter)
Vue.filter('currency',currencyFilter)
Vue.config.productionTip = false

const firebaseConfig = {
  apiKey: "AIzaSyClGbnvKeUvkLlq90EywMQDd-fxPtTAl_U",
  authDomain: "custom-vue-crm.firebaseapp.com",
  databaseURL: "https://custom-vue-crm.firebaseio.com",
  projectId: "custom-vue-crm",
  storageBucket: "custom-vue-crm.appspot.com",
  messagingSenderId: "1019284439358",
  appId: "1:1019284439358:web:c02332ae5ebb3adfd3ac6f",
  measurementId: "G-JWXE0KELWY"
};

firebase.initializeApp(firebaseConfig)


let app

firebase.auth().onAuthStateChanged(()=>{
  if(!app){
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})

