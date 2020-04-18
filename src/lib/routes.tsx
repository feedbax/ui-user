import React, { useEffect, useRef, useState } from 'react';
import { Switch, Route, RouteProps, useLocation } from 'react-router-dom';

import { AnimatePresence, motion } from 'framer-motion';

import Login from '../views/Login';
import Event from '../views/Event';
import Error404 from '../views/Error/404';

interface MyRouteProps extends RouteProps {
  key: string;
  component: typeof Login | typeof Event | typeof Error404;
}

const routes: MyRouteProps[] = [
  { key: '404-html', exact: true, path: '/404.html', component: Error404 },
  { key: 'home', exact: true, path: '/', component: Login },
  { key: 'login', exact: true, path: '/login', component: Login },
  { key: 'login--inital', exact: true, path: '/:eventCode', component: Login },
  { key: 'event', exact: true, path: '/e/:eventCode', component: Event },
  { key: 'legal--privacy-policy', exact: true, path: '/legal/privacy-policy', component: Login },
  { key: '404--catch-all', component: Error404 },
];

type Location = ReturnType<typeof useLocation> | undefined;
type Locations = { prev: Location; curr: Location };

export const LocationContext = React.createContext<Locations>({ prev: undefined, curr: undefined });

const Routes = (): JSX.Element => {
  const location = useLocation();

  const [locations, setLocations] = useState<Locations>({
    prev: undefined,
    curr: undefined,
  });

  const currentLocation = useRef<typeof location>();
  const lastLocation = useRef<typeof location>();

  useEffect(() => {
    lastLocation.current = currentLocation.current;
    currentLocation.current = location;

    setLocations({
      prev: lastLocation.current,
      curr: currentLocation.current,
    });
  }, [location]);

  return (
    <LocationContext.Provider value={locations}>
      <AnimatePresence initial={false}>
        <Switch location={location} key={location.pathname}>
          {routes.map(({ key, component: RouteChild, ...route }) => (
            <Route key={key} {...route}>
              <motion.div
                key={key}
                style={{ position: 'absolute', width: '100%', height: '100%' }}
                initial={{ opacity: 0, zIndex: 0 }}
                animate={{ zIndex: 0, opacity: 1 }}
                exit={{ zIndex: 1, opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <RouteChild />
              </motion.div>
            </Route>
          ))}
        </Switch>
      </AnimatePresence>
    </LocationContext.Provider>
  );
};

export default Routes;
