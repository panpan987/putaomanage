import Vue from 'vue'
import VueRouter from 'vue-router'



const home = () => import("../views/home");
const singlegame = () => import("../components/singlegame")
const cartoon = () => import("../components/cartoon")

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    redirect: '/home'
  },
  {
    path: "/home",
    name: home,
    component: home,
    children: [
      {
        path: "/home/singlegame",
        name: singlegame,
        component: singlegame
      },
      {
        path: "/home/cartoon",
        name: cartoon,
        component: cartoon
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
