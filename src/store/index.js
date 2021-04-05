import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

    today: new Date(),
    current: new Date(),
    weekPage:0,
    viewMode: 'week', // day | week
    reservations:[],
    tempSelected: [],
  },
  mutations: {

    CHANGE_VIEWMODE: (state, mode) => {
      state.viewMode = mode
    },

    UPDATE_TODAY: (state, date) => {
      state.today = date
    },
    
    UPDATE_CURRENT: (state, date) => {
      state.current = date
    },

    CAHNGE_PAGE: (state, num) => {
      state.weekPage = num
    },

    UPDATE_SELECTED: (state, data) => {
      state.selected = data
    },

    

    // Reservation
    ADD_RESERVATIONS: (state) => {
      state.reservations = state.tempSelected
    },

    ADD_TEMPSELECTED: (state, data) => {
      state.tempSelected.push(data)
    },

    REMOVE_TEMPSELECTED: (state, index) => {
      state.tempSelected.splice(index, 1)
    },
    
    CLEAR_TEMPSELECTED: (state) => {
      state.tempSelected = []
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
