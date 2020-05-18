import { useContext, useEffect } from 'react';
import { LocationContext } from 'routes';

function lower(value: string): string;
function lower(value: string[]): string[];
function lower(value: string | string[]): string | string[] {
  if (Array.isArray(value)) {
    return value.map((v) => v.toLocaleLowerCase());
  }

  return value.toLowerCase();
}


type UseLocationEffect = {
  (path: string[], handler: () => void, waitForExitComplete?: boolean): void;
  (path: string, handler: () => void, waitForExitComplete?: boolean): void;
};

const useLocationEffect: UseLocationEffect = (
  (path: string | string[], handler: () => void, waitForExitComplete = false): void => {
    const locations = useContext(LocationContext);

    useEffect(
      () => {
        const isPage = Array.isArray(path)
          ? lower(path).includes(lower(locations.curr?.pathname || ''))
          : lower(locations.curr?.pathname || '') === lower(path);

        if (isPage && (locations.exitComplete === waitForExitComplete || locations.isInitial)) {
          handler();
        }
      },
      [locations.curr, locations.exitComplete], // eslint-disable-line react-hooks/exhaustive-deps
    );
  }
);

// eslint-disable-next-line import/prefer-default-export
export { useLocationEffect };
