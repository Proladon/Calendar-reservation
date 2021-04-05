<template>
  <div class="date-table">
    <Splide :options="splideOptions" @splide:dragged="changePage">
      <splide-slide>
        <!-- week view -->
        <table>
          <tbody class="day-mode" v-show="viewMode === 'week'">
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

        <!-- day view -->
        <table>
          <tbody class="week-mode" v-show="viewMode === 'day'">
            <tr v-for="hours in 24" :key="`${hours}h`">
              <td class="time-period">{{ hours }}:00</td>
              <td @click="daySelected(hours, $event.target)"></td>
            </tr>
          </tbody>
        </table>
      </splide-slide>

    </Splide>
  </div>
</template>

<script>
import { getDays } from "@/assets/utils.js";
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
      selected: [],
      days: 0,
      splideOptions: {
        arrows: false,
        pagination: false,
        focus: false,
        type: 'loop',
      },
    };
  },
  computed: {
    viewMode() {
      return this.$store.state.viewMode;
    },
    todayInfo() {
      return this.$store.getters.todayInfo;
    },
  },
  methods: {
    changePage(num){
      console.log(num)

    },
    weekSelected(hours, el) {
      const selected = this.selected;
      const week = Array.from(el.parentElement.children).indexOf(el);
      const isExist = selected.find((el) => el.id === `${week}-${hours}`);
      if (isExist) {
        el.style.background = "";
        selected.splice(selected.indexOf(isExist), 1);
      } else {
        el.style.background = "#E5E5E5";
        selected.push({
          id: `${week}-${hours}`,
          month: this.todayInfo.month,
          date: this.todayInfo.date,
          week: week,
          period: hours,
        });
      }
    },
    daySelected(hours, el) {
      const selected = this.selected;
      if (selected.includes(hours)) {
        selected.splice(selected.indexOf(hours), 1);
        el.style.background = "";
      } else {
        el.style.background = "#E5E5E5";
        selected.push(hours);
      }
    },
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
  @apply h-5/6 pb-12;
}

table,
tbody,
tr {
  display: table;
  width: 100%;
}

.day-mode {
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
