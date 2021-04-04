<template>
  <div id="app">
    <Headbar />
  </div>
</template>

<script>
import Headbar from './components/Headbar.vue'

export default {
  name: 'App',
  components: {
    Headbar
  }
}
</script>

<style>
html, body, #app{
  width: 100%;
  height: 100%;
}
</style>
