<template>
  <div class="home">
    <Headbar :today="today" 
                    :dates="dates" 
                    :current="current" 
                    :week="week" 
                    :viewMode="viewMode" 
                    @preDate="preDate"
                    @nextDate="nextDate"
                    @changeCurent="changeCurent"
                    @changeViewMode="changeViewMode" />
    
    <TimeGrid :today="today" 
                    :dates="dates" 
                    :current="current" 
                    :week="week" 
                    :viewMode="viewMode" />
  </div>
</template>

<script>
import {year, month, days,date,  listDates} from '@/assets/utils.js'
import Headbar from '@/components/Headbar.vue'
import TimeGrid from '@/components/TimeGrid.vue'

export default {
  name: 'Home',
  components: {Headbar, TimeGrid},
  data(){
    return{
      dates:[],
      today: new Date(),
      current: new Date(),
      week: 0,
      viewMode: 'week'
    }
  },
  methods:{
    getDates(){
      const ds = days(year(this.today), month(this.today))
      const allDates = listDates(ds)
      
      // const preMonthDays = days(year(this.today), month(this.today) - 1)
      const offset = 7 - new Date(year(this.today), month(this.today) - 1).getDay()
      for(let i=0; i < offset; i++){
        allDates.unshift('00')
      }

      const sliceTimes = Math.ceil(allDates.length / 7)
      for(let i=0; i < sliceTimes; i++){
          this.dates[i] = allDates.slice(7*i, 7 + 7*i)
      }
    },

    changeViewMode(mode){
      this.viewMode = mode
    },

    changeCurent(date){
      this.current = date
    },

    preDate(){
      const newDate = new Date(year(this.current), month(this.current)-1, date(this.current)-1)
      this.current = newDate
    },

    nextDate(){
      const newDate = new Date(year(this.current), month(this.current)-1, date(this.current)+1)
      this.current = newDate
    }
  },
  beforeMount(){
    this.getDates()

    // 導向今日日期在第幾週
    const d = date(this.today)
    for(let page in this.dates){
      if(this.dates[page].find(date=>date===d)){
        this.week = page
      }
    }

  }
}
</script>
