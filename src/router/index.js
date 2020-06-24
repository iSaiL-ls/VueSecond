import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Register from '../views/register'
import Login from '../views/Login.vue'
import userinfo from '../views/userinfo.vue'
import Edit from '../views/Edit.vue'
import Article from '@/views/Article.vue'
import editcategory from '@/views/EditCategory.vue'
Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    component: Home,
    meta: {
      keepalive: true
    }
  },
  {
    path: '/editcategory',
    component: editcategory
  },
  {
    path: '/register',
    component: Register
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/userinfo',
    component: userinfo,
    meta: {
      istoken: true
    }
  },
  {
    path: '/edit',
    component: Edit,
    meta: {
      istoken: true
    }
  },
  {
    path: '/article/:id',
    component: Article
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})
router.beforeEach((to, from, next) => {
  if (
    !localStorage.getItem('id') &&
    !localStorage.getItem('token') &&
    to.meta.istoken === true
  ) {
    router.push('/login')
    Vue.prototype.$msg.fail('请重新登录')
    return
  }
  next()
})
export default router
