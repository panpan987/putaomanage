import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

axios.defaults.baseURL = "http://api.pilibili.cn/api";
axios.defaults.withCredentials = true;

//1.安装插件
Vue.use(Vuex)

//2.创建对象
const store = new Vuex.Store({
  //全局的属性,响应式的!!!
  state: {
    //用户id
    id: '',
    //用户名
    username: ''
  },
  //改变属性用mutations(同步方法) 调用下面的方法需要在组件中的方法中用
  //this.$store.commit('updateUsernameAndUserAvatar',[传递参数可选])
  mutations: {
    //初始化化用户信息
    updateUserInfo(state, res) {
      state.id = res.data.id;
      state.username = res.data.username;
    },
    clearInfo(state) {
      state.id = '';
      state.username = ''
    }
  },
  //发送异步请求,有默认参数context(可以理解为store)
  actions: {
    verify(context) {
      axios.get(`auth/verify`).then(res => {
        context.commit('updateUserInfo', res);
        if(res.data !== "您尚未登录"){
          axios.post(`user/findUserById/`+ context.state.id).then(res => {
            if (res.data !==null){
              context.state.avatar = res.data.avatar
            }
          })
        }
      })
    },
    //退出在cookie中设置不相关的或过期的token
    exit(context) {
      axios.delete(`auth/exit`)
    }
  }
})

//3.导出store对象
export default store