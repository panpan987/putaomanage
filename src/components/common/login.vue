<template>
  <div class="login-wrap">
    <!--校验的表单-->
    <el-form :model="ruleForm"
             label-position="right"
             :rules="rules"
             status-icon ref="ruleForm"
             label-width="100px"
             class="login-form">
      <h2 style="text-align: center">管理员登录</h2>
      <el-form-item  label="用户名:" prop="username">
        <el-input @keyup.enter.native="submitForm('ruleForm')"
          maxlength="15" placeholder="请输入用户名"
                  v-model="ruleForm.username"></el-input>
      </el-form-item>

      <el-form-item label="密码:" prop="pass">
        <el-input @keyup.enter.native="submitForm('ruleForm')"
          maxlength="16" placeholder="请输入密码"
                  type="password" v-model="ruleForm.pass"
                  autocomplete="off"></el-input>
      </el-form-item>


      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  const qs = require('qs')

  export default {
    name: "login",
    data() {
      var validateUsername = (rule, value, callback) => {
        if (value === '') {
          return callback(new Error('请输入用户名'));
        } else {
          this.$refs.ruleForm.validateField('pass');
        }
        callback();
      };

      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        }
        callback();
      };


      return {
        //用户名是否存在
        //flag: false,
        ruleForm: {
          username: '',
          pass: '',
        },
        rules: {
          username: [
            {validator: validateUsername, trigger: 'blur'},
            {pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+$/, message: '不允许输入空格等特殊符号'}
          ],
          pass: [
            {validator: validatePass, trigger: 'blur'}
          ]
        }
      };
    },
    methods: {
      //获取用户信息,调用的vuex方法,实现响应式
      verify() {
        this.$store.dispatch('verify');
      },
      submitForm(formName) {

        this.$refs[formName].validate((valid) => {
          if (valid) {
            if(this.ruleForm.username !== 'admin') {
              this.$message.error('用户名或密码错误');  //登录失败
              return;
            }

            //向后台验证用户名和密码是否匹配
            this.$axios.post('user/checkLogin', {username: this.ruleForm.username, password: this.ruleForm.pass})
              .then(res => {
                if (res.data) {
                  //登录成功
                  this.$message.success('登录成功,欢迎'+ this.ruleForm.username);
                  //生成token存入cookie
                  this.$axios.post(`auth/accredit`, qs.stringify({
                    username: this.ruleForm.username,
                    password: this.ruleForm.pass
                  }))
                    //把用户id和name存入vuex中
                    .then(res => {
                      this.$store.dispatch('verify')
                    });
                  this.$parent.changeShowRouterView();
                  this.$parent.changeShowLogin();

                  // this.$router.push('/userinfo');
                  this.ruleForm.username = '';
                  this.ruleForm.pass = '';
                } else {
                  this.$message.error('用户名或密码错误');  //登录失败
                }
              })
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
    }
  }
</script>

<style scoped>
  .login-wrap{
    height: 100%;
    background-color: #324152;
    display: flex;
    /*水平居中*/
    justify-content: center;
    /*垂直居中*/
    align-items: center;
  }
  .login-wrap .login-form {
    width: 500px;
    background-color: #fff;
    border-radius: 5px;
    padding: 25px;
  }
</style>