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

export default new Router({
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
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
    },
    {
      path: '/userlist',
      name: 'UserList',
      component: UserList,
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
    },
    {
      path: '/:id',
      name: 'TrainingDetail',
      component: TrainingDetail,
    },
  ],
})
