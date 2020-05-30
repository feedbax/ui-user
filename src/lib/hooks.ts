import { useContext, useEffect } from 'react';
import twemoji from 'twemoji';

import { LocationContext } from './routes';

function lower(value: string): string;
function lower(value: string[]): string[];
function lower(value: string | string[]): string | string[] {
  if (Array.isArray(value)) {
    return value.map((v) => v.toLocaleLowerCase());
  }

  return value.toLowerCase();
}

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
        ? lower(path).includes(lower(locations.curr?.pathname || ''))
        : lower(locations.curr?.pathname || '') === lower(path);

      if (isPage && (locations.exitComplete === waitForExitComplete || locations.isInitial)) {
        handler();
      }
    },
    [locations.curr, locations.exitComplete] // eslint-disable-line react-hooks/exhaustive-deps
  );
}

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

      const text = el.innerText.split(' ');
      const last = text.pop();

      // eslint-disable-next-line no-param-reassign
      el.innerText = `${text.join(' ')}\n${last}`;
    }
  }
};

// eslint-disable-next-line import/prefer-default-export
export { useLocationEffect, useEmojis, resizeQuestion };
