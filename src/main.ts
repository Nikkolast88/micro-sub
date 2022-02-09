import './public-path';

import { lifeCycle } from '@/plugins';
import { SingleApp } from './plugins/modules/SingleApp';

const __qiankun__ = window.__POWERED_BY_QIANKUN__;

if (__qiankun__) {
  lifeCycle();
} else {
  SingleApp();
}
