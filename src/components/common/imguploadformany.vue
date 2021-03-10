<template>
  <div>
    <el-upload
      :action="url"
      :limit="10"
      list-type="picture-card"
      :auto-upload="true"
      :on-preview="handlePictureCardPreview"
      :before-upload="beforeUpload"
      :on-success="handleSuccess"
      :before-remove="handleBeforeRemove"
      :on-remove="handleRemove">
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "imguploadformany",
    data() {
      return {
        //图片上传的地址
        url: 'http://api.putao6379.top/api/upload/image',
        dialogImageUrl: '',
        dialogVisible: false
      };
    },
    methods: {
      //处理文件上传最大数
      handleExceed() {
        this.$message.warning(`当前限制选择 10 个文件`);
      },
      //判断文件类型和大小
      beforeUpload(file) {
        const isIMG = file.type === 'image/jpeg' || file.type === 'image/png';
        const isLt1M = file.size / 1024 / 1024 < 1;

        if (!isIMG) {
          this.$message.error('上传头像图片只能是 JPG或PNG 格式!');
        }
        if (!isLt1M) {
          this.$message.error('上传头像图片大小不能超过 1MB!');
        }
        return isIMG && isLt1M;
      },
      handleSuccess(res, file) {
        //图片上传成功回调
        this.$emit("writeURLList",res);

      },
      //删除之前的回调,若返回false什么也不做,返回true为直接删除
      handleBeforeRemove(file, fileList) {
        if (confirm("您确定要删除图片吗?")){
          //确定就把图片的服务器路径传给后台
          this.$axios.post(`delete`,{filePath: file.response.filePath}).then(res => {
            //并且把表单中的filePath字符串删了
            this.$emit("deleteURLByPath", ", " + file.response.filePath);

          });

          return true;
        }
        return false;
      },
      //删除对应图片,需要要执行该方法之前传递参数,否则信息会没有
      handleRemove(file, fileList) {
         // console.log(file, fileList);
         // console.log(file.response)

      },
      //放大镜预览图片
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },

    }
  }
</script>

<style scoped>

</style>