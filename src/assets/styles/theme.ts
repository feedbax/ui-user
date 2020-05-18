import type { FlattenInterpolation } from 'styled-components';

const preset = {
  colors: {
    primary: '#fff',
    accent1: '#3a556a',
    accent2: '#ff7d65',
  },
  fonts: {
    primary: 'Roboto Slab',
    secondary: 'Klinic Slab',
    secondaryAccent: 'Klinic Slab Book',
  },
};

const theme = {
  ...preset,
};

export type ThemeProps = { theme: typeof theme };
export type FontFamily = 'primary' | 'secondary' | 'secondaryAccent';
export type Color = 'primary' | 'accent1' | 'accent2';

export const fontFamily = (f: FontFamily) => ({ theme: t }: ThemeProps): string => t.fonts[f];
export const color = (c: Color) => ({ theme: t }: ThemeProps): string => t.colors[c];

export type ColorFn = ReturnType<typeof color>;
export type Style = FlattenInterpolation<ThemeProps>;

export default theme;
