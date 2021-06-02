import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase'
import { firebaseConfig } from './firebase.config'
firebase.initializeApp(firebaseConfig);

Vue.config.productionTip = false


// Initialize Firebase


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')