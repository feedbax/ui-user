import { useContext, useEffect } from 'react';
import { LocationContext } from './routes';

// prettier-ignore
function useLocationEffect(path: string[], handler: () => void, waitForExitComplete?: boolean): void;
function useLocationEffect(path: string, handler: () => void, waitForExitComplete?: boolean): void;

function useLocationEffect(
  path: string | string[],
  handler: () => void,
  waitForExitComplete = false
): void {
  const locations = useContext(LocationContext);

  useEffect(
    function locationChanged() {
      const isPage = Array.isArray(path)
        ? path.includes(locations.curr?.pathname || '')
        : locations.curr?.pathname === path;

      if (isPage && (locations.exitComplete === waitForExitComplete || locations.isInitial)) {
        handler();
      }
    },
    [locations.curr, locations.exitComplete] // eslint-disable-line react-hooks/exhaustive-deps
  );
}

// eslint-disable-next-line import/prefer-default-export
export { useLocationEffect };
