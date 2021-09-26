import { App, createApp } from 'vue';
import { setupStore } from '@/store';
import { setupRouter } from '@/router';
import { setupI18n } from '@/plugins';
interface Props {
  routes?: RouteRecordRaw[];
  routerBase?: string;
  container?: Element | null;
}
interface Func {
  bootstrap: (props: Props) => unknown;
  mount: (props: Props) => unknown;
  unmount: () => void;
  update: (props: Props) => unknown;
}
// import { createRouter, createWebHistory } from 'vue-router';
import Root from '@/App.vue';
import { RouteRecordRaw } from 'vue-router';
// import store from '@/store';
// import selfRoutes from '@/router/routes';

/**
 * @name 导入自定义路由匹配方法
 */
// import routeMatch from '@/router/routes-match';
/**
 * @name 导入官方通信方法
 */
// import appStore from '@/utils/app-store';

// const __qiankun__ = window.__POWERED_BY_QIANKUN__;
let router = null;
let instance: App<Element> | null = null;

/**
 * @name 导出生命周期函数
 */
const lifeCycle = (): Func => {
  return {
    /**
     * @name 微应用初始化
     * @param {Object} props 主应用下发的props
     * @description  bootstrap 只会在微应用初始化的时候调用一次，下次微应用重新进入时会直接调用 mount 钩子，不会再重复触发
     * @description 通常我们可以在这里做一些全局变量的初始化，比如不会在 unmount 阶段被销毁的应用级别的缓存等
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async bootstrap(props: unknown) {
      /* props.emits.forEach(i => {
        Vue.prototype[`$${i.name}`] = i;
      }); */
    },
    /**
     * @name 实例化微应用
     * @param {Object} props 主应用下发的props
     * @description 应用每次进入都会调用 mount 方法，通常我们在这里触发应用的渲染方法
     */
    async mount(props: Props) {
      // 注册应用间通信
      // appStore(props);
      // 注册微应用实例化函数
      render(props);
    },
    /**
     * @name 微应用卸载/切出
     */
    async unmount() {
      if (instance) {
        instance.unmount();
      }
      instance = null;
      router = null;
    },
    /**
     * @name 手动加载微应用触发的生命周期
     * @param {Object} props 主应用下发的props
     * @description 可选生命周期钩子，仅使用 loadMicroApp 方式手动加载微应用时生效
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async update(props: unknown) {
      // props
    },
  };
};

/**
 * @name 子应用实例化函数
 * @param {Object} props param0 qiankun将用户添加信息和自带信息整合，通过props传给子应用
 * @description {Array} routes 主应用请求获取注册表后，从服务端拿到路由数据
 * @description {String} 子应用路由前缀 主应用请求获取注册表后，从服务端拿到路由数据
 */
const render = async (props: Props): Promise<void> => {
  const { routes, routerBase, container } = props;
  // Vue.config.productionTip = false;
  instance = createApp(Root);

  setupStore(instance);
  setupI18n(instance);
  router = setupRouter(instance, routes, routerBase);

  await router.isReady();

  const _container = container ? container.querySelector('#app') : '#app';
  instance.mount(_container as Element | string);
};
export { lifeCycle, render };
