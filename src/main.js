import Vue from 'vue';
import App from './App.vue'
import router from './router';
import './plugins/element-ui'
import './assets/css/element-variables.scss';
import './plugins/socket.io'
import './plugins/push'

new Vue({
  render(h) { return h(App) },
  router
}).$mount('#app')
