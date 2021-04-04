<template>
  <div class="headbar">
    <div class="func-btn-container">
      <p>預約行事曆</p>

    </div>
    
    <div class="week-day-container">
      <div class="select-date-btn">💎</div>
      
      <div class="day-btn" >
        <div class="day-en-tile">M</div>
        <div class="day-num">01</div>
      </div>

    </div>

  </div>
</template>

<script>
export default {
  name: 'Headbar',
  props: {
    msg: String
  },
  
}
</script>

<style scoped>
.headbar{
  @apply flex flex-col justify-between;
  @apply shadow-md h-1/6 p-4;
}

.func-btn-container{
  @apply flex ;
  @apply bg-gray-300;
}

.week-day-container{
  @apply flex justify-between;
  @apply bg-gray-300;
}

.day-btn{
  @apply flex flex-col text-gray-700;
}
</style>
