import 'react-app-polyfill/stable';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/ie9';

import 'webcrypto-shim';

import React from 'react';
import ReactDom from 'react-dom';

import detectIt from 'detect-it';
import { disablePageScroll } from 'scroll-lock';

import store from 'store';
import { setPointerType } from 'store/actions';
import { PointerType } from 'store/types';

import App from 'App';
import { Normalize } from 'styled-normalize';

import { rootElement } from 'lib/helper';
import * as serviceWorker from 'serviceWorker';

import 'assets/styles/style.css';

if (detectIt.primaryInput === 'mouse') {
  store.dispatch(setPointerType(PointerType.MOUSE));
}

const Root = (): JSX.Element => (
  <>
    <Normalize />
    <App />
  </>
);

ReactDom.render(<Root />, rootElement);

function updateApp(reg: ServiceWorkerRegistration): void {
  const waitingServiceWorker = reg.waiting;

  if (waitingServiceWorker) {
    waitingServiceWorker.addEventListener('statechange', (event) => {
      if ((event?.target as ServiceWorker | null)?.state === 'activated') {
        window.location.reload();
      }
    });

    waitingServiceWorker.postMessage({ type: 'SKIP_WAITING' });
  }
}

serviceWorker.register({
  onUpdate: updateApp,
  onSuccess: updateApp,
  onWaiting: updateApp,
});

disablePageScroll();
