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
    import {getDays} from '@/assets/utils.js'
    export default {
       name: 'DateTable',
       data(){
           return{
               selected:[],
               days: 0,
           }
       },
       
       computed:{
           viewMode(){return this.$store.state.viewMode},
           todayInfo(){return this.$store.getters.todayInfo}
       },

       methods:{
            weekSelected(hours, el){
                const selected = this.selected
                const week = Array.from(el.parentElement.children).indexOf(el)
                const isExist = selected.find(el => el.id === `${week}-${hours}`)

                if(isExist){
                    el.style.background = ''
                    selected.splice(selected.indexOf(isExist), 1)
                }
                else{
                    el.style.background = '#E5E5E5'
                    selected.push({
                        id: `${week}-${hours}`,
                        month: this.todayInfo.month,
                        date: this.todayInfo.date,
                        week: week,
                        period: hours
                    })
                }
            },


            daySelected(hours, el){
                const selected = this.selected

                
 
                if(selected.includes(hours)){
                    selected.splice(selected.indexOf(hours), 1)
                    el.style.background = ''
                }
                else{
                    el.style.background = '#E5E5E5'
                    selected.push(hours)
                }
            },

       },

       mounted(){
           this.days = getDays(this.todayInfo.year, this.todayInfo.month)
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