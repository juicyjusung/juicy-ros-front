import Vue from 'vue';
import Router from 'vue-router';
import Main from '../views/Main.vue';
import Home from '../views/Home';
import PageNotFound from '@/views/notfound.vue';
import Login from '../views/Login.vue';
import Test from '@/views/Main';
import Ros from '@/views/RosPage';

import Store from '@/store';

Vue.use(Router);

const routes = [
  {
    path: '/',
    component: Home,
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: '/',
        component: Main,
      },
      {
        path: 'main',
        name: 'main',
        component: Main,
      },
      {
        path: 'test',
        name: 'test',
        component: Test,
      },
      {
        path: 'ros',
        name: 'ros',
        component: Ros,
      },
      // {
      //   path: 'about',
      //   name: 'about',
      //   // route level code-splitting
      //   // this generates a separate chunk (about.[hash].js) for this route
      //   // which is lazy-loaded when the route is visited.
      //   component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
      // },
      // {
      //   path: 'contact',
      //   name: 'contact',
      //   // route level code-splitting
      //   // this generates a separate chunk (about.[hash].js) for this route
      //   // which is lazy-loaded when the route is visited.
      //   component: () => import(/* webpackChunkName: "about" */ '@/views/Contact.vue'),
      //   meta: {
      //     requiresAuth: true
      //   }
      // }
    ],
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '*',
    name: 'PageNotFound',
    component: PageNotFound,
  },
];

const router = new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const isSessionActive = await Store.dispatch('authStore/initiateAppSession');
    // For some reason, local storage can send null as string 'null'
    if (!isSessionActive || localStorage.getItem('email') == null || localStorage.getItem('email') === 'null') {
      next({
        path: '/login',
      });
    } else {
      // const userPermissions = localStorage.getItem('permissions');
      // const userPermissions = perms ? localStorage.getItem('permissions').split(',') : [];

      const moveForward = to.matched.some(rec => {
        const keys = Object.keys(rec.meta);
        if (keys.length === 0) return true;

        // if (userPermissions && userPermissions.indexOf('SUPERADMIN') >= 0) return true;

        // const matches = keys.filter(key => userPermissions.indexOf(key) >= 0);
        // if (matches.length > 0) return true;

        return false;
      });

      if (moveForward) {
        next();
      } else {
        next('main');
      }
    }
  } else {
    next();
  }
});

export default router;
