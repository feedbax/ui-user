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

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
disablePageScroll();
