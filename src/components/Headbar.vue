<template>
  <div class="headbar">
        
    <div class="func-btn-container">
      <!-- <p>預約行事曆</p> -->
      <input type="date" name="" id="">
      <div class="cur-date">
      </div>
      <div class="view change-btn" @click="changeMode">日檢視 ▼</div>
      <div class="user change-btn">江 ▼</div>

    </div>
    
    <div class="week-day-container">
      <div class="select-date-btn">💎</div>

      <div class="day-btn-container">
        
        <div class="day-btn" v-for="dTitle,index in dayEnTitle" :key="`day-${index}`">
          
          <div class="day-num-wrapper" @click="selectDate($event.target)">
            <div class="day-en-tile pointer-events-none">{{dTitle}}</div>
            
            <!-- Cannot read property '0' of undefined ?? -->
            <div class="day-num pointer-events-none">{{days[page][index]}}</div>
          </div>

          <div class="hint-dot">·</div>
        </div>
      </div>
      
      
    </div>

  </div>
</template>

<script>
import {getDays} from '@/assets/utils.js'
export default {
  name: 'Headbar',
  
  data(){
    return{
      dayEnTitle: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
      days: [],
      page: 1,
    }
  },

  computed:{
    viewMode(){return this.$store.state.viewMode},
    todayInfo(){return this.$store.getters.todayInfo}
  },

  methods:{
    changeMode(){
      switch(this.viewMode){
        case 'day':
          this.$store.commit('CHANGE_VIEWMODE', 'week')
          break
        case 'week':
          this.$store.commit('CHANGE_VIEWMODE', 'day')
          break
      }
    },

    selectDate(el){
      document.getElementsByClassName('day-num-wrapper').forEach(element => {
        element.classList.remove('selected')
      })

      el.classList.add('selected')
      // update curdate
    }
  },
  
  mounted(){
      // how many days in month
      const daysOfMonth = getDays(this.todayInfo.year, this.todayInfo.month)
      
      // day of month first date
      const startDay = new Date(this.todayInfo.year, this.todayInfo.month, 1).getDay() + 1

      // startDay offset
      const offset = startDay - 1

      // arrary all date in month 
      const allDays = new Array(offset).fill(' ')
      for(let i=1; i<daysOfMonth; i++){
        allDays.push(i)
      }

      // slice days page
      for(let times=0; times<(Math.ceil(allDays.length/7)); times++ ){
        this.days.push(allDays.slice(times*7, times*7 + 7))
      }

  }
  
}
</script>

<style scoped>
.headbar{
  @apply flex flex-col justify-between;
  @apply shadow-md h-1/6 px-2 pt-2 bg-white;
}

.func-btn-container{
  @apply flex justify-between;
}

.week-day-container{
  @apply flex justify-between;
}



.change-btn{
  background-color: #DEDAF4;
  @apply cursor-pointer rounded-full p-2 px-3 text-sm leading-4;
}

.cur-date{
  flex: 2;
}

.view{
  @apply mr-3;
}


.day-btn-container{
  @apply flex;
}

.day-btn{
  @apply flex justify-center items-center;
  @apply flex-col text-gray-700 text-sm px-1 text-center ;
}

.day-num-wrapper{
  @apply pt-0.5 pb-0.5 px-2.5 leading-4; 
}

.hint-dot{
  @apply m-0 p-0 text-sm leading-3;
}

.selected{
  background-color: #7F74B4;
  @apply rounded-md text-white;
}

</style>
