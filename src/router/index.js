//配置路由的地方
import Vue from "vue";
// 引入插件
import VueRouter from "vue-router";
// 使用插件
Vue.use(VueRouter)
import Home from '@/views/Home'
import User from '@/views/User'
import Main from '@/views/Main'
import Mall from '@/views/Mall'
import Delivery from '@/views/Delivery'
import Receiver from '@/views/Receiver'
import Trademark from '@/views/Trademark'
import Sku from '@/views/Sku'
import Paid from '@/views/Paid'
import Finish from '@/views/Finish'
import Login from '@/views/Login'
const routes = [
    {
        path: '/',
        component: Main,
        redirect:'/home',
        children:[
            {
                path: 'home',
                name:'home',
                component:Home
            },
            {
                path: 'user',
                name:'user',
                component:User
            },
            {
                path: 'trademark',
                name:'trademark',
                component:Trademark
            },
            {
                path: 'sku',
                name:'sku',
                component:Sku
            },
            {
                path: 'paid',
                name:'paid',
                component:Paid
            },
            {
                path: 'delivery',
                name:'delivery',
                component:Delivery
            },
            {
                path: 'receiver',
                name:'receiver',
                component:Receiver
            },
            {
                path: 'finish',
                name:'finish',
                component:Finish
            },
        ]
    },
    {
        path: '/login',
        name:'login',
        component:Login
    }
]
const router = new VueRouter({
    routes // (缩写) 相当于 routes: routes
})
export default router