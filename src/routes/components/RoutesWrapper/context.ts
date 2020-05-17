import React from 'react';
import type { Locations } from 'routes/types';

export const LocationContext = React.createContext<Locations>({
  prev: undefined,
  curr: undefined,
  exitComplete: true,
  isInitial: true,
});
