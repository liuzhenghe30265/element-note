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
    path: '/SelectInfiniteScroll',
    name: 'el-select 无限滚动',
    component: resolve => require(['@/views/SelectInfiniteScroll'], resolve)
  }
]

const router = new VueRouter({
  routes
})

export default router
