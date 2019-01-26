import Vue from 'vue'
import Router from 'vue-router'

import Login from './components/Login'
import Create from './components/Create'
import InputData from './components/InputData'
import TrainingList from './components/TrainingList'
import TrainingDetail from './components/TrainingDetail'
import Test from './components/test'
import Profile from './components/Profile'
import UserList from './components/UserList.vue'


Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/create',
      name: 'create',
      component: Create,
    },
    {
      path: '/input',
      name: 'InputData',
      component: InputData,
      meta: { requiresAuth: true }
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      meta: { requiresAuth: true }
    },
    {
      path: '/userlist',
      name: 'UserList',
      component: UserList,
      meta: { requiresAuth: true }
    },
    {
      path: '/test',
      name: 'Test',
      component: Test,
    },
    {
      path: '/',
      name: 'TrainingList',
      component: TrainingList,
      meta: { requiresAuth: true }
    },
    {
      path: '/:id',
      name: 'TrainingDetail',
      component: TrainingDetail,
      meta: { requiresAuth: true }
    },
  ],
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!localStorage.token) {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath,
          message: true
        }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
