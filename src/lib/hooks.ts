import { useContext, useEffect } from 'react';
import { LocationContext } from './routes';

function useLocationEffect(path: string[], handler: () => void): void;
function useLocationEffect(path: string, handler: () => void): void;
function useLocationEffect(path: string | string[], handler: () => void): void {
  const locations = useContext(LocationContext);

  useEffect(
    function locationChanged() {
      const isPage = Array.isArray(path)
        ? path.includes(locations.curr?.pathname || '')
        : locations.curr?.pathname === path;

      if (isPage) {
        handler();
      }
    },
    [locations.curr] // eslint-disable-line react-hooks/exhaustive-deps
  );
}

// eslint-disable-next-line import/prefer-default-export
export { useLocationEffect };
