import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

    today: new Date(),
    current: new Date(),
    weekPage:0,
    viewMode: 'week', // day | week
    reservation:[],

  },
  mutations: {

    CHANGE_VIEWMODE: (state, mode) => {
      state.viewMode = mode
    },

    ADD_RESERVATION: (state, date) => {
      state.reservation.push(date)
    },

    UPDATE_TODAY: (state, date) => {
      state.today = date
    },
    
    UPDATE_CURRENT: (state, date) => {
      state.current = date
    },

    CAHNGE_PAGE: (state, num) => {
      state.weekPage = num
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
        month: today.getMonth() + 1,
        date: today.getDate(),
        day: today.getDay()
      }
    },

  }
})
