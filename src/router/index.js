import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/signin',
    name: 'signin',
    component: () => import('../views/Auth/SigninView.vue')
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('../views/Auth/SignupView.vue')
  },
  {
    path: '/attend',
    name: 'attend',
    component: () => import('../views/AttendanceCheck.vue')
  },
  {
    path: '/attendHistory',
    name: 'attendHistory',
    component: () => import('../views/AttendanceHistoryView.vue')
  },
  {
    path: '/mypage',
    name: 'mypage',
    component: () => import('../views/MypageView.vue')
  },
  {
    path: '/notepad',
    name: 'notepad',
    component: () => import('../views/NotepadView.vue')
  },
  {
    path: '/schedule',
    name: 'schedule',
    component: () => import('../views/ScheduleView.vue')
  },
  {
    path: '/student',
    name: 'student',
    component: () => import('../views/StudentView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
