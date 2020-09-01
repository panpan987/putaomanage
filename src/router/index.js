import Vue from 'vue'
import VueRouter from 'vue-router'



const home = () => import("../views/home");
const singlegame = () => import("../components/singlegame")
const cartoon = () => import("../components/cartoon")
const minivideo = () => import("../components/minivideo")
const carouser = () => import("../components/carouser")
const showinmainpage = () => import("../components/showinmainpage")

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
