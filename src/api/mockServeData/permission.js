import Mock from 'mockjs'
export default {
  getMenu: config => {
    const { username, password } = JSON.parse(config.body)
    // 先判断用户是否存在
    // 判断账号和密码是否对应
    if (username === 'admin' && password === 'admin') {
      return {
        code: 20000,
        data: {
            menu: [
                {
                  path: '/home',
                  name: 'home',
                  label: '首页',
                  icon: 's-home',
                  url: 'Home.vue'
                },
                
                {
                  path: '/user',
                  name: 'user',
                  label: '用户管理',
                  icon: 'user',
                  url: 'User.vue'
                },
                {
                  // path: '/mall',
                  // name: 'mall',
                  label: '商品管理',
                  icon: 'video-play',
                  // url: 'Mall.vue'
                  children:[
                    {
                      path: '/trademark',
                      name: 'trademark',
                      label: '品牌管理',
                      // icon: 'setting',
                      // url: 'Trademark.vue'
                    },
                    {
                      path: '/sku',
                      name: 'sku',
                      label: 'sku管理',
                      // icon: 'setting',
                      // url: 'Trademark.vue'
                    }
                  ]
                },
                {
                  label: '订单管理',
                  icon: 'location',
                  children: [
                    {
                      path: '/paid',
                      name: 'paid',
                      label: '已支付',
                      icon: 'setting',
                      url: 'PageOne.vue'
                    },
                    {
                      path: '/delivery',
                      name: 'delivery',
                      label: '已发货',
                      icon: 'setting',
                      url: 'PageTwo.vue'
                    },
                     {
                      path: '/receiver',
                      name: 'receiver',
                      label: '已收货',
                      icon: 'setting',
                      url: 'PageTwo.vue'
                    },
                     {
                      path: '/finish',
                      name: 'finish',
                      label: '已完成',
                      icon: 'setting',
                      url: 'PageTwo.vue'
                    }
                  ]
                }
              ],
          token: Mock.Random.guid(),
          message: '获取成功'
        }
      }
    } else if (username === 'yws' && password === 'yws') {
      return {
        code: 20000,
        data: {
            menu: [
                {
                  path: '/home',
                  name: 'home',
                  label: '首页',
                  icon: 's-home',
                  url: 'Home.vue'
                },
                {
                  // path: '/mall',
                  // name: 'mall',
                  label: '商品管理',
                  icon: 'video-play',
                  // url: 'Mall.vue'
                  children:[
                    {
                      path: '/trademark',
                      name: 'trademark',
                      label: '品牌管理',
                      // icon: 'setting',
                      // url: 'Trademark.vue'
                    },
                    {
                      path: '/sku',
                      name: 'sku',
                      label: 'sku管理',
                      // icon: 'setting',
                      // url: 'Trademark.vue'
                    }
                  ]
                },
                {
                  label: '订单管理',
                  icon: 'location',
                  children: [
                    {
                      path: '/paid',
                      name: 'paid',
                      label: '已支付',
                      icon: 'setting',
                      url: 'PageOne.vue'
                    },
                    {
                      path: '/delivery',
                      name: 'delivery',
                      label: '已发货',
                      icon: 'setting',
                      url: 'PageTwo.vue'
                    },
                     {
                      path: '/receiver',
                      name: 'receiver',
                      label: '已收货',
                      icon: 'setting',
                      url: 'PageTwo.vue'
                    },
                     {
                      path: '/finish',
                      name: 'finish',
                      label: '已完成',
                      icon: 'setting',
                      url: 'PageTwo.vue'
                    }
                  ]
                }
              ],
          token: Mock.Random.guid(),
          message: '获取成功'
        }
      }
    } else {
      return {
        code: -999,
        data: {
          message: '密码错误'
        }
      }
    }

  }
}