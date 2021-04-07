<template>
  <div class="headbar">
    <div class="func-btn-container">
      <div class="current-date-container">
        <div v-show="viewMode === 'day'" 
          @click="backwardDate">
          <img class="transform rotate-180 w-5" 
               v-show="!onlyDayWeekTitle" 
               src="@/assets/arrow.svg" alt="arrow-btn">
        </div>

        <div v-show="onlyDayWeekTitle" 
             class="select-date-btn change-btn" 
             @click="$emit('calendar')">
          <img class="claendar-icon" src="@/assets/calendar.png" alt="">
        </div>
        <p class="cur-date" v-show="onlyDayWeekTitle">選擇日期</p>  
        
        <p class="page-title " 
           v-show="!onlyDayWeekTitle">
           {{viewMode === 'day' ? curDate : '預約行事曆'}}
        </p>
        
        <div v-show="viewMode === 'day'" @click="forwardDate">
          <img class="w-5" v-show="!onlyDayWeekTitle" src="@/assets/arrow.svg" alt="arrow-btn">
        </div>
      </div>

      <div class="cur-date"></div>

      
      
      <div class="view change-btn" v-show="!onlyDayWeekTitle" @click="changeMode">
        {{ viewMode === "day" ? "日檢視" : "周檢視" }} ▼
      </div>
      
      <div class="user change-btn" v-show="!onlyDayWeekTitle" @click="lineLogin">P ▼</div>

      <img class="close-btn" 
           v-show="onlyDayWeekTitle" 
           src="@/assets/close.png" 
           alt="close-btn"
           @click="closeCalendar">
    </div>

    <div class="week-day-container " v-show="!onlyDayWeekTitle">

      <div class="day-btn-container" v-if="days.length > 0">
        <div class="select-date-btn change-btn" @click="$emit('calendar')">
          <img class="claendar-icon" src="@/assets/calendar.png" alt="">
        </div>
        <div
          class="day-btn"
          v-for="(dTitle, index) in dayEnTitle"
          :key="`day-${index}`"
        >
          <div
            class="day-num-wrapper"
            @click="selectDate($event.target, index)"
          >
            <div class="day-en-tile pointer-events-none">
              {{ dTitle }}
            </div>

            <!-- Cannot read property '0' of undefined ?? -->
            <div class="day-num pointer-events-none">
              {{ pad(index) }}
            </div>
          </div>

        </div>
      </div>
    </div>

    <div v-show="onlyDayWeekTitle" class="mx-auto">{{curDate}}</div>


    <div class="calendar-day-week-title-container" v-show="onlyDayWeekTitle">

      <div class="calendar-day-week-title" v-for="day, index in dayEnTitle" :key="`day-${index}`">
        {{day}}
      </div>
    </div>

    <div class="hint-dot-container" v-show="!onlyDayWeekTitle">
      <div class="hint-dot-spacer"></div>
      <div class="week-hint-container">
        <div v-for="dot in 7" :key="dot">
          <strong class="hint-dot ">·</strong>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script>
import { getDays, subDate, addDate } from "@/assets/utils.js";
// import axios from 'axios'

