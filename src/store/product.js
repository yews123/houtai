import { reqTrademarkInfo,reqAddTrademark,reqSearchUser,reqGoodsInfo } from '@/api'

const state = {
    //用户信息
    tableData: [],
    //总数据条数
    total:0,
}
const mutations = {
    GETTRADEMARKINFO(state,data) {
        state.tableData = data[0],
        state.total=data[1]    
    },
    GETGOODSINFO(state,data) {
        state.tableData = data[0],
        state.total=data[1]    
    },
    SERACHUSER(state, data) {
        state.tableData=data
    }
}
const actions = {
     //获取品牌信息
     async getTrademarkInfo({ commit },pageData) {
        
        let result = await reqTrademarkInfo(pageData);
        if (result.code == 200) {
            console.log(result)
            commit('GETTRADEMARKINFO', [result.data,result.total])
            return 'success'
        } 
        else {
            return Promise.reject(new Error('faile'))
        }
    },
    //增加品牌
    async addTrademark({commit},form) {
        let result = await reqAddTrademark(form);
    },
    //获取商品信息
    async getGoodsInfo({ commit },pageData) {
        
        let result = await reqGoodsInfo(pageData);
        if (result.code == 200) {
            console.log(result)
            commit('GETGOODSINFO', [result.data,result.total])
            return 'success'
        } 
        else {
            return Promise.reject(new Error('faile'))
        }
    },
    
    //删除用户
    // async deleteUser({commit},row) {
    //     let result = await reqDeleteUser(row);
    // }

    //搜索用户
    async searchUser({commit},phone) {
        let result = await reqSearchUser(phone);
        if (result.code == 200) {
            commit('SEARCHUSER',result.data)
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