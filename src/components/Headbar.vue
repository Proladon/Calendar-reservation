<template>
  <div class="headbar">
    <!-- 最頂部功能按鍵容器 -->
    <div class="func-btn-container">
      <div class="title" v-if="viewMode === 'week'">預約行事曆</div>
      <div class="title change-date-btn-container" v-if="viewMode === 'day'">
        <div @click="preDate">←</div>
        <div>{{fullDate}}</div>
        <div @click="nextDate">→</div>
      </div>
      <div class="func-btn mr-2" @click="changeViewMode">{{viewMode==='day'?'日檢視':'週檢視'}} ▼</div>
      <div class="func-btn">P ▼</div>
    </div>

    <!-- 星期與日期按鈕容器 -->
    <div class="day-btn-container">
      <!-- 日曆按鈕 -->
      <div class="calendar-picker">?</div>
      <!-- 星期與日期按鈕 -->
      <div class="day-btn"
             v-for="day, index in dayEnTitle"
             :key="`day-${index}`"
             :class="{selected : curDate === dates[week][index]}"
             @click="changeCurDate(index)">
             <p>{{day}}</p>
             <p :class="{'hide-date': dateFormat(dates[week][index]) === '00'}">
               {{dateFormat(dates[week][index])}}
             </p>
      </div>
    </div>
    
    <!-- 提示點容器 -->
    <div class="hint-dots-container">
      <div></div>
      <div class="hint-dot" 
             v-for="index in 7" :key="`dot-${index}`"
             >
        <span v-if="showDot === index">·</span>
      </div>
    </div>

  </div>
</template>

<script>
import {year, month, date, dayWeek} from '@/assets/utils.js'
export default {
  name: 'Headbar',
  props:['today', 'dates', 'current', 'week', 'viewMode'],
  computed:{
    curDate(){
      return date(this.current)
    },
    fullDate(){
      return `${year(this.current)} / ${month(this.current)} / ${date(this.current)}`
    }
  },
  data(){
    return{
      dayEnTitle: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
      showDot: 1,
    }
  },
  methods:{
    dateFormat(date){
      if(date === '00'){
        return '00'
      }
      else if(date < 10){
        return `0${date}`
      }else{
        return date
      }
    },

    changeViewMode(){
      const mode = (this.viewMode === 'week') ? 'day' : 'week'
      this.$emit('changeViewMode', mode)
    },

    changeCurDate(index){
      const selectDate = this.dates[this.week][index]
      const newDate = new Date(year(this.current), month(this.current) - 1, selectDate)
      this.$emit('changeCurent', newDate)
    },

    preDate(){
      this.$emit('preDate')
    },

    nextDate(){
      this.$emit('nextDate')
    }
  },
  beforeMount(){
    // 初始化今日提示點
    this.showDot = dayWeek(this.today)
  }
}
</script>

<style scoped>
.headbar{
  @apply sticky top-0;
  @apply bg-white shadow-lg z-10;
}

/*==================*/
/* function btn container */
/*==================*/
.func-btn-container{
  @apply flex justify-between;
  @apply w-full p-2.5;
}

.title{
  flex: 2;
}

.func-btn{
  @apply p-2 px-4 bg-skyblue-100 rounded-full cursor-pointer;
}

.change-date-btn-container{
  @apply flex;
}


/*==================*/
/* day btn container */
/*==================*/
.day-btn-container{
  display: grid;
  grid-template-columns: 1.3fr repeat(7, 1fr);
  @apply text-center place-items-center pt-2;
}

.day-btn{
  @apply hover:bg-skyblue-100;
  @apply w-5/6 p-1 rounded-md cursor-pointer text-sm leading-4 select-none;
}

.hide-date{
  @apply text-transparent;
}

.hint-dots-container{
  display: grid;
  grid-template-columns: 1.3fr repeat(7, 1fr);
}

.hint-dot{
  height: 15px;
  @apply relative mb-2;
}

.hint-dot > span{
  top: -10px;
  @apply absolute left-0 right-0;
  @apply text-center pointer-events-none leading-3 text-5xl text-skyblue-100;
}

.selected{
  @apply bg-skyblue-100;
}
/* ================= */
</style>
