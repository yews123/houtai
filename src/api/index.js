import mockRequest from '@/utils/mockAjax'
import request from '@/utils/ajax'
//请求首页数据
export const getData = () => {
    return mockRequest.get('/home/getData')
}
export const getMenu = (data) => {
    return mockRequest.post('/permission/getMenu', data)
}


//获取用户信息
export const reqUserInfo = (data) => request({ url: "/ht/getUserInfo", method: 'post',data })

//增加用户
export const reqAddUser = (data) => request({ url: "/ht/addUser", method: 'post', data })

//删除用户
export const reqDeleteUser = (data) => request({ url: "/ht/deleteUser", method: 'post', data })

//搜索用户
export const reqSearchUser = (data) => request({ url: "/ht/searchUser", method: 'post', data })



//获取品牌信息
export const reqTrademarkInfo = (data) => request({ url: "/ht/trademarkInfo", method: 'post', data })

//增加品牌
export const reqAddTrademark = (data) => request({ url: "/ht/addTrademark", method: 'post', data })

//删除品牌
export const reqDeleteTrademark = (data) => request({ url: "/ht/deleteTrademark", method: 'post', data })

//获取商品信息
export const reqGoodsInfo = (data) => request({ url: "/ht/goodsInfo", method: 'post', data })





//获取已支付订单信息
export const reqOrderInfo = (data) => request({ url: "/ht/orderInfo", method: 'post', data })

//将商品发货
export const reqDelivery = (data) => request({ url: "/ht/delivery", method: 'post', data })

//获取已发货订单信息
export const reqDeliveryInfo = (data) => request({ url: "/ht/deliveryInfo", method: 'post', data })

//用户已收货
export const reqReceiver = (data) => request({ url: "/ht/receiver", method: 'post', data })

//获取已收货订单信息
export const reqReceiverInfo = (data) => request({ url: "/ht/receiverInfo", method: 'post', data })

//已完成
export const reqFinish = (data) => request({ url: "/ht/finish", method: 'post', data })

//获取已完成订单信息
export const reqFinishInfo = (data) => request({ url: "/ht/finishInfo", method: 'post', data })