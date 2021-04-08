<template>
  <div calss="virtual-scroll">
    <DynamicScroller class="dynamic-scroller "
      :min-item-size="size"
      
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
        item: [],
        size: 320
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
    
    // 生成日曆範圍
    let id = 0
    for(let year=2021; year<2050; year++){
      for(let month=1; month<=12; month++){
        id++
        this.item.push({year,month, id:id})
      }
    }

    if(window.innerWidth > 500){
      this.size = window.innerWidth - 0.5*window.innerWidth
    }else{
      this.size = window.innerWidth - 0.2*window.innerWidth
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
