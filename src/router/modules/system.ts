import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/system',
    component: () => import('@/views/System/SystemView.vue'),
  },
];

export default routes;
