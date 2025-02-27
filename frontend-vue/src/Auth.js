import { createStore } from 'vuex';
import { getAPI } from './axios-api';

const store = createStore({
  state: {
    accessToken: localStorage.getItem('accessToken') || null,
    refreshToken: localStorage.getItem('refreshToken') || null,
  },
  mutations: {
    updateStorage(state, { access, refresh }) {
      state.accessToken = access;
      state.refreshToken = refresh;
      localStorage.setItem('accessToken', access);
      localStorage.setItem('refreshToken', refresh);
    },
    destroyToken(state) {
      state.accessToken = null;
      state.refreshToken = null;
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    },
  },
  actions: {
    async userLogin({ commit }, usercredentials) {
      try {
        const response = await getAPI.post('/api/api-token/', usercredentials);
        commit('updateStorage', { access: response.data.access, refresh: response.data.refresh });
      } catch (error) {
        throw error;
      }
    },
    async refreshToken({ commit, state }) {
      try {
        const response = await getAPI.post('/api/api-token-refresh/', {
          refresh: state.refreshToken,
        });
        commit('updateStorage', { access: response.data.access, refresh: state.refreshToken });
      } catch (error) {
        throw error;
      }
    },
    userLogout({ commit }) {
      commit('destroyToken');
    },
  },
});

export default store;
