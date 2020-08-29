<template>
  <div>
    <h3>视频管理</h3>
    <div style="margin: 60px;"></div>

    <el-form :model="minivideo" :label-position="labelPosition" :rules="rules" ref="minivideo" label-width="120px">

      <el-form-item label="title" prop="title">
        <el-input type="textarea" :rows="4" v-model="minivideo.title">
        </el-input>
      </el-form-item>

      <el-form-item label="preImage" prop="preImage">
        <el-input v-model="minivideo.preImage"></el-input>
        <!--菜单展示图片上传-->
        <imguploadformany @writeURLList="writeURLForPreImage" @deleteURLByPath="deleteURLForPreImage"></imguploadformany>
      </el-form-item>

      <el-form-item label="poster" prop="poster">
        <el-input v-model="minivideo.poster"></el-input>
        <!--详情页图片上传-->
        <imguploadformany @writeURLList="writeURLForPoster" @deleteURLByPath="deleteURLForPoster"></imguploadformany>
      </el-form-item>

      <el-form-item label="src" prop="src">
        <el-input v-model="minivideo.src"></el-input>
      </el-form-item>

      <el-form-item label="upName" prop="upName">
        <el-input v-model="minivideo.upName"></el-input>
      </el-form-item>

      <el-form-item label="upAvatar" prop="upAvatar">
        <el-input v-model="minivideo.upAvatar"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('minivideo')">提交</el-button>
      </el-form-item>


    </el-form>
  </div>
</template>

<script>
  import imguploadformany from "./common/imguploadformany"

  export default {
    name: "minivideo",
    components: {
      imguploadformany
    },
    data() {
      return {
        //格式布局相关***
        labelPosition: 'right',
        minivideo: {
          title: '',
          preImage: '',
          poster: '',
          src: '',
          upName: '',
          upAvatar: ''
        },
        rules: {
          title: [
            {required: true, message: '请输入标题', trigger: 'blur'}
          ],
          preImage: [
            {required: true, message: '请输入封面图片', trigger: 'blur'}
          ],
          poster: [
            {required: true, message: '请输入详情页图片', trigger: 'blur'}
          ],
          src: [
            {required: true, message: '请输入视频链接', trigger: 'blur'}
          ],
          upName: [
            {required: true, message: '请输入上传者姓名', trigger: 'blur'},
            {max: 15, message: '长度最大为15', trigger: 'blur' }
          ],
          upAvatar: [
            {required: true, message: '请输入上传者头像', trigger: 'blur'}
          ]

        }
      };
    },
    methods: {
      //单图片回写
      writeURLForPreImage(res) {
        this.minivideo.preImage = res.filePath;
      },
      //单图片回写
      writeURLForPoster(res) {
        this.minivideo.poster = res.filePath;
      },
      //单图片删除
      deleteURLForPreImage() {
        this.minivideo.preImage = "";
      },

      deleteURLForPoster() {
        this.minivideo.poster = "";
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {

            this.$axios.post(`item/minivideo/insert`, this.minivideo).then(res => {
              if (res.data) {
                alert("添加成功");
                //this.minivideo = null;
              } else {
                alert("添加失败")
              }
          })} else {
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