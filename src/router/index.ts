import { App } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw, Router } from 'vue-router';
// import { createRouterGuards } from './RouterGuards';

const __qiankun__ = window.__POWERED_BY_QIANKUN__;
const modules = require.context('./modules', true, /\.ts$/);

const routeModules: RouteRecordRaw[] = [];

modules.keys().forEach((key: string) => {
  const mod = modules(key).default || {};
  const modList = Array.isArray(mod) ? [...mod] : [mod];
  routeModules.push(...modList);
});
console.log('routeModules', routeModules);
export function setupRouter(
  app: App,
  routes?: Array<RouteRecordRaw>,
  routeBase?: string,
): Router {
  const constantRouter: Array<RouteRecordRaw> = [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/views/Exception/NotFound.vue'),
    },
  ];
  const router = createRouter({
    history: createWebHistory(__qiankun__ ? routeBase : '/'),
    routes: __qiankun__
      ? constantRouter || []
      : [...constantRouter, ...routeModules],
  });
  app.use(router);
  /**
   * @description: 路由守卫
   * @param {*}
   * @return {*}
   */
  // createRouterGuards(router);
  console.log(router);
  return router;
}

// export default router;
