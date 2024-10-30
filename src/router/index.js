import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/views/Layout/index.vue'
import Home from '@/views/Home/index.vue'
import Category from '@/views/Category/index.vue'
import Login from '@/views/Login/index.vue'
import Welcome from '@/views/Login/welcome.vue'
import Member from '@/views/Member/index.vue'
import UserInfo from "@/views/Member/components/userInfo.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '',
          component: Home
        },
        {
          path: 'category',
          component: Category
        },
        {
          path:'member',
          component: Member,
          children:[
            {
              path:'',
              component:UserInfo
            }
          ]
        }
      ]
    },
    {
      path: '/login',
      component: Login,
    },
    {
      path:'/welcome' ,
      component:Welcome
    }
  ]
})

export default router
