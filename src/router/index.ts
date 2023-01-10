import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/login/index.vue"),
    meta: {},
  },
  {
    path: "/reg",
    name: "Reg",
    component: () => import("@/views/reg/index.vue"),
    meta: {
      title: "route.reg.index",
      step: 0,
    },
    children: [
      {
        path: "flow/1",
        name: "RegStep1",
        component: () => import("@/views/reg/Step1.vue"),
        meta: {
          title: "route.reg.step1",
          step: 1,
        },
      },
    ],
  },
  {
    path: "/",
    name: "Layout",
    component: () => import("@/views/Layout.vue"),
    children: [
      {
        path: "",
        name: "Home",
        component: () => import("@/views/home/index.vue"),
        meta: {},
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
