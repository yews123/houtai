import Vue from "vue";
import Vuex from "vuex"
import tab from "@/store/tab"
import user from "@/store/user"
import product from "@/store/product"
import order from "@/store/order"
Vue.use(Vuex)

//创建vuex的实例
export default new Vuex.Store({
    modules: {
        tab,
        user,
        product,
        order
    }
})
