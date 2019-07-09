import Vue from 'vue'
import Router from 'vue-router'



Vue.use(Router)



export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('@/components/login'),//Login
    },
    {
      path:'/login',
      name:'login',
      component: () => import('@/components/login'),//Login
    },
    {
      path:'/location',
      name:'storageLocation',
      component: () => import('@/components/storageLocation'),//管理员库位管理
    },
    {
      path:'/addLibrary',
      name:'addLibrary',
      component: () => import('@/components/addLibrary'),//单证员添加入库批次，做成弹窗的形式填写
    },
    {
      path:'/entry',
      name:'stockLibrary',
      component: () => import('@/components/StockLibrary'),//单证员所有入库批次表
    },
    {
      path:'/addStockItems',
      name:'addStockItems',
      component: () => import('@/components/addStockItems'),//单证员导入excel
    },
   
    {
      path:'/items/:id',
      name:'stockinTable',
      component: () => import('@/components/StockInTable'),//单证员点击入库批次进入入库单
    },
    {
      path:'/items/scan',
      name:'scanQrCode',
      component: () => import('@/components/scanQrCode'),//单证员点击入库批次进入入库单
    }
    

  ]
})
