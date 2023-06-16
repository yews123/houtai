import { reqOrderInfo,reqDeliveryInfo,reqReceiverInfo,reqFinishInfo } from '@/api'

const state = {
    //用户信息
    tableData: [],
    //总数据条数
    total:0,
}
const mutations = {
    GETORDERINFO(state,data) {
        state.tableData = data[0],
        state.total=data[1]    
    },
    GETDELIVERYINFO(state,data) {
        state.tableData = data[0],
        state.total=data[1]    
    },
    GETRECEIVERINFO(state,data) {
        state.tableData = data[0],
        state.total=data[1]    
    },
    GETFINISHINFO(state,data) {
        state.tableData = data[0],
        state.total=data[1]    
    },
}
const actions = {
     //获取已支付的订单信息
     async getOrderInfo({ commit },data) {
        
        let result = await reqOrderInfo(data);
        if (result.code == 200) {
            console.log(result)
            commit('GETORDERINFO', [result.data,result.total])
            return 'success'
        } 
        else {
            return Promise.reject(new Error('faile'))
        }
    },
    //获取已发货的订单信息
    async getDeliveryInfo({ commit },data) {
        
        let result = await reqDeliveryInfo(data);
        if (result.code == 200) {
            console.log(result)
            commit('GETORDERINFO', [result.data,result.total])
            return 'success'
        } 
        else {
            return Promise.reject(new Error('faile'))
        }
    },
     //获取已收货的订单信息
     async getReceiverInfo({ commit },data) {
        
        let result = await reqReceiverInfo(data);
        if (result.code == 200) {
            console.log(result)
            commit('GETORDERINFO', [result.data,result.total])
            return 'success'
        } 
        else {
            return Promise.reject(new Error('faile'))
        }
    },
    //获取已完成的订单信息
    async getFinishInfo({ commit },data) {
        
        let result = await reqFinishInfo(data);
        if (result.code == 200) {
            console.log(result)
            commit('GETORDERINFO', [result.data,result.total])
            return 'success'
        } 
        else {
            return Promise.reject(new Error('faile'))
        }
    },
    

    
}
const getters = {
}
export default {
    state,
    mutations,
    actions,
    getters
}