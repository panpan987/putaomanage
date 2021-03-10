<template>
  <div id="app">
    <login v-if="showLogin"></login>
    <router-view v-if="showRouterView"/>
  </div>
</template>

<script>
import home from './views/home'
import login from '@/components/common/login'

  export default {
    name: "app",
    components: {
      home,
      login
    },
    data() {
      return {
        showRouterView:false,
        showLogin:true
      }
    },
    methods: {
      changeShowRouterView() {
        this.showRouterView = true;
      },
      changeShowLogin() {
        this.showLogin = false;
      },

    },
    created() {
      this.$axios.get(`auth/verify`).then(res => {
        if(res.data.username === 'admin') {
          this.changeShowRouterView();
          this.changeShowLogin()
        }
      })

    }
  }

</script>

<style>
  #app {
    height: 100%;
  }
  .el-container {
    height: 100%;
  }
  .el-main {
    padding: 0px;
    height: 100%;
  }

</style>
