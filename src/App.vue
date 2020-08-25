<template>
  <div id="app">

    <router-view/>
  </div>
</template>

<script>
import home from './views/home'

  export default {
    name: "app",
    components: {
      home
    }

  }
</script>

<style>

</style>
