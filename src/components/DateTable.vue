<template>
   <div class="date-table">
       <table>
           <!-- day view -->
           <tbody class="day-mode" v-if="viewMode === 'day'">
               <tr v-for="hours in 24" :key="`${hours}h`">
                   <td class="time-period">{{hours}}:00</td>
                   <td></td>
                   <td></td>
                   <td></td>
                   <td></td>
                   <td></td>
                   <td></td>
                   <td></td>
               </tr>
           </tbody>

           <!-- week view -->
           <tbody class="week-mode" v-if="viewMode === 'week'">
               <tr v-for="hours in 24" :key="`${hours}h`">
                   <td class="time-period">{{hours}}:00</td>
                   <td></td>
               </tr>
           </tbody>

       </table>
   </div>
</template>

<script>
   export default {
       name: 'DateTable',
       computed:{
           viewMode(){return this.$store.state.viewMode}
       }
   }
</script>

<style scoped>
.date-table{
    overflow: scroll;
    width: 100%;
    height: 100%;
    @apply h-5/6;
    
}
table{
    width: 100%;
}
table, th, td {
  border: 1px solid black;
  @apply border border-gray-300;
  
}

td{
    width: 50px;
    height: 70px;
}

.time-period{
    @apply w-1/6;
}


</style>