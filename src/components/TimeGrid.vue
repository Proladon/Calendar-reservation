<template>
   <div class="time-grid">
     <div class="period-row"
            v-for="hours in 24" 
            :key="`time-${hours}`">
            
      <div class="period-block hours"><span>{{period(hours)}}</span></div>
      <div class="period-block" 
             v-for="index in 7" 
             :style="timePosition"
             :key="`${index}-${hours}`">

             <hr class="time-bar"
                   v-if="getBlockDate(index) === curDate && showTimeBar === `${index}-${hours}`">

             <div class="time-dot"
                    v-if="getBlockDate(index) === curDate && showTimeBar === `${index}-${hours}`">
                    <span>●</span> 
              </div>
      </div>

     </div>
   </div>
</template>

<script>
import {date, dayWeek} from '@/assets/utils.js'
export default {
    name: 'TimeGrid',
    props:['today', 'dates', 'current', 'week'],
    data(){
      return{
        showTimeBar: '1-1',
      }
    },
    computed:{
      curDate(){
        return date(this.today)
      },

      curHours(){
        return this.today.getHours()
      },

      curDay(){
        return dayWeek(this.today)
      },

      timePosition(){
        const min = this.today.getMinutes()
        return {
          '--topOffset' : (min/60)*100 + '%',
          '--dotOffset' : (min/60)*100 - 20 + '%',
        }
      }
    },
    methods:{
      period(hours){
        let period = 'am'
        if(hours > 12) {
          period = 'pm'
          hours -= 12
        }
        return `${hours}:00${period}`
      },

      getBlockDate(index){
        return this.dates[this.week][index - 1]
      }
    },

    beforeMount(){
      this.showTimeBar = `${this.curDay}-${this.curHours}`
    }
}
</script>

<style scoped>
.time-grid{
  @apply w-full h-full text-center;
}

.period-row{
  display: grid;
  height: 65px;
  grid-template-columns: 1.3fr repeat(7, 1fr);
}

.period-block{
  --color: skyblue;
  
  @apply cursor-pointer hover:bg-skyblue-100 relative;
  @apply border border-gray-200 text-sm align-bottom h-full w-full;
}

.hours{
  @apply relative ;
}

.hours > span{
  bottom: -5px;
  @apply absolute left-0 right-0 w-full text-center m-0 p-0;
}

.time-bar{
  top: var(--topOffset);
  @apply absolute right-0 left-0;
  @apply border border-skyblue-100;
}


.time-dot{
  position: absolute;
  font-size: 30px;
  top: var(--dotOffset);
  left: -10px;
  color: skyblue;
}
</style>