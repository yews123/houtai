import { reqUserInfo,reqAddUser,reqSearchUser } from '@/api'

const state = {
    //用户信息
    tableData: [],
    //总数据条数
    total:0,
}
const mutations = {
    GETUSERINFO(state,data) {
        state.tableData = data[0],
        state.total=data[1]    
    },
    SERACHUSER(state, data) {
        state.tableData=data
    }
}
const actions = {
     //获取用户信息
     async getUserInfo({ commit },pageData) {
        
        let result = await reqUserInfo(pageData);
        if (result.code == 200) {
            console.log(result)
            commit('GETUSERINFO', [result.data,result.total])
            return 'success'
        } 
        else {
            return Promise.reject(new Error('faile'))
        }
    },
    //增加用户
    async addUser({commit},form) {
        let result = await reqAddUser(form);
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