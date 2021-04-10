<template>
  <div class="headbar">
    <!-- 最頂部功能按鍵容器 -->
    <div class="func-btn-container">
      <div class="title">預約行事曆</div>
      <div class="func-btn mr-2">{{viewMode==='day'?'日檢視':'週檢視'}} ▼</div>
      <div class="func-btn">Proladon ▼</div>
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
             {{dates[week-1][index]}}
      </div>
    </div>
    
    <!-- 提示點容器 -->
    <div class="hint-dots-container">
      <div></div>
      <div class="hint-dot" 
             v-for="index in 7" :key="`dot-${index}`"
             >
              <span v-if="showDot === index">●</span>
             </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Headbar',
  props:['today', 'dates'],
  data(){
    return{
      dayEnTitle: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
      showDot: 1,
      viewMode: 'week',
      week: 1,
    }
  },
}
</script>

<style scoped>
.headbar{
  @apply sticky top-0;
  @apply bg-white shadow-md z-10;
}

/*==================*/
/* function btn container */
/*==================*/
.func-btn-container{
  @apply flex justify-between;
  @apply w-full p-4;
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
  @apply text-center place-items-center;
}

.day-btn{
  @apply hover:bg-skyblue-100;
  @apply w-1/2 rounded-md cursor-pointer;
}

.hint-dots-container{
  display: grid;
  grid-template-columns: 1.3fr repeat(7, 1fr);
}

.hint-dot{
  height: 15px;
  @apply flex justify-center items-center;
}

.hint-dot > span{
  @apply text-center pb-5 pt-2;
}
/* ================= */
</style>
