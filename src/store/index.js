import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

    today: new Date(),
    current: new Date(),
    weekPage:0,
    viewMode: 'week',
    reservations:[],
    
    lastSelectDate: {
      el:null,
      date: null,
    },

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
    
    // 切換檢視模式
    CHANGE_VIEWMODE: (state, mode) => {
      state.viewMode = mode
    },

    
    // 更新現在顯示日期
    UPDATE_CURRENT: (state, date) => {
      state.current = date
    },

    
    // 切換週頁數
    CAHNGE_PAGE: (state, num) => {
      state.weekPage = num
    },


    // 切換週頁數
    UPDATE_LASTSELECTDATE: (state, data) => {
      state.lastSelectDate = data
    },


    // 新增預約
    ADD_RESERVATIONS: (state, reservation) => {
      state.reservations.push(reservation)
    },


    // 暫時選取時段範圍
    UPDATE_DATTEMPSELECTED: (state, data) => {
      state.dayTempSelected = data
    },

    // 清除暫時選取時段範圍
    CLEAR_DAYTEMPSELECTED: (state) => {
      for(const prop in state.dayTempSelected.start){
        state.dayTempSelected.start[prop] = null
        state.dayTempSelected.end[prop] = null
      }
    },


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
