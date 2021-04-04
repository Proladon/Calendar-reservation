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

      <div class="day-btn-container">
        <div class="day-btn" v-for="dTitle, index in dayEnTitle" :key="`day-${index}`">
          
          <div class="day-num-wrapper selected">
            <div class="day-en-tile">{{dTitle}}</div>
            <div class="day-num">0{{index + 1}}</div>
          </div>

          <div class="hint-dot">·</div>
        </div>
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
  @apply rounded-md
}

</style>
