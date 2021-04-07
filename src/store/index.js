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
    dayTempSelected:{
      info:{
        service:'',
        name: ''
      },
      start:{
        date: null,
        week: null,
        dayWeek: null,
        period: null

      },
      end:{
        date: null,
        week: null,
        dayWeek: null,
        period: null
      }
    },
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
    ADD_RESERVATIONS: (state, reservation) => {
      state.reservations.push(reservation)

      // if(!state.dayTempSelected.end.period){
      //   state.dayTempSelected.end = state.dayTempSelected.start
      // }
      // const reservation = JSON.parse(JSON.stringify(state.dayTempSelected))
      // state.reservations.push(reservation)
    },

    ADD_TEMPSELECTED: (state, data) => {
      state.tempSelected.push(data)
    },

    REMOVE_TEMPSELECTED: (state, index) => {
      state.tempSelected.splice(index, 1)
    },
    
    CLEAR_TEMPSELECTED: (state) => {
      state.tempSelected = []
    },


    UPDATE_DATTEMPSELECTED: (state, data) => {
      state.dayTempSelected = data
    },

    CLEAR_DAYTEMPSELECTED: (state) => {
      for(const prop in state.dayTempSelected.start){
        state.dayTempSelected.start[prop] = null
        state.dayTempSelected.end[prop] = null
      }
    },


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
    
    currentInfo: (state) => {
      const current = state.current
      return {
        year: current.getFullYear(),
        month: current.getMonth() + 1,
        date: current.getDate(),
        day: current.getDay()
      }
    }

  }
})
