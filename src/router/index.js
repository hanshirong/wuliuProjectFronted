import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'


Vue.use(Router)



export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('@/views/login/index'),
    },
    {
      path:'/login',
      name:'login',
      component: () => import('@/views/login/index'),
    },
    {
      path:'/v1',
      name:'storageLocation',
      component: () => import('@/components/storageLocation'),
    },
    {
      path:'/addLibrary',
      name:'addLibrary',
      component: () => import('@/components/addLibrary'),
    },
    {
      path:'/stockLibrary',
      name:'stockLibrary',
      component: () => import('@/components/StockLibrary'),
    },
    {
      path:'/addStockItems',
      name:'addStockItems',
      component: () => import('@/components/addStockItems'),
    },
    {
      path:'/stockinTable',
      name:'stockinTable',
      component: () => import('@/components/StockInTable'),
    }
    

  ]
})
