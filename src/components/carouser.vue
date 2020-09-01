<template>
  <div>
    <h3>首页轮播图</h3>
    <div style="margin: 60px;"></div>

    <el-form :model="carouser" :label-position="labelPosition" :rules="rules" ref="carouser" label-width="120px">

      <!--标题-->
      <el-form-item label="tabbar" prop="tabbar">
        <el-select v-model="carouser.tabbar" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>

      <!--candyid-->
      <el-form-item label="candyId" prop="candyId">
        <el-input type="textarea" :rows="8" v-model="carouser.candyId"></el-input>
      </el-form-item>

        <!--首页轮播图片上传(一张一张上传)-->
      <el-form-item label="img" prop="img">
        <el-input type="textarea" :rows="8" v-model="carouser.img"></el-input>
        <imguploadformany @writeURLList="writeURL" @deleteURLByPath="deleteURL"></imguploadformany>
      </el-form-item>


      <el-form-item>
        <el-button type="primary" @click="submitForm('carouser')">提交</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
  import imguploadformany from "./common/imguploadformany"

  export default {
    name: "carouser",
    components: {
      imguploadformany
    },
    data() {
      return {
        //格式布局相关***
        labelPosition: 'right',
        carouser: {
          tabbar: '',
          candyId:'',
          img:''
        },
        rules: {
          tabbar: [
            {required: true, message: '请输入tabbar', trigger: 'blur'}
          ],
          candyId: [
            {required: true, message: '请输入candyId', trigger: 'blur'}
          ],
          img: [
            {required: true, message: '请输入首页展示的img', trigger: 'blur'}
          ]
        },
        value: '',
        options: [{
          value: 'singlegame'
        }, {
          value: 'cartoon'
        }, {
          value: 'minivideo'
        }]
      }
    },
    methods: {
      //单图片回写
      writeURL(res) {
        console.log(res)
        this.carouser.img = res.filePath;
      },
      //单图片删除
      deleteURL() {
        this.carouser.img = "";
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {

            this.$axios.post(`item/carouser/insert`, this.carouser).then(res => {
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
      }
    }
  }
</script>

<style scoped>

</style>