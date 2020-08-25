<template>
  <div>
    <h3>单机游戏管理</h3>
    <div style="margin: 60px;"></div>

    <el-form :model="singlegame" :label-position="labelPosition" :rules="rules" ref="singlegame" label-width="120px">

      <el-form-item label="title" prop="title">
        <el-input type="textarea" :rows="4" v-model="singlegame.title">
        </el-input>
      </el-form-item>

      <el-form-item label="content" prop="content">
        <el-input type="textarea" :rows="8" v-model="singlegame.content">
        </el-input>
      </el-form-item>

      <el-form-item label="preImage" prop="preImage">
        <el-input v-model="singlegame.preImage"></el-input>
        <!--单张图片上传-->
        <imguploadformany @writeURLList="writeURL" @deleteURLByPath="deleteURL"></imguploadformany>
      </el-form-item>

      <el-form-item label="images" prop="images">
        <el-input type="textarea" :rows="8" v-model="singlegame.images"></el-input>
        <!--多张图片上传-->
        <imguploadformany @writeURLList="writeURLList" @deleteURLByPath="deleteURLByPath"></imguploadformany>
      </el-form-item>

      <el-form-item label="resourceUrl" prop="resourceUrl">
        <el-input v-model="singlegame.resourceUrl"></el-input>
      </el-form-item>

      <el-form-item label="resourceCode" prop="resourceCode">
        <el-input v-model="singlegame.resourceCode"></el-input>
      </el-form-item>

      <el-form-item label="upName" prop="upName">
        <el-input v-model="singlegame.upName"></el-input>
      </el-form-item>

      <el-form-item label="upAvatar" prop="upAvatar">
        <el-input v-model="singlegame.upAvatar"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('singlegame')">提交</el-button>

      </el-form-item>

    </el-form>
  </div>
</template>

<script>
  import imguploadformany from "./common/imguploadformany"
  export default {
    name: "singlegame",
    components: {
      imguploadformany
    },
    data() {
      return {
        //格式布局相关***
        labelPosition: 'right',
        singlegame: {
          title: '',
          content: '',
          preImage: '',
          images: '',
          resourceUrl: '',
          resourceCode: '',
          upName: '',
          upAvatar: ''
        },
        rules: {
          title: [
            {required: true, message: '请输入标题', trigger: 'blur'}
          ],
          content: [
            {required: true, message: '请输入详情', trigger: 'blur'}
          ],
          preImage: [
            {required: true, message: '请输入封面图片', trigger: 'blur'}
          ],
          images: [
            {required: true, message: '请输入详情图片组', trigger: 'blur'}
          ],
          resourceUrl: [
            {required: true, message: '请输入资源链接', trigger: 'blur'}
          ],
          resourceCode: [
            {required: true, message: '请输入提取码', trigger: 'blur'},
            {max: 4,min:4, message: '长度为4', trigger: 'blur' }
          ],
          upName: [
            {required: true, message: '请输入上传者姓名', trigger: 'blur'},
            {max: 10, message: '长度最大为10', trigger: 'blur' }
          ],
          upAvatar: [
            {required: true, message: '请输入上传者头像', trigger: 'blur'}
          ]

        }
      };
    },
    methods: {
      //单图片回写
      writeURL(res) {
        this.singlegame.preImage = res;
      },
      //单图片删除
      deleteURL() {
        this.singlegame.preImage = "";
      },
      //多图片回写
      writeURLList(res) {
        this.singlegame.images +=  ', ' + res;
      },
      //多图片删除
      deleteURLByPath(path) {
        this.singlegame.images = this.singlegame.images.replace(path, "");
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            //对", "进行删除
            this.singlegame.images = this.singlegame.images.substr(2);
            console.log(this.singlegame.images);
            this.$axios.post(`item/singlegame/insert`, this.singlegame).then(res => {
              if (res.data) {
                alert("添加成功");
                //this.singlegame = null;
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