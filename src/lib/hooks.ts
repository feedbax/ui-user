import { useContext, useEffect } from 'react';
import twemoji from 'twemoji';

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

const useEmojis = <T extends HTMLElement>(el: T | null): void => {
  if (el) {
    twemoji.parse(el);
  }
};

const resizeQuestion = <T extends HTMLElement>(el: T | null): void => {
  if (el) {
    const lineHeightString = window.getComputedStyle(el).lineHeight;
    const lineHeight = parseInt(lineHeightString, 10);

    if (el.clientHeight <= lineHeight + 1) {
      // eslint-disable-next-line no-param-reassign
      el.style.maxWidth = `${0.8 * el.clientWidth}px`;
    }
  }
};

// eslint-disable-next-line import/prefer-default-export
export { useLocationEffect, useEmojis, resizeQuestion };
