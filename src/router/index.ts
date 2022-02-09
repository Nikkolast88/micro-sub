import { App } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw, Router } from 'vue-router';
import { createRouterGuards } from './RouterGuards';

const __qiankun__ = window.__POWERED_BY_QIANKUN__;
const modules = require.context('./modules', true, /\.ts$/);

const routeModules: RouteRecordRaw[] = [];

modules.keys().forEach((key: string) => {
  const mod = modules(key).default || {};
  const modList = Array.isArray(mod) ? [...mod] : [mod];
  routeModules.push(...modList);
});

export function setupRouter(
  app: App,
  routes?: Array<RouteRecordRaw>,
  routeBase?: string,
): Router {
  const constantRouter: Array<RouteRecordRaw> = [
    {
      path: '/',
      name: 'Index',
      component: () => import('@/views/System/SystemView.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/views/Exception/NotFound.vue'),
    },
  ];
  const router = createRouter({
    history: createWebHistory(__qiankun__ ? routeBase : '/'),
    routes: __qiankun__ ? constantRouter || [] : constantRouter,
  });
  app.use(router);
  /**
   * @description: 路由守卫
   * @param {*}
   * @return {*}
   */
  createRouterGuards(router);
  return router;
}

// export default router;
