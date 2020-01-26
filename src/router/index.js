import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Profile from '../views/Profile.vue'
import Group from '../views/Group.vue'
import About from '../views/About.vue'
import Users from '../views/Users.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/login',
    name: 'login',
    meta: { layout: 'empty' },
    component: Login,
  },
  {
    path: '/profile',
    name: 'profile',
		component: Profile,
  },
	{
    path: '/group/:groupId',
    name: 'group',
		component: Group,
  },
  {
    path: '/users/',
    name: 'users',
		component: Users,
  },
	{
    path: '/about/',
    name: 'about',
		meta: { layout: 'empty' },
		component: About,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
