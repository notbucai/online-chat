import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from './views/Index'

const routes = [
  { path: '/', component: Index, name: "index" },
]

Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history',
  routes // (缩写) 相当于 routes: routes
})
