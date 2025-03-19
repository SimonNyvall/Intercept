import Aurelia from 'aurelia';
import { App } from './app';

self.MonacoEnvironment = {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getWorkerUrl: function (moduleId, label) {
       return null;
    }
};

Aurelia
  .app(App)
  .start();
