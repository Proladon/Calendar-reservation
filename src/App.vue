<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default{
  name: 'App',
}
</script>

<style>
html, body, #app{
  @apply w-full h-full;
}
router-view{
  @apply w-full h-full  overflow-y-scroll;
}
</style>
