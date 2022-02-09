// setup 注册对应插件
import { createApp } from 'vue';
import type { App } from 'vue';
import type { RouteRecordRaw } from 'vue-router';
import Root from '@/App.vue';
import { setupStore } from '@/store';
import { setupI18n } from '..';
import { setupRouter } from '@/router';
interface Props {
  routes?: RouteRecordRaw[];
  routerBase?: string;
  container?: Element | null;
}

let instance: App<Element> | null = null;
let router = null;
export const setupRender = async (props: Props): Promise<void> => {
  const { routes, routerBase, container } = props;
  instance = createApp(Root);

  // pinia 状态注册
  setupStore(instance);
  // 国际化注册
  setupI18n(instance);

  // 路由注册
  router = setupRouter(instance, routes, routerBase);
  await router.isReady();

  const _container = container ? container.querySelector('#app') : '#app';
  instance.mount(_container as Element | string);
};

export const resetRender = (): void => {
  if (instance) {
    instance.unmount();
  }
  instance = null;
  router = null;
};
