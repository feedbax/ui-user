import * as Login from 'views/Login';
import * as Event from 'views/Event';
import * as Error404 from 'views/Error';
import * as PrivacyPolicy from 'views/legal/PrivacyPolicy';
import * as Disclaimer from 'views/legal/Disclaimer';

import type { Routes } from './types';

const routes: Routes[] = [
  {
    key: '404-html',
    path: '/404.html',
    exact: true,
    ...Error404,
  },

  {
    key: 'home',
    path: '/',
    exact: true,
    ...Login,
  },

  {
    key: 'login',
    path: '/login',
    exact: true,
    ...Login,
  },

  {
    key: 'login--inital',
    path: '/:eventCode',
    exact: true,
    ...Login,
  },

  {
    key: 'event',
    path: '/e/:eventCode',
    exact: true,
    ...Event,
  },

  {
    key: 'legal--privacy-policy',
    path: '/legal/privacy-policy',
    exact: true,
    ...PrivacyPolicy,
  },

  {
    key: 'legal--disclaimer',
    path: '/legal/disclaimer',
    exact: true,
    ...Disclaimer,
  },

  {
    key: '404--catch-all',
    ...Error404,
  },
];

export default routes;
