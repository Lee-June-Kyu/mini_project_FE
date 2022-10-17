import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    beforeEnter: (to, from, next) => {
      console.log('to: ', to, 'from: ', from)
      if (localStorage.getItem('token')) {
        next()
      } else {
        next('/signin')
      }
    },
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
    beforeEnter: (to, from, next) => {
      console.log('to: ', to, 'from: ', from)
      if (localStorage.getItem('token')) {
        next('/')
      } else {
        next()
      }
    },
    component: () => import('../views/Auth/SigninView.vue')
  },
  {
    path: '/signup',
    name: 'signup',
    beforeEnter: (to, from, next) => {
      console.log('to: ', to, 'from: ', from)
      if (localStorage.getItem('token')) {
        next('/')
      } else {
        next()
      }
    },
    component: () => import('../views/Auth/SignupView.vue')
  },
  {
    path: '/attend',
    name: 'attend',
    beforeEnter: (to, from, next) => {
      console.log('to: ', to, 'from: ', from)
      if (localStorage.getItem('token')) {
        next()
      } else {
        next('/signin')
      }
    },
    component: () => import('../views/AttendanceCheck.vue')
  },
  {
    path: '/attendHistory',
    name: 'attendHistory',
    beforeEnter: (to, from, next) => {
      console.log('to: ', to, 'from: ', from)
      if (localStorage.getItem('token')) {
        next()
      } else {
        next('/signin')
      }
    },
    component: () => import('../views/AttendanceHistoryView.vue')
  },
  {
    path: '/mypage',
    name: 'mypage',
    beforeEnter: (to, from, next) => {
      console.log('to: ', to, 'from: ', from)
      if (localStorage.getItem('token')) {
        next()
      } else {
        next('/signin')
      }
    },
    component: () => import('../views/MypageView.vue')
  },
  {
    path: '/notepad',
    name: 'notepad',
    beforeEnter: (to, from, next) => {
      console.log('to: ', to, 'from: ', from)
      if (localStorage.getItem('token')) {
        next()
      } else {
        next('/signin')
      }
    },
    component: () => import('../views/NotepadView.vue')
  },
  {
    path: '/schedule',
    name: 'schedule',
    beforeEnter: (to, from, next) => {
      console.log('to: ', to, 'from: ', from)
      if (localStorage.getItem('token')) {
        next()
      } else {
        next('/signin')
      }
    },
    component: () => import('../views/ScheduleView.vue')
  },
  {
    path: '/student',
    name: 'student',
    beforeEnter: (to, from, next) => {
      console.log('to: ', to, 'from: ', from)
      if (localStorage.getItem('token')) {
        next()
      } else {
        next('/signin')
      }
    },
    component: () => import('../views/StudentView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
