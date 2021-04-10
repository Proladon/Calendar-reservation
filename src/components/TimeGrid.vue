<template>
   <div class="time-grid">
     <div class="period-row"
            v-for="hours in 24" 
            :key="`time-${hours}`">
            
      <div class="period-block hours"><span>{{period(hours)}}</span></div>
      <div class="period-block" 
             v-for="index in 7" 
             :key="`${hours}-${index}`">
             {{hours}}-{{index}}
             <!-- <hr v-if=""> -->
      </div>

     </div>
   </div>
</template>

<script>
export default {
    name: 'TimeGrid',
    computed:{
      },
    methods:{
      period(hours){
        let period = 'am'
        if(hours > 12) {
          period = 'pm'
          hours -= 12
        }
        return `${hours}:00${period}`
      }
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
</style>