export default {
  name: "Headbar",
  props:['onlyDayWeekTitle'],
  data() {
    return {
      dayEnTitle: ["M", "T", "W", "T", "F", "S", "S"],
      days: [],
      page: 1,
    };
  },

  computed: {
    viewMode() {
      return this.$store.state.viewMode;
    },
    today() {
      return this.$store.getters.todayInfo;
    },
    weekPage() {
      return this.$store.state.weekPage;
    },
    current() {
      return this.$store.state.current;
    },
    curDate(){
      const year = this.current.getFullYear()
      const month = this.current.getMonth()
      const date = this.current.getDate()
      return `${year} / ${month + 1} / ${date}`
    }
  },

  watch: {
    current() {
      this.daysPageInit()
      this.updateSelected()
      this.showDot()
    },
  },

  methods: {
    pad(index) {
      const date = this.days[this.weekPage][index];
      return date < 10 ? `0${date}` : date;
    },

    hideDots(){
      const dots = document.getElementsByClassName('hint-dot')
      dots.forEach(dot=>dot.style.color = 'transparent')
    },

    showDot(){
      if(this.today.year === this.current.getFullYear()){
        if(this.today.month === this.current.getMonth() + 1){
          this.$nextTick(()=>{
            const curWeek = this.days[this.weekPage]
            if(curWeek.includes(this.today.date)){
              const dots = document.getElementsByClassName('hint-dot')
              dots[this.today.day-1].style.color = '#45DFCD'
            }
            else{
              this.hideDots()
            }
          })
        }else{
          this.hideDots()
        }
      }else{
        this.hideDots()
      }
    },

    daysPageInit() {
      this.days = [];
      const year = this.current.getFullYear();
      const month = this.current.getMonth() + 1;
      // how many days in month
      const daysOfMonth = getDays(year, month);
      
      

      // day of month first date
      const startDay = new Date(year, month-1, 1).getDay();

      // startDay offset
      const offset = startDay - 1;


      // arrary all date in month
      const allDays = new Array(offset).fill(" ");
      for (let i = 1; i <= daysOfMonth; i++) {
        allDays.push(i);
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

    updateSelected(){
      for (let index in this.days) {
        if (this.days[index].includes(this.current.getDate())) {
          const page = index;
          const dateIndex = this.days[index].indexOf(
            this.current.getDate()
          );


          this.$nextTick(() => {
            const el = document.getElementsByClassName(
              "day-num-wrapper"
            );
            Array.from(el).forEach((el) =>
              el.classList.remove("selected")
            );
            el[dateIndex].classList.add("selected");

            this.$store.commit("CAHNGE_PAGE", parseInt(page));
          });
        }
      }
    },

    changeMode() {
      switch (this.viewMode) {
        case "day":
          this.$store.commit("CHANGE_VIEWMODE", "week")
          break
        case "week":
          this.$store.commit("CHANGE_VIEWMODE", "day")
          break
      }
    },

    lineLogin(){
      // let URL = 'https://access.line.me/oauth2/v2.1/authorize?'

      // URL += 'response_type=code'
      // URL += `&client_id=${id}`
      // URL += `&redirect_uri=${redirect}`
      // URL += `&state=123`
      // URL += `&scope=openid%20profile`
      // window.open(URL, '_blank')
    },


    // 點選日期
    selectDate(el, index) {
      document
        .getElementsByClassName("day-num-wrapper")
        .forEach((element) => {
          element.classList.remove("selected");
        });

      el.classList.add("selected");

      // update curdate
      const date = this.days[this.weekPage][index];
      const newCurrent = new Date(this.current.getFullYear(), this.current.getMonth(), date)
      this.$store.commit('UPDATE_CURRENT', newCurrent)
    },

    // 按鈕增加日期
    forwardDate(){
      this.$store.commit('UPDATE_CURRENT', addDate(this.current, 1))
    },

    // 按鈕減少日期
    backwardDate(){
      this.$store.commit('UPDATE_CURRENT', subDate(this.current, 1))
    },

    closeCalendar(){
      this.$emit('closeCalendar')
    }
  },

  mounted() {
    this.daysPageInit()
    this.updateSelected()
    this.showDot()
  },
};
</script>

<style scoped>
.headbar {
  @apply fixed top-0 right-0 left-0 flex flex-col;
  @apply shadow-xl pt-2.5 bg-white z-10;
}

.func-btn-container {
  @apply flex justify-between;
  @apply px-3;
}

.week-day-container {
  @apply flex w-full pt-4;
}

.calendar-day-week-title-container{
  @apply flex justify-between mx-auto;
}

.calendar-day-week-title{
  padding-left: 4.5vw;
  padding-right: 4.5vw;
  @apply text-xl pt-2;
}

.change-btn {
  background-color: #dedaf4;
  color: #7F75B1;
  @apply cursor-pointer rounded-full p-2 px-3 text-sm leading-4;
}

.page-title{
  @apply px-3 text-sm;
}

.cur-date {
  flex: 2;
}

.view {
  @apply mr-3;
}

.current-date-container{
  @apply flex items-center;
}

.select-date-btn{
  /* width: 18vw; */
  position: relative;
  @apply flex justify-center items-center w-10 ml-3 mr-1;
}
.select-date-btn::after{
  content: '';
  background-color: #DEDAF3;
  @apply rounded-full absolute top-0 bottom-0 left-0 right-0 left-0 mx-auto opacity-50;
}

.select-date-btn > img{
  filter: invert(30%);
  -webkit-filter: invert(30%); /* Safari/Chrome */
}

.day-btn-container {
  @apply flex justify-around w-full;
}

.day-btn {
  @apply flex justify-center items-center;
  @apply flex-col text-gray-700 text-sm px-1 text-center;
}

.day-num-wrapper {
  @apply pt-0.5 pb-0.5 px-2.5 leading-4;
}

.hint-dot-container {
  @apply flex ;
}

.hint-dot-spacer{
  width: 18vw;
}

.hint-dot{
  @apply text-2xl leading-3 align-top text-transparent;
}

.week-hint-container{
  @apply flex justify-around w-full;
}

.close-btn{
  max-width: 30px;
}

.selected {
  background-color: #7f74b4;
  @apply rounded-md text-white;
}


@media screen and (min-width: 1200px) {
  .func-btn-container {
    margin-bottom: 3vh;
    @apply flex justify-between;
    @apply px-14 pt-3;
  }

  .day-num-wrapper {
    @apply pt-0.5 pb-0.5 px-2.5 leading-6 text-xl;
  }

  .select-date-btn{
    @apply flex justify-center items-center w-14 ;
  }

  .page-title{
    @apply text-xl;
  }

  .change-btn{
    @apply text-xl;
  }

  .hint-dot-spacer{
    width: 16.5vw;
  }
}
</style>
