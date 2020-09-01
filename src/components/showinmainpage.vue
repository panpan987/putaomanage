<template>
  <div>
    <h3>首页展示的candy</h3>
    <div style="margin: 60px;"></div>

    <el-form :model="showinmainpage" :label-position="labelPosition" :rules="rules" ref="showinmainpage"
             label-width="120px">

      <!--标题-->
      <el-form-item label="tabbar" prop="tabbar">

        <el-cascader
          style="width: 360px"
          v-model="showinmainpage.tabbar"
          :options="options"
          @change="handleChange">
        </el-cascader>

      </el-form-item>

      <!--candyid-->
      <el-form-item label="candyIds(最多6个以 , 隔开)" prop="candyIds">
        <el-input type="textarea" :rows="8" v-model="showinmainpage.candyIds"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('showinmainpage')">提交</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>

  export default {
    name: "showinmainpage",
    data() {
      return {
        //格式布局相关***
        labelPosition: 'right',
        showinmainpage: {
          tabbar: [],
          candyIds: ''
        },
        rules: {
          tabbar: [
            {required: true, message: '请输入tabbar', trigger: 'blur'}
          ],
          candyIds: [
            {required: true, message: '请输入candyIds', trigger: 'blur'}
          ]
        },
        options: [{
          value: '经典单机',
          label: '经典单机',
          children: [{
            value: 'singlegame',
            label: 'singlegame',
            children: [{
              value: '/candydetail',
              label: '/candydetail'
            }]
          }]
        },
          {
            value: '上古番剧',
            label: '上古番剧',
            children: [{
              value: 'cartoon',
              label: 'cartoon',
              children: [{
                value: '/candydetail',
                label: '/candydetail'
              }]
            }]
          },
          {
            value: '泡面视频',
            label: '泡面视频',
            children: [{
              value: 'minivideo',
              label: 'minivideo',
              children: [{
                value: '/myvideoplayer',
                label: '/myvideoplayer'
              }]
            }]
          }]
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {

            this.showinmainpage.tabbar = this.showinmainpage.tabbar.join(",")
            this.$axios.post(`item/showinmainpage/insert`, this.showinmainpage).then(res => {
              if (res.data) {
                alert("添加成功");
                //this.mainpage = null;
              } else {
                alert("添加失败")
              }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      handleChange(value) {
        console.log(value);
      }
    }

  }
</script>

<style scoped>

</style>