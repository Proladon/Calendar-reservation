import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

    today: new Date(),
    current: '',
    viewMode: 'week' // day | week

  },
  mutations: {

    CHANGE_VIEWMODE: (state, mode) => {
      state.viewMode = mode
    }

  },

  actions: {

  },

  modules: {

  },

  getters:{
    todayInfo: (state) => {
      const today = state.today
      
      return {
        year: today.getFullYear(),
        month: today.getMonth(),
        date: today.getDate(),
      }
    }

  }
})
