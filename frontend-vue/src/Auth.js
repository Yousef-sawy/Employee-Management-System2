import Vue from 'vue'
import Vuex from 'vuex'
import { getAPI } from './axios-api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    accessToken: localStorage.getItem('accessToken') || null,
    refreshToken: localStorage.getItem('refreshToken') || null,
  },
  mutations: {
    updateStorage (state, { access, refresh }) {
      state.accessToken = access
      state.refreshToken = refresh
      localStorage.setItem('accessToken', access)
      localStorage.setItem('refreshToken', refresh)
    },
    destroyToken (state) {
      state.accessToken = null
      state.refreshToken = null
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
    }
  },
  getters: {
    loggedIn (state) {
      return state.accessToken !== null
    }
  },
  actions: {
    userLogin ({ commit }, usercredentials) {
      return new Promise((resolve, reject) => {
        getAPI.post('/api/token/', {  // Ensure your Django backend has this route
          username: usercredentials.username,
          password: usercredentials.password
        })
        .then(response => {
          commit('updateStorage', { access: response.data.access, refresh: response.data.refresh })
          resolve()
        })
        .catch(err => {
          reject(err)
        })
      })
    },
    userLogout ({ commit }) {
      commit('destroyToken')
    }
  }
})
