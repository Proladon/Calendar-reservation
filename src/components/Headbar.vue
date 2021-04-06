<template>
  <div class="headbar">
    <div class="func-btn-container">
      <!-- <p>預約行事曆</p> -->
      <div class="current-date-container">
        <span v-show="viewMode === 'day'" @click="backwardDate"><img class="transform rotate-180 w-5" src="@/assets/arrow.svg" alt="" srcset=""></span>
        <p class="pl-1">{{viewMode === 'day' ? curDate : '預約行事曆'}}</p>
        <span v-show="viewMode === 'day'" @click="forwardDate"><img class="w-5" src="@/assets/arrow.svg" alt="" srcset=""></span>
      </div>

      <div class="cur-date"></div>
      <div class="view change-btn" @click="changeMode">
        {{ viewMode === "day" ? "日檢視" : "周檢視" }} ▼
      </div>
      <div class="user change-btn" @click="lineLogin">P ▼</div>
    </div>

    <div class="week-day-container">
      <div class="select-date-btn" @click="$emit('calendar')">💎</div>

      <div class="day-btn-container" v-if="days.length > 0">
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

    <div class="hint-dot-container">
      <div style="width: 18vw;"></div>
      <div class="week-hint-container">
        <div class="w-15 px-2.5" v-for="dot in 7" :key="dot">
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
      // axios.post('https://access.line.me/dialog/oauth/weblogin', {
      //   response_type: 'code',
      //   client_id: '1655833094',
      //   redirect_uri: 'https://proladon.github.io/Calendar-reservation/customer/auth/line/callback',
      //   state: '',
      //   scope: 'openid%20profile'
      // }).then(res=>{
      //   console.log(res)
      // })
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
  @apply shadow-xl h-1/6  pt-2.5 bg-white z-10;
}

.func-btn-container {
  margin-bottom: 2.5vh;
  @apply flex justify-between;
  @apply px-3;
}

.week-day-container {
  @apply flex w-full;
}

.change-btn {
  background-color: #dedaf4;
  @apply cursor-pointer rounded-full p-2 px-3 text-sm leading-4;
}

.cur-date {
  flex: 2;
}

.view {
  @apply mr-3;
}

.current-date-container{
  @apply flex;
}

.select-date-btn{
  width: 18vw;
  @apply flex justify-center items-center ;
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

.hint-dot{
  @apply text-2xl leading-3 align-top text-transparent;
}

.week-hint-container{
  @apply flex justify-around w-full;
}

.selected {
  background-color: #7f74b4;
  @apply rounded-md text-white;
}

@media screen and (min-width: 1200px) {
  
}
</style>
