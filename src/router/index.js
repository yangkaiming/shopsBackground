import Vue from 'vue'
import Router from 'vue-router'
import Login from '../pages/login.vue'
import Reg from '../pages/reg.vue'
import Main from '../pages/main.vue'

// 平台管理
import manage_shops from '../components/manage_shops.vue';     // 商铺管理
import manage_apply from '../components/manage_apply.vue';     // 申请开业商铺管理
import manage_message from '../components/manage_message.vue'; // 推送消息
// 商铺管理
import shops_details from '../components/shops_details.vue';    // 商铺信息
import shops_goods from '../components/shops_goods.vue';        // 商品列表
import shops_order from '../components/shops_order.vue';        // 订单管理
import shops_coupon from '../components/shops_coupon.vue';      // 优惠管
import shops_message from '../components/shops_message.vue';    // 推送消息

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/reg',
      name: 'Reg',
      component: Reg
    },
    {
      path: '/main',
      name: 'Main',
      component: Main,
      children:[
        {
          path: 'manage_shops',
          component: manage_shops,
        },
        {
          path: 'manage_apply',
          component: manage_apply,
        },
        {
          path: 'manage_message',
          component: manage_message,
        },
        {
          path: 'shops_details',
          component: shops_details,
        },
        {
          path: 'shops_goods',
          component: shops_goods,
        },
        {
          path: 'shops_order',
          component: shops_order,
        },
        {
          path: 'shops_coupon',
          component: shops_coupon,
        },
        {
          path: 'shops_message',
          component: shops_message,
        },
       

      ]
    },
  ]
})
