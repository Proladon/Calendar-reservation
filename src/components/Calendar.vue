<template>
  <div class="calendar">
    <div class="calendar-title">
      {{year}} / {{month}}
    </div>
  
  <table>
    <tbody class="calendar-content">
      <tr v-for="row, index in days" :key="`row-${index}`">
        <td v-for="date, index in row" 
            :key="`day-${index}`"
            class="date-btn"
            @click="selectDate(date)">
          {{date}}
        </td>
      </tr>
    </tbody>
  </table>

  </div>
</template>

<script>
import { getDays } from "@/assets/utils.js";
export default {
  name: 'Calendar',
  props:['year', 'month'],
  computed:{
      current(){return this.$store.state.current},
      today(){return this.$store.state.today},
  },

  data(){
    return{
      days: []
    }
  },
  methods:{
    daysPageInit() {
      this.days = [];
      const year = this.year;
      const month = this.month;
      
      // how many days in month
      const daysOfMonth = getDays(year, month);
      

      // day of month first date
      const startDay = new Date(year, month-1, 1).getDay();


      // startDay offset
      const offset = startDay - 1;


      // arrary all date in month
      let allDays = []
      if(offset > 0){allDays = new Array(offset).fill(" ")}

      for (let i = 1; i <= daysOfMonth; i++) {
        allDays.push(i)
      }

      
      // slice days page
      for (
        let times = 0;
        times < Math.ceil(allDays.length / 7);
        times++
      ) {
        this.days.push(allDays.slice(times * 7, times * 7 + 7));
      }

      // offset fill
      const offsetEnd = 7 - this.days[this.days.length - 1].length
      for(let i=1; i<=offsetEnd; i++){
        this.days[this.days.length - 1].push(' ')
      }

    },


    selectDate(date){
      const newDate = new Date(this.year, this.month-1, date)
      this.$store.commit('UPDATE_CURRENT', newDate)
      this.$emit('close')
    }
  },

  mounted(){
    this.$nextTick(()=>{
      this.daysPageInit()
    })
  }


}
</script>

<style scoped>
.calendar{
  @apply absolute top-0 bottom-0 right-0 left-0 z-50;
  @apply w-full h-full bg-gray-700 opacity-80 px-7;
  /* @apply pointer-events-none; */
}

.calendar-title{
  @apply text-gray-700 text-xl text-center font-medium mb-2;
}

.calendar-content{
  @apply text-gray-700 text-lg;
}

.date-btn{
  @apply cursor-pointer;
}

table{
  @apply mx-auto w-full;
}

tbody{
  display: table
  @apply w-full;
}

td{
  height: 50px;
  @apply text-center hover:bg-gray-600 hover:text-white;
}


@media screen and (min-width: 1200px) {
  .calendar{
    @apply px-80;
  }

  td{
    height: 70px;
  }
}

</style>
