<template>
  <div id="virtual-scroll">
    <DynamicScroller class="h-full"
      :min-item-size="250"
      :items="item"
      key-field="id"
      v-slot="{ item }"
      >
      <Calendar  @close="openCalendar = false" :year="item.year" :month="item.month" />
    </DynamicScroller>
  </div>
</template>

<script>
import Calendar from '@/components/Calendar.vue'

const item = []
let id = 0
for(let year=1970; year<2050; year++){
  for(let month=1; month<=12; month++){
    id++
    item.push({year,month, id:id})
  }
}

export default {
  name: 'VirtualScroll',
  components:{Calendar},
  data(){
    return{
        item
    }
  }



}
</script>

<style scoped>
#virtual-scroll{
    @apply h-5/6 pb-1;
}

</style>
