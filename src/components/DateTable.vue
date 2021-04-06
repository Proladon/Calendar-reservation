<template>
  <div class="date-table">
    <Splide v-if="viewMode === 'week'" :options="splideOptions" @splide:dragged="changePage">
      <splide-slide>
        <!-- week view -->
        <table>
          <tbody class="week-mode" v-show="viewMode === 'week'">
            <tr v-for="hours in 24" :key="`${hours}h`" @click="weekSelected(hours, $event.target)">
              <td class="time-period">{{ hours }}:00</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
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
import { getDays, subDate, addDate } from "@/assets/utils.js";
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
          el: null,
          date: '',
          week: '',
          dayWeek: '',
          period: ''

        },
        end:{
          el: null,
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
    weekPage() {return this.$store.state.weekPage},
    reservation() {return this.$store.state.reservation},
    tempSelected() {return this.$store.state.tempSelected}
  },
  watch:{
    // 各種狀態更新，清理暫選
    viewMode(){
      this.clearSelected()
      this.$store.commit('CLEAR_TEMPSELECTED')
    },
    weekPage(){
      this.clearSelected()
      this.$store.commit('CLEAR_TEMPSELECTED')
    },
    current(){
      this.clearSelected()
      this.$store.commit('CLEAR_TEMPSELECTED')
    },

  },
  methods: {
    // 滑動切換週日期
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


    // weekView 下選取時段
    weekSelected(hours, el) {
      const tempSelected = this.tempSelected;
      const week = Array.from(el.parentElement.children).indexOf(el);
      const isExist = tempSelected.find((el) => el.id === `${week}-${hours}`);
      
      if (isExist) {
        el.style.background = "";
        tempSelected.splice(tempSelected.indexOf(isExist), 1);
      } 
      else {
        el.style.background = "#E5E5E5";
        this.$store.commit('ADD_TEMPSELECTED', {
          id: `${week}-${hours}`,
          date: this.current,
          week: this.weekPage,
          el: el,
          dayweek: week,
          period: hours,
        })
      }
    },


    // dayView 下選取時段
    // FIXME 點太快導致被選取格背景色未更新，造成資料與顯示不同步問題
    daySelected(hours, el) {
      const data = {
        el: el,
        date: this.current,
        week: this.weekPage,
        dayWeek: this.current.getDay(),
        period: hours
      }

      const temp = this.temp

      // start 不存在
      if(!temp.start.el){
        temp.start = data
        el.style.background = "#E5E5E5"
      }
      // start存在，end不存在
      else if(temp.start.el && !temp.end.el){
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
        temp.start.el.style.background = ''
        temp.end.el.style.background = ''
        
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

    

    // 清理暫時選取 highlight 表格
    clearSelected(){
      // TODO 如果在reservations 列表中的元素則不清除，並變換其顏色與新增資訊
      this.tempSelected.forEach(element => {
        element.el.style.background = ''
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
