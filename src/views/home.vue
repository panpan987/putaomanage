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
          <router-link to="/home/carouser">首页轮播图</router-link>
        </el-menu-item>

        <el-menu-item index="2">
          <router-link to="/home/showinmainpage">首页展示的candy</router-link>
        </el-menu-item>

        <el-menu-item index="3">
          <router-link to="/home/singlegame">单机游戏</router-link>
        </el-menu-item>

        <el-menu-item index="4">
          <router-link to="/home/cartoon">经典番剧</router-link>
        </el-menu-item>

        <el-menu-item index="5">
          <router-link to="/home/studygarden">学习园地</router-link>
        </el-menu-item>

        <el-menu-item index="6">
          <router-link to="/home/minivideo">泡面视频</router-link>
        </el-menu-item>

        <el-menu-item index="7">
          用户管理
        </el-menu-item>
        <el-button style="margin-left: 20px;font-size: large" type="text" @click="exit">用户退出</el-button>

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
      },
      exit() {
        this.$confirm('确定要退出吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.dispatch('exit');
          this.$store.commit('clearInfo')
          this.$message({
            type: 'success',
            message: '退出成功!'
          });

          setTimeout(() => {
            this.reloadPage()
          },500);
          setTimeout(() => {
            this.reloadPage();
          },5000);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },
      reloadPage() {
        location.reload()
      }
    }
  }
</script>

<style scoped>
  .el-menu .el-menu-item {
    font-size: large;
  }
</style>