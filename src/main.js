// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import './icons'
import Api from './api/index';
import store from './store';
Vue.use(ElementUI,{size:'small',zIndex:3000});

Vue.config.productionTip = false
Vue.prototype.$api=Api;

Vue.filter('OnStatus',function(value){
  if(value=='1')
  {
    value='未开始';
    return value;
  }
  else if(value=='2')
  {
    value='运输中';
    return value;
  }
  else if(value=='3')
  {
    value='已到达';
    return value;
  }
  else if(value=='4')
  {
    value='卸货中';
    return value;
  }
  else if(value=='5')
  {
    value='入库完成';
    return value;
  }
  
})

Vue.filter('OffStatus',function(value){
  if(value=='1')
  {
    value='未扫描';
    return value;
  }
  else if(value=='2')
  {
    value='已扫描';
    return value;
  }
  else if(value=='3')
  {
    value='已入库';
    return value;
  }
  else if(value=='4')
  {
    value='不存在';
    return value;
  }
  
  
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,

  components: { App },
  template: '<App/>'
})
