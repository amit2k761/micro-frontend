//import 'zone.js';
import * as singleSpa from 'single-spa';
import { GlobalEventDistributor } from './globalEventDistributor';
import { loadApp } from './helper';
//import * as sys from 'systemjs';

async function init() {
  const globalEventDistributor = new GlobalEventDistributor();
  const loadingPromises = [];

  loadingPromises.push(
    loadApp(
      'navbar',
      '',
      () => import('../../apps/navbar/dist/navbar/main'),
      '/navbar/store.js',
      globalEventDistributor
    )
  );

  loadingPromises.push(
    loadApp(
      'app1',
      'app1',
      () => import('../../apps/app1/dist/app1/main'),
      '/app1/store.js',
      globalEventDistributor
    )
  );

  loadingPromises.push(
    loadApp(
      'app2',
      'app2',
      () => import('../../apps/app2/dist/app2/main'),
      '/app2/store.js',
      globalEventDistributor
    )
  );

  // singleSpa.registerApplication(
  //   'app2',
  //   function() {
  //     return import('../../apps/app2/dist/app2/main');
  //   },
  //   function(location) {
  //     return location.pathname.startsWith('/app2');
  //   }
  // );
  await Promise.all(loadingPromises);

  singleSpa.start();
}

init();
