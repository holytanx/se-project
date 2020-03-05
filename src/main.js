import Vue from 'vue'
import App from './App.vue'
import './plugins/bootstrap-vue'
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import axios from "axios";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faUserSecret } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import "./firebaseinit";
import router from "./router";
import firebase from 'firebase'
import VueFirestore from 'vue-firestore';
import vuetify from './plugins/vuetify'
library.add(faUserSecret);

Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.use(VueFirestore);
Vue.prototype.$axios = axios;
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.config.productionTip = false


let app;
firebase.auth().onAuthStateChanged(  
  function(user) {
  if (!app ){
    app = new Vue({
      el: "#app",
      router,
      vuetify,
      components: { App },
      render: h => h(App)
    });
    
  }
})
export const db = firebase.firestore()
