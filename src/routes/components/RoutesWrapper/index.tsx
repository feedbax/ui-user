import React, { useEffect, useRef, useState } from 'react';
import { Switch, useLocation } from 'react-router-dom';

import { AnimatePresence } from 'framer-motion';
import { LocationContext } from './context';

import type { Locations } from 'routes/types';
import type { RouterProps } from './types';

const RoutesWrapper = ({ children }: RouterProps): JSX.Element => {
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
          { children }
        </Switch>
      </AnimatePresence>
    </LocationContext.Provider>
  );
};

export default React.memo(RoutesWrapper);
