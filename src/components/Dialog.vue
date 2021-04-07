<template>
  <div class="dialog">
    <p class="text-white text-xl mb-5">確認預約</p>
    <div class="input-container">
      <input type="text" v-model="info.service" placeholder="預約服務名稱" />
      <input type="text" v-model="info.name" placeholder="預約設計師" />
    </div>

    <div class="btn-container">
      <div class="btn confirm" @click="confirm">確定預約</div>
      <div class="btn cancel" @click="closeDialog">取消預約</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Dialog",
  computed: {
    dayTempSelected() {
      return this.$store.state.dayTempSelected;
    },
  },
  data() {
    return {
      info:{
        service: "",
        name: "",
      }
    }
  },
  methods:{
    confirm(){
      const res = this.dayTempSelected
      res.info = this.info
      this.$store.commit('ADD_RESERVATIONS', JSON.parse(JSON.stringify(res)))
      this.$store.commit('CLEAR_DAYTEMPSELECTED')
      this.$emit('closeDialog')
    },
    closeDialog(){
      this.$emit('closeDialog')
    }
  }
};
</script>

<style scoped>
.dialog {
  @apply fixed top-0 bottom-0 right-0 left-0 z-20;
  @apply flex flex-col items-center justify-center bg-gray-700 bg-opacity-80 w-full h-full;
}

.input-container {
  @apply flex flex-col items-center justify-center mx-auto w-full;
}

input {
  @apply border border-gray-600 rounded-md px-5 mb-5 h-10;
}


.btn-container{
  @apply flex;
}

.btn{
  @apply mb-3 pt-2 pb-2 px-4 w-full mx-2 rounded-md;
}

.confirm{
  @apply bg-green-300 hover:text-white cursor-pointer;
}

.cancel{
  @apply bg-gray-300 hover:text-white cursor-pointer;
}
</style>
