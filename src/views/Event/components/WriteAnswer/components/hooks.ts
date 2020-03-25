import { useState, useEffect, RefObject } from 'react';

import ResizeObserver from 'resize-observer-polyfill';
import WebFont from 'webfontloader';

export function useIsScrollable(ref: RefObject<Element | undefined>): boolean {
  const [isScrollable, setScrollable] = useState(false);

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      const scrollHeight = ref.current?.scrollHeight || 0;
      const clientHeight = ref.current?.clientHeight || 0;
      const _isScrollable = scrollHeight > clientHeight;

      if (ref.current && _isScrollable) {
        setScrollable(true);
      } else if (ref.current) {
        setScrollable(false);
      }
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return (): void => {
      observer.disconnect();
    };
  }, [ref]);

  return isScrollable;
}

export function useFontLoader(families: string[]): boolean {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    WebFont.load({
      fontactive: () => setLoading(false),
      fontinactive: () => setLoading(false),
      custom: {
        families,
      },
    });
  }, []); // eslint-disable-line

  return isLoading;
}
