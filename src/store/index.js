import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    curDate: '',
    viewMode: 'week' // day | week
  },
  mutations: {
    UPDATE_CURDATE: (state, date) => {
      state.curDate = date
    }
  },
  actions: {
  },
  modules: {
  }
})
