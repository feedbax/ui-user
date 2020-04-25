import 'react-app-polyfill/stable';

import React from 'react';
import ReactDom from 'react-dom';

import { disablePageScroll } from 'scroll-lock';

import store from 'store';
import { setPointerType } from 'store/actions';
import { PointerType, SetPointerTypeAction } from 'store/types';

import App from 'App';
import rootElement from 'lib/rootElement';
import * as serviceWorker from 'serviceWorker';

import 'assets/style.css';

const changePointerType = (): SetPointerTypeAction =>
  store.dispatch(setPointerType(PointerType.MOUSE));

rootElement.addEventListener('mouseover', changePointerType);

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
