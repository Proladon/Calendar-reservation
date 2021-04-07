<template>
  <div calss="virtual-scroll">
    <DynamicScroller class="dynamic-scroller "
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

export default {
  name: 'VirtualScroll',
  components:{Calendar},
  data(){
    return{
        item: []
    }
  },
  methods:{
      closeView(){
          this.$emit('close')
      },
      newDate(){
        this.$emit('newDate')
      }
  },
  mounted(){
    let id = 0
    for(let year=2021; year<2050; year++){
      for(let month=1; month<=12; month++){
        id++
        this.item.push({year,month, id:id})
      }
    }
  }
}
</script>

<style scoped>
.virtual-scroll{
  @apply h-full pt-40 pb-1;
}

.dynamic-scroller{
  background-color: #FAFAFA;
  @apply h-full pt-28 ;
}

</style>
