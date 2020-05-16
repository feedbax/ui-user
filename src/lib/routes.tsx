import React, { useEffect, useRef, useState, Suspense } from 'react';
import { Switch, Route, RouteProps, useLocation } from 'react-router-dom';

import { AnimatePresence, motion } from 'framer-motion';

import { FlattenInterpolation } from 'styled-components';
import { ThemeProps } from 'assets/theme';

import * as Login from 'views/Login';
import * as Event from 'views/Event';
import * as Error404 from 'views/Error';
import * as PrivacyPolicy from 'views/legal/PrivacyPolicy';

import Container from 'components/Container';
import Loading from 'components/Loading';

import bgProtrait from 'assets/images/background_vertical.jpg';
import bgLandscape from 'assets/images/background_horizontal.jpg';

type Comp = () => JSX.Element;
type MemoComp = React.MemoExoticComponent<Comp>;
type LazyComp = React.LazyExoticComponent<Comp>;
type LazyMemoComp = React.LazyExoticComponent<MemoComp>;

interface MyRouteProps extends RouteProps {
  key: string;
  component: Comp | MemoComp | LazyComp | LazyMemoComp;
  styles?: {
    wrapper?: FlattenInterpolation<ThemeProps>;
    content?: FlattenInterpolation<ThemeProps>;
  };
}

const routes: MyRouteProps[] = [
  { key: '404-html', exact: true, path: '/404.html', ...Error404 },
  { key: 'home', exact: true, path: '/', ...Login },
  { key: 'login', exact: true, path: '/login', ...Login },
  { key: 'login--inital', exact: true, path: '/:eventCode', ...Login },
  { key: 'event', exact: true, path: '/e/:eventCode', ...Event },
  // prettier-ignore
  { key: 'legal--privacy-policy', exact: true, path: '/legal/privacy-policy', ...PrivacyPolicy },
  { key: '404--catch-all', ...Error404 },
];

type Location = ReturnType<typeof useLocation> | undefined;
type Locations = { prev: Location; curr: Location; exitComplete: boolean; isInitial: boolean };

export const LocationContext = React.createContext<Locations>({
  prev: undefined,
  curr: undefined,
  exitComplete: true,
  isInitial: true,
});

const backgrounds = {
  bgLandscape,
  bgProtrait,
};

const fallback = (
  <Loading {...backgrounds} />
);

const Routes = (): JSX.Element => {
  const location = useLocation();

  const [locations, setLocations] = useState<Locations>({
    prev: undefined,
    curr: undefined,
    exitComplete: true,
    isInitial: true,
  });

  const currentLocation = useRef<typeof location>();
  const lastLocation = useRef<typeof location>();
  const isInitial = useRef(true);

  useEffect(() => {
    lastLocation.current = currentLocation.current ? { ...currentLocation.current } : undefined;
    currentLocation.current = { ...location };

    const _isInitial = isInitial.current;
    isInitial.current = false;

    setLocations({
      prev: lastLocation.current,
      curr: currentLocation.current,
      exitComplete: false,
      isInitial: _isInitial,
    });
  }, [location]);

  const onExitComplete = (): void => {
    setLocations({
      prev: lastLocation.current,
      curr: currentLocation.current,
      exitComplete: true,
      isInitial: false,
    });
  };

  return (
    <LocationContext.Provider value={locations}>
      <AnimatePresence initial={false} onExitComplete={onExitComplete}>
        <Switch location={location} key={location.pathname}>
          {routes.map(({ key, component: RouteChild, styles, ...route }) => (
            <Route key={key} {...route}>
              <motion.div
                key={key}
                style={{ position: 'absolute', width: '100%', height: '100%' }}
                initial={{ opacity: 0, zIndex: 0 }}
                animate={{ zIndex: 0, opacity: 1 }}
                exit={{ zIndex: 1, opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Suspense fallback={fallback}>
                  <Container styles={styles} {...backgrounds}>
                      <RouteChild />
                  </Container>
                </Suspense>
              </motion.div>
            </Route>
          ))}
        </Switch>
      </AnimatePresence>
    </LocationContext.Provider>
  );
};

export default Routes;
