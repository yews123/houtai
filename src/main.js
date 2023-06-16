import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
// import { Button, Row } from 'element-ui';
// Vue.use(Button)
// Vue.use(Row)
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from '@/store'
import '@/api/mock'
import Cookie from 'js-cookie'
Vue.use(ElementUI);
Vue.config.productionTip = false



//添加全局前置导航守卫
router.beforeEach((to, from, next) => {
  //判断token存不存在
  const token = Cookie.get('token')
  //token不存在，说明当前用户还是未登录，应该跳转至登录页
  if (!token && to.name !== 'login') {
    next({name:'login'})
  } else if (token && to.name === "login") {
    next({name:'home'})
  } else {
    next()
  }
})



new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
