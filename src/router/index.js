import { createRouter, createWebHistory } from "vue-router";

import { routes } from "./routes";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

import { beforeEachHandler } from "./beforeEachHandler";
router.beforeEach(beforeEachHandler);

export default router;
