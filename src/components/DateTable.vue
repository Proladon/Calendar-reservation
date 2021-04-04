<template>
   <div class="date-table">
       <table >
           <!-- day view -->
           <tbody class="day-mode" v-show="viewMode === 'week'">
               <tr v-for="hours in 24" 
                   :key="`${hours}h`" 
                   @click="weekSelected(hours, $event.target)">

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
           <tbody class="week-mode" v-show="viewMode === 'day'">
               <tr v-for="hours in 24" :key="`${hours}h`">
                   <td class="time-period">{{hours}}:00</td>
                   <td @click="daySelected(hours, $event.target)"></td>
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
       },
       data(){
           return{
               selected:[]
           }
       },
       methods:{
           weekSelected(hours, el){
               const week = Array.from(el.parentElement.children).indexOf(el)
               console.log(week, hours)
           },
           daySelected(hours, el){
               el.style.background = '#E5E5E5'
               const selected = this.selected
               if(selected.includes(hours)){
                   selected.splice(selected.indexOf(hours), 1)
                   el.style.background = ''
               }
               else{
                   selected.push(hours)
               }
           },
           clear(){
               this.selected.length = 0
           }
       }
   }
</script>

<style scoped>
.date-table{
    overflow: scroll;
    width: 100%;
    height: 100%;
    @apply h-5/6 pb-12;
    
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