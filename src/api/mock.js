import Mock from 'mockjs'
import homeApi from '@/api/mockServeData/home'
import permission from '@/api/mockServeData/permission'
//定义mock请求拦截
Mock.mock('/mock/home/getData', homeApi.getStatisticalData)

Mock.mock(/mock\/permission\/getMenu/, 'post',permission.getMenu)