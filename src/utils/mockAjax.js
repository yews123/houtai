import axios from "axios";

const request = axios.create({
    baseURL: '/mock',
    timeout:5000
})
request.interceptors.request.use(function (config) {
    //在请求之前做什么
    return config;
}, function (error) {
    //对请求错误做些什么
    return Promise.reject(error);
});
//响应拦截器
request.interceptors.response.use(function (response) {
    //在请求之前做什么
    return response;
}, function (error) {
    //对请求错误做些什么
    return Promise.reject(error);
});
export default request