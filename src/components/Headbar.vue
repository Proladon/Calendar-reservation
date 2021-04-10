<template>
  <div class="headbar">
    <!-- 最頂部功能按鍵容器 -->
    <div class="func-btn-container">
      <div class="title">預約行事曆</div>
      <div class="func-btn mr-2">{{viewMode==='day'?'日檢視':'週檢視'}} ▼</div>
      <div class="func-btn">P ▼</div>
    </div>

    <!-- 星期與日期按鈕容器 -->
    <div class="day-btn-container">
      <!-- 日曆按鈕 -->
      <div class="calendar-picker">?</div>
      <!-- 星期與日期按鈕 -->
      <div class="day-btn"
             v-for="day, index in dayEnTitle"
             :key="`day-${index}`">
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
import {dayWeek} from '@/assets/utils.js'
export default {
  name: 'Headbar',
  props:['today', 'dates', 'current', 'week'],
  data(){
    return{
      dayEnTitle: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
      showDot: 1,
      viewMode: 'week',
    }
  },
  watch:{
    current(){
      console.log("change")
      // TODO 判斷是否顯示 Hint-dot
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
  @apply px-2;
  @apply p-2 px-4 bg-skyblue-100 rounded-full;
}


/*==================*/
/* function btn container */
/*==================*/
.day-btn-container{
  display: grid;
  grid-template-columns: 1.3fr repeat(7, 1fr);
  @apply text-center place-items-center pt-2;
}

.day-btn{
  @apply hover:bg-skyblue-100;
  @apply w-5/6 p-1 rounded-md cursor-pointer text-sm leading-4;
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
  @apply text-center pointer-events-none leading-3 text-5xl;
}
/* ================= */
</style>
