import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'InfiniteScroll 无限滚动',
    component: resolve => require(['@/views/InfiniteScroll'], resolve)
  },
  {
    path: '/About',
    name: 'About',
    component: resolve => require(['@/views/About.vue'], resolve)
  }
]

const router = new VueRouter({
  routes
})

export default router
