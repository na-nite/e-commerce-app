import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },

  {
    path: '/annonces',
    name: 'Annonces',
    component: () => import('../views/Annonces.vue' )  },
    {
      path: '/condidats',
      name: 'Condidats',
      component: () => import('../views/Condidats.vue' )  },


  {
    path: '/recruiter',
    name: 'RecruiterSpace',
    component: () => import('../views/RecruiterSpace.vue' ),
    meta : {
      requireLogin : true 
    }
  },
  {
    path: '/log-in',
    name: 'LogIn',
    component: () => import('../views/LogIn.vue' )
  },
  {
    path: '/my-account',
    name: 'MyAccount',
    component: () => import('../views/MyAccount.vue' ),
    meta : {
      requireLogin : true 
    }
  },

  {
    path: '/sign-up',
    name: 'SignUp',
    component: () => import('../views/SignUp.vue' )
  },


]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireLogin) && !store.state.isAuthenticated) {
    next({ name: 'LogIn', query: { to: to.path } });
  } else {
    next()
  }
})

export default router
