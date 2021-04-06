<template>
  <div calss="virtual-scroll">
    <DynamicScroller class="h-full"
      :min-item-size="320"
      :items="item"
      key-field="id"
      v-slot="{ item }"
      >
      <div class="d">
        <Calendar  @close="closeView" :year="item.year" :month="item.month" />
      </div>
    </DynamicScroller>
  </div>
</template>

<script>
import Calendar from '@/components/Calendar.vue'

const item = []
let id = 0
for(let year=2021; year<2050; year++){
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
  },
  methods:{
      closeView(){
          this.$emit('close')
      }
  }
}
</script>

<style scoped>
.virtual-scroll{
    @apply h-5/6 pb-1;
}

</style>
