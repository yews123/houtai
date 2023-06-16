import axios from "axios";

const request = axios.create({
    baseURL: '/api',
    timeout:5000
})
request.interceptors.request.use(function (config) {
    //在请求之前做什么
    return config;
}, function (error) {
    //响应失败的回调函数
    return Promise.reject(new Error('faile'))
});
//响应拦截器
request.interceptors.response.use(function (response) {
    //在请求之前做什么
    return response.data;
}, function (error) {
   //响应失败的回调函数
    return Promise.reject(new Error('faile'))
});
export default request