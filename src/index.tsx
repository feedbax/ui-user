import 'react-app-polyfill/stable';

import React from 'react';
import ReactDom from 'react-dom';

import detectIt from 'detect-it';
import { disablePageScroll } from 'scroll-lock';

import store from 'store';
import { setPointerType } from 'store/actions';
import { PointerType } from 'store/types';

import App from 'App';
import { rootElement } from 'lib/helper';
import * as serviceWorker from 'serviceWorker';

import 'assets/style.css';

if (detectIt.primaryInput === 'mouse') {
  store.dispatch(setPointerType(PointerType.MOUSE));
}

if (rootElement?.hasChildNodes()) {
  ReactDom.hydrate(<App />, rootElement);
} else {
  ReactDom.render(<App />, rootElement);
}

serviceWorker.register({
  onUpdate: (registration) => {
    const waitingServiceWorker = registration.waiting;

    if (waitingServiceWorker) {
      waitingServiceWorker.addEventListener('statechange', (event) => {
        if ((event?.target as ServiceWorker | null)?.state === 'activated') {
          window.location.reload();
        }
      });

      waitingServiceWorker.postMessage({ type: 'SKIP_WAITING' });
    }
  },
});

disablePageScroll();
