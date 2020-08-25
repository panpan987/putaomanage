<template>
  <el-row class="tac">
    <el-col :span="4">
      <h1>葡萄管理界面</h1>
      <el-menu
        default-active="1"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">

        <el-menu-item index="1">
          首页管理
        </el-menu-item>

        <el-menu-item index="2">
          <router-link to="/home/singlegame">单机游戏</router-link>
        </el-menu-item>

        <el-menu-item index="3">
          <router-link to="/home/cartoon">经典番剧</router-link>
        </el-menu-item>

        <el-menu-item index="4">
          学习园地
        </el-menu-item>

        <el-menu-item index="5">
          泡面视频
        </el-menu-item>

        <el-menu-item index="6">
          用户
        </el-menu-item>

      </el-menu>
    </el-col>

    <el-col :span="18">
        <router-view></router-view>
    </el-col>

  </el-row>
</template>

<script>
  export default {
    name: "home",
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style scoped>
  .el-menu .el-menu-item {
    font-size: large;
  }
</style>