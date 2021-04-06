<template>
  <div class="date-table">
    <Splide v-if="viewMode === 'week'" :options="splideOptions" @splide:dragged="changePage">
      <splide-slide>
        <!-- week view -->
        <table>
          <tbody class="week-mode" v-show="viewMode === 'week'">
            <tr class="period-row" v-for="hours in 24" :key="`${hours}h`" @click="weekSelected(hours, $event.target)">
              <td class="time-period">{{ hours }}:00</td>
              <td class="week-period-block" v-for="index in 7" :key="index"></td>
            </tr>
          </tbody>
        </table>
      </splide-slide>
    </Splide>

    <Splide v-if="viewMode === 'day'" :options="splideOptions" @splide:dragged="changeDate">
      <splide-slide>
        <!-- day view -->
        <table>
          <tbody class="day-mode" v-show="viewMode === 'day'">
            <tr v-for="hours in 24" :key="`${hours}h`">
              <td class="time-period">{{ hours }}:00</td>
              <td class="period-block" @click="daySelected(hours, $event.target)"></td>
            </tr>
          </tbody>
        </table>
      </splide-slide>
    </Splide>
  </div>
</template>

<script>
import { getDays, subDate, addDate, dateFormat, clearHighLight } from "@/assets/utils.js";
import { Splide, SplideSlide } from "@splidejs/vue-splide";
import '@splidejs/splide/dist/css/themes/splide-default.min.css';
export default {
  name: "DateTable",
  components: {
    Splide,
    SplideSlide,
  },
  data() {
    return {
      days: 0,
      splideOptions: {
        arrows: false,
        pagination: false,
        focus: false,
        type: 'loop',
      },
      temp:{
        start:{
          // el: null,
          date: '',
          week: '',
          dayWeek: '',
          period: ''

        },
        end:{
          // el: null,
          date: '',
          week: '',
          dayWeek: '',
          period: ''
        }
      }
    };
  },
  computed: {
    viewMode() {return this.$store.state.viewMode},
    current() {return this.$store.state.current},
    todayInfo() {return this.$store.getters.todayInfo},
    currentInfo() {return this.$store.getters.currentInfo},
    weekPage() {return this.$store.state.weekPage},
    reservations() {return this.$store.state.reservations},
    tempSelected() {return this.$store.state.tempSelected},
  },
  watch:{
    // 各種狀態更新，清理暫選
    viewMode(){
      this.clearSelected()
      this.$store.commit('CLEAR_TEMPSELECTED')

      if(this.viewMode === 'day'){
        this.day_showReservations()
      }
      else{
        this.week_showReservations()
      }
    },
    weekPage(){
      this.clearSelected()
      clearHighLight('week-period-block')
      this.$store.commit('CLEAR_TEMPSELECTED')

      this.week_showReservations()
      
    },
    current(){
      this.clearTemp()
      clearHighLight('period-block')
      this.clearSelected()
      this.$store.commit('CLEAR_TEMPSELECTED')

      this.day_showReservations()

    },
  },
  methods: {
    // 滑動切換週
    changePage(e, mouse){
      const offsetX = mouse.offset.x
      const offsetY = mouse.offset.y

      // TODO 包裝此判斷
      if(offsetX > offsetY){
        // to left > sub date
        this.$store.commit('UPDATE_CURRENT', subDate(this.current, 7))
        this.$store.commit('CAHNGE_PAGE', this.weekPage - 1)
      }
      else if(offsetX < offsetY){
        // to right > add date
        this.$store.commit('UPDATE_CURRENT', addDate(this.current, 7))
        this.$store.commit('CAHNGE_PAGE', this.weekPage + 1)
      }
    },


    // 滑動切換日期
    changeDate(e, mouse){
      const offsetX = mouse.offset.x
      const offsetY = mouse.offset.y

      // TODO 包裝此判斷
      if(offsetX > offsetY){
        // to left > sub date
        this.$store.commit('UPDATE_CURRENT', subDate(this.current, 1))
      }
      else if(offsetX < offsetY){
        // to right > add date
        this.$store.commit('UPDATE_CURRENT', addDate(this.current, 1))
      }
    },


    // weekView 選取時段
    // TODO 支持橫向選取
    weekSelected(hours, el) {
      const temp = this.temp
      const base = document.getElementById('splide01-slide01')
      const rows = base.getElementsByClassName('period-row')
      const blocks = rows[hours-1].getElementsByClassName('week-period-block')
      const dayIndex = Array.from(blocks).indexOf(el)
      const data = {
        date: dateFormat(this.current),
        week: this.weekPage,
        dayWeek: dayIndex+1,
        period: hours
      }


      

      // start 不存在
      if(!temp.start.period){
        temp.start = data
        // blocks[hours-1].children[dayIndex+1].style.background = "#E5E5E5"
        el.style.background = "#E5E5E5"
      }
      // start存在，end不存在
      else if(temp.start.period && !temp.end.period){
        temp.end = data
        el.style.background = "#E5E5E5"

        // 時間小當start (交換start/end)
        if(temp.end.period < temp.start.period){
          const change = temp.start.period
          temp.start.period = temp.end.period
          temp.end.period = change
        }
      }
      // start/end 都已存在，刷新從start開始
      else if(temp.start.period && temp.end.period){
        clearHighLight('week-period-block')
        this.day_showReservations()
        
        temp.start = data
        el.style.background = "#E5E5E5"
        temp.end = {
          el: null,
          date: null,
          week: null,
          dayWeek: null,
          period: null
        }
      }
      
      if(dayIndex+1 !== temp.start.dayWeek){
        clearHighLight('week-period-block')
        this.week_showReservations()
        
        temp.start = data
        el.style.background = "#E5E5E5"
        temp.end = {
          el: null,
          date: null,
          week: null,
          dayWeek: null,
          period: null
        }

      }

      
      this.temp = temp
      this.$store.commit('UPDATE_DATTEMPSELECTED', this.temp)
      this.rangeHighLight()
    },


    // dayView 選取時段
    // FIXME 點太快導致被選取格背景色未更新，造成資料與顯示不同步問題
    daySelected(hours, el) {
      const temp = this.temp
      const data = {
        date: dateFormat(this.current),
        week: this.weekPage,
        dayWeek: this.current.getDay(),
        period: hours
      }

      // start 不存在
      if(!temp.start.period){
        temp.start = data
        el.style.background = "#E5E5E5"
      }
      // start存在，end不存在
      else if(temp.start.period && !temp.end.period){
        temp.end = data
        el.style.background = "#E5E5E5"

        // 時間小當start (交換start/end)
        if(temp.end.period < temp.start.period){
          const change = temp.start.period
          temp.start.period = temp.end.period
          temp.end.period = change
        }
      }
      // start/end 都已存在，刷新從start開始
      else if(temp.start.period && temp.end.period){
        clearHighLight('period-block')
        this.day_showReservations()
        
        temp.start = data
        el.style.background = "#E5E5E5"
        temp.end = {
          el: null,
          date: null,
          week: null,
          dayWeek: null,
          period: null
        }
      }

      
      this.temp = temp
      this.$store.commit('UPDATE_DATTEMPSELECTED', this.temp)
      this.rangeHighLight()

      // // 都存在; new > end >> start
      // else if(hours > temp.end.period ){
      //   // todo 更新背景顏色
      //   temp.end = data
      //   this.updateHighLight('day')
      // }
      // // 都存在; new < start << end
      // else if(hours < temp.start.period){
      //   // todo 更新背景顏色
      //   console.log("here")
      //   temp.end = temp.start
      //   temp.start = data
      //   console.log(temp)
      //   this.updateHighLight('day')
      // }
    },
    

    clearTemp(){
      for(const prop in this.temp.start){
        this.temp.start[prop] = null
        this.temp.end[prop] = null
      }
    },


    // 高光當前選取時段範圍
    // TODO 支持橫向選取
    rangeHighLight(){
      if(this.temp.start.period && this.temp.end.period){
        const start = this.temp.start.period
        const end = this.temp.end.period
        const range = end - start
        

        if(this.viewMode === 'day'){
          const blocks = document.getElementsByClassName('period-block')

          for(let i=0; i<range; i++){
              blocks[start+i].style.background = "#E5E5E5"
          }
        }
        else{
          const dayWeek = this.temp.start.dayWeek
          const base = document.getElementById('splide01-slide01')
          const rows = base.getElementsByClassName('period-row')

          for(let i=0; i<=range; i++){
            rows[start-1+i].children[dayWeek].style.background = "#E5E5E5"
          }
        }


      }

    },


    // 清理暫時選取 highlight 表格
    clearSelected(){
      // TODO 如果在reservations 列表中的元素則不清除，並變換其顏色與新增資訊
      this.tempSelected.forEach(element => {
        element.el.style.background = ''
      })

      if(this.viewMode === 'day'){
        this.day_showReservations()
      }else{
        this.week_showReservations()
      }

    },


    week_showReservations(){
      this.$nextTick(()=>{
        const base = document.getElementById('splide01-slide01')
        const blocks = base.getElementsByClassName('period-row')
  
        for(let re of this.reservations){
          if(re.start.week === this.weekPage){
            const start = re.start.period
            const end = re.end.period
            const range = end - start
  
            for(let i=0; i<=range; i++){
              blocks[start-1+i].children[re.start.dayWeek].style.background = "#E5E5E5"
            }
          }
        }
      })
    },


    day_showReservations(){
      this.$nextTick(()=>{
        if(this.viewMode !== 'day') return
        const blocks = document.getElementsByClassName('period-block')
        for(let re of this.reservations){
          if(re.start.date === dateFormat(this.current)){
            const start = re.start.period
            const end = re.end.period
            const range = end - start
            
            for(let i=0; i<=range; i++){
              blocks[start-1+i].style.background = "#E5E5E5"
            }
          }
        }

      })
    }
  },
  mounted() {
    this.days = getDays(this.todayInfo.year, this.todayInfo.month);



  },
};
</script>

<style scoped>
.date-table {
  overflow: scroll;
  width: 100%;
  height: 100%;
  background-color: #F6F6F6;
  @apply h-5/6 pb-12;
}

table,
tbody,
tr {
  display: table;
  width: 100%;
}

.day-mode, .week-mode {
  width: 100%;
}

table,
th,
td {
  border: 1px solid black;
  @apply border border-gray-300;
}

td {
  /* width: 50%; */
  height: 70px;
}

.time-period {
  @apply w-1/6 align-bottom;
}
</style>
