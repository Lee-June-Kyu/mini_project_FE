import Vue from 'vue'
import Vuex from 'vuex'
import Auth from './models/auth'
import Department from './models/department'
import User from './models/user'
import Device from './models/device'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Auth,
    Department,
    User,
    Device
  }
})
