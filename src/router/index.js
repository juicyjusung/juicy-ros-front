import Vue from 'vue';
import Router from 'vue-router';
import Main from '../views/Main.vue';
import Home from '../views/Home';
import PageNotFound from '@/views/notfound.vue';
import Login from '../views/Login.vue';
import Test from '@/views/Test';

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
        component: Test,
      },
      {
        path: 'test',
        name: 'test',
        component: Test,
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

router.beforeEach((to, from, next) => {
  console.log(to);
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // For some reason, local storage can send null as string 'null'
    if (localStorage.getItem('email') == null || localStorage.getItem('email') === 'null') {
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
