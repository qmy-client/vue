import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import logout from '@/components/logout'
import Intelligence from '@/components/stencil/intelligence'
import Resource from '@/components/stencil/resource'
import Develop from '@/components/stencil/develop'
import Index from '@/components/stencil/index'
import Product from '@/components/stencil/productVideo'
import register from '@/components/register'
import UserInfo from '@/components/layout/user/userinfo'
import Password from '@/components/layout/user/changePassword'
import Help from '@/components/layout/user/help'
import Home from '@/components/home'
import ProductAdd from '@/components/stencil/resource/productAdd'
import InterfaceAdd from '@/components/stencil/resource/interfaceAdd'
Vue.use(Router)

const router = new Router({
  routes: [
    // 登录
    {
      path: '/',
      name: 'login',
      component: login
    },
    // 注册
    {
      path: '/register',
      name: register,
      component: register
    },
    // 主界面
    {
      path: '/home',
      name: 'home',
      meta: {
        requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
      },
      component: Home,
      children: [
        {
          path: '/index',
          name: 'index',
          meta: {
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          },
          component: Index
        },
        {
          path: '/intelligence',
          name: 'intelligence',
          meta: {
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          },
          component: Intelligence
        },
        {
          path: '/productVideo',
          name: 'productVideo',
          meta: {
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          },
          component: Product
        },
        {
          path: '/resource',
          name: 'resource',
          meta: {
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          },
          component: Resource
        },
        {
          path: '/develop',
          name: 'develop',
          meta: {
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          },
          component: Develop
        },
        {
          path: '/userInfo',
          name: 'userInfo',
          meta: {
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          },
          component: UserInfo
        },
        {
          path: '/changePassword',
          name: 'changePassword',
          meta: {
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          },
          component: Password
        },
        {
          path: '/help',
          name: 'help',
          meta: {
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          },
          component: Help
        },
        {
          path: '/productAdd',
          name: 'productAdd',
          meta: {
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          },
          component: ProductAdd
        },
        {
          path: '/interfaceAdd',
          name: 'interfaceAdd',
          meta: {
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
          },
          component: InterfaceAdd
        }

      ]
    },
    // 退出
    {
      path: '/logout',
      name: 'logout',
      component: logout
    }

  ]

})
// 异步请求前判断请求的连接是否需要token
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireAuth)) {
    let token = sessionStorage.getItem('Authorization')
    if (token === null || token === '') {
      next('/')
    } else {
      next()
    }
  } else {
    next()
  }
})
export default router
