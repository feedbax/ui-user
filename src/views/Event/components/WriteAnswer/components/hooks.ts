import { useState, useEffect } from 'react';
import WebFont from 'webfontloader';

// eslint-disable-next-line import/prefer-default-export
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
