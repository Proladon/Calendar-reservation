import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    today: '',
    current: '',
    viewMode: 'week' // day | week
  },
  mutations: {
    UPDATE_CURDATE: (state, date) => {
      state.curDate = date
    },

    CHANGE_VIEWMODE: (state, mode) => {
      state.viewMode = mode
    }

  },
  actions: {
  },
  modules: {
  },
  getters:{
    // dateInfo: (state) => {

    // }
  }
})
