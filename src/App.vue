<template>
  <div id="app">
    
    <Headbar @calendar="openCalendar = !openCalendar" />

    <VirtualScroll v-if="openCalendar" />

    <DateTable />

    <div class="footer">
      <div class="reservation-btn pointer-events-auto" @click="reservation">+ 新增預約</div>
    </div>

  </div>
</template>

<script>
import Headbar from './components/Headbar.vue'
import DateTable from './components/DateTable.vue'
import VirtualScroll from './components/VirtualScroll.vue'


export default {
  name: 'App',
  
  components:{
    Headbar,
    DateTable,
    VirtualScroll,
  },

  data(){
    return{
      openCalendar: false,
    }
  },

  methods:{
    reservation(){
      this.$store.commit('ADD_RESERVATIONS')
    },
  },
  

}
</script>

<style>
html, body, #app{
  width: 100%;
  height: 100%;
}

.footer{
  @apply flex justify-center absolute bottom-0;
  @apply w-full bg-gradient-to-t from-white to-transparent pointer-events-none;
}

.reservation-btn{
  background-color: #7F74B4;
  @apply mb-3 pt-2 pb-2 px-4 w-1/3;
  @apply cursor-pointer rounded-md text-center text-white text-sm shadow-lg;
}
</style>
