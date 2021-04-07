<template>
  <div class="dialog">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "Dialog",
}
</script>

<style scoped>
.dialog {
  width: 100%;
  height: 100%;
}
</style>
