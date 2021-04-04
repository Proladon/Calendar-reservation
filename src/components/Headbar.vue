<template>
  <div class="headbar">
        
    <div class="func-btn-container">
      <!-- <p>預約行事曆</p> -->
      <input type="date" name="" id="">
      <div class="cur-date">
      </div>
      <div class="view change-btn">日檢視 ▼</div>
      <div class="user change-btn">江 ▼</div>

    </div>
    
    <div class="week-day-container">
      <div class="select-date-btn">💎</div>
      
      <div class="day-btn" v-for="dTitle, index in dayEnTitle" :key="dTitle">
        <div class="day-en-tile">{{dTitle}}</div>
        <div class="day-num">0{{index + 1}}</div>
      </div>

    </div>

  </div>
</template>

<script>
export default {
  name: 'Headbar',
  
  data(){
    return{
      dayEnTitle: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
    }
  }
  
}
</script>

<style scoped>
.headbar{
  @apply flex flex-col justify-between;
  @apply shadow-md h-1/6 p-2;
}

.func-btn-container{
  @apply flex justify-between;
}

.week-day-container{
  @apply flex justify-between;
}

.day-btn{
  @apply flex justify-center items-center;
  @apply flex-col text-gray-700 text-sm;
}

.change-btn{
  background-color: #DEDAF4;
  @apply cursor-pointer rounded-full p-2 px-3 text-sm;
}

.cur-date{
  flex: 2;
}

.view{
  @apply mr-3;
}
</style>
