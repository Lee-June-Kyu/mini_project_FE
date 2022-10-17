import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    User: {
      id: 0,
      name: '',
      className: ''
    }
  },
  getters: {
    User: state => state.User
  },
  mutations: {
    setUser(state, data) {
      state.User = data
    }
  },
  actions: {
    // 유저정보 불러주는 비동기함수
    actUserInfo(context, payload) {
      // console.log('actUserInfo', payload)

      const data = {
        id: payload.id,
        name: payload.name,
        className: payload.className
      }
      context.commit('setUser', data)
    }
  },
  plugins: [createPersistedState()],
  modules: {}
})
