<template>
  <div class="time-grid">
    
    <!-- Week -->
    <div class="week-view-container" v-if="viewMode === 'week'">
      <div class="week-period-row" v-for="hours in 24" :key="`time-${hours}`">
        <div class="period-block hours"><span>{{period(hours)}}</span></div>
        <div class="period-block" v-for="index in 7" :style="timePosition" :key="`${index}-${hours}`">
          <hr class="time-bar" v-if="getBlockDate(index) === todayDate && showTimeBar === `${index}-${hours}`">
          <div class="time-dot" v-if="getBlockDate(index) === todayDate && showTimeBar === `${index}-${hours}`">
            <span>●</span>
          </div>
        </div>
      </div>
    </div>

      <!-- Day -->
    <div class="day-view-container" v-if="viewMode === 'day'">
      <div class="day-period-row" v-for="hours in 24" :key="`time-${hours}`">
        <div class="period-block hours"><span>{{period(hours)}}</span></div>
        <div class="period-block" :style="timePosition" :key="`day-${hours}`">
          <hr class="time-bar" v-if="curDate === todayDate && showDayTimeBar === `day-${hours}`">
          <div class="time-dot" v-if="curDate === todayDate && showDayTimeBar === `day-${hours}`">
            <span>●</span>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import {date, dayWeek} from '@/assets/utils.js'
export default {
    name: 'TimeGrid',
    props:['today', 'dates', 'current', 'week', 'viewMode'],
    data(){
      return{
        showTimeBar: '1-1',
        showDayTimeBar: '1-1'
      }
    },
    computed:{
      todayDate(){
        return date(this.today)
      },

      curDate(){
        return date(this.current)
      },

      curHours(){
        return this.today.getHours() + 1
      },

      todayDay(){
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
      this.showTimeBar = `${this.todayDay}-${this.curHours}`
      this.showDayTimeBar = `day-${this.curHours}`
    }
}
</script>

<style scoped>
.time-grid{
  @apply w-full h-full text-center;
}

.week-period-row, .day-period-row{
  display: grid;
  height: 65px;
}

.week-period-row{
  grid-template-columns: 1.3fr repeat(7, 1fr);
}

.day-period-row{
  grid-template-columns: 1.3fr 7fr;
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
  @apply border border-gray-500;
}


.time-dot{
  position: absolute;
  font-size: 30px;
  top: var(--dotOffset);
  left: -10px;
  @apply text-gray-500;
}
</style>