import Vue from 'vue'
import VueRouter from 'vue-router'



const home = () => import("../views/home");
const singlegame = () => import("../components/singlegame")
const cartoon = () => import("../components/cartoon")
const studygarden = () => import("../components/studygarden")
const minivideo = () => import("../components/minivideo")
const carouser = () => import("../components/carouser")
const showinmainpage = () => import("../components/showinmainpage")
const login = () => import("@/components/common/login")

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    redirect: '/home'
  },
  {
    path: "/home",
    name: 'home',
    component: home,
    children: [
      {
        path: "/home/singlegame",
        name: 'singlegame',
        component: singlegame
      },
      {
        path: "/home/cartoon",
        name: 'cartoon',
        component: cartoon
      },
      {
        path: "/home/studygarden",
        name: 'studygarden',
        component: studygarden
      },
      {
        path: "/home/minivideo",
        name: 'minivideo',
        component: minivideo
      },
      {
        path: "/home/carouser",
        name: 'carouser',
        component: carouser
      },
      {
        path: "/home/showinmainpage",
        name: 'showinmainpage',
        component: showinmainpage
      },
      {
        path: "/login",
        name: 'login',
        component: login
      }
    ]
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
