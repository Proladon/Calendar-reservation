<template>
  <div class="home">
    <Headbar :today="today" :dates="dates" />
    <TimeGrid />
  </div>
</template>

<script>
import {year, month, days, listDates} from '@/assets/utils.js'
import Headbar from '@/components/Headbar.vue'
import TimeGrid from '@/components/TimeGrid.vue'

export default {
  name: 'Home',
  components: {Headbar, TimeGrid},
  data(){
    return{
      dates:[],
      today: new Date(),
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
  },
  beforeMount(){
    this.getDates()
  }
}
</script>
