import { createRouter, createWebHistory } from 'vue-router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

import { appRoutes } from './routes';
import { REDIRECT_MAIN, NOT_FOUND_ROUTE } from './routes/base';
import createRouteGuard from './guard';

NProgress.configure({ showSpinner: true });

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: 'login',
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/index.vue'),
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: '/reg',
      name: 'reg',
      component: () => import('@/views/reg/index.vue'),
      meta: {
        requiresAuth: false,
      },
      children: [
        {
          path: '0',
          name: 'regStep0',
          component: () => import('@/views/reg/Step0.vue'),
          meta: {
            requiresAuth: false,
          },
        },
        {
          path: '1',
          name: 'regStep1',
          component: () => import('@/views/reg/Step1.vue'),
          meta: {
            requiresAuth: false,
          },
        },
        {
          path: '2',
          name: 'regStep2',
          component: () => import('@/views/reg/Step2.vue'),
          meta: {
            requiresAuth: false,
          },
        },
      ],
    },
    ...appRoutes,
    REDIRECT_MAIN,
    NOT_FOUND_ROUTE,
  ],
  scrollBehavior() {
    return { top: 0 };
  },
});

createRouteGuard(router);

export default router;
