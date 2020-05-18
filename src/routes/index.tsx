import React from 'react';
import { Route } from 'react-router-dom';

import routes from './routes';

import RoutesWrapper from './components/RoutesWrapper';
import RouteContent from './components/RouteContent';

const Routes = (): JSX.Element => (
  <RoutesWrapper>
    {routes.map(({ component, ...route }) => (
      <Route key={route.key} {...route}>
        <RouteContent route={{ component, ...route }} />
      </Route>
    ))}
  </RoutesWrapper>
);

export default Routes;

export { LocationContext } from './components/RoutesWrapper/context';
