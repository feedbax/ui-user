import { lighten as _lighten, darken as _darken } from 'polished';

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

type Lighten = (v: number, c: Color) => ({ theme: t }: ThemeProps) => string;
export const lighten: Lighten = (v, c) => ({ theme: t }): string => _lighten(v, t.colors[c]);

type Darken = (v: number, c: Color) => ({ theme: t }: ThemeProps) => string;
export const darken: Darken = (v, c) => ({ theme: t }): string => _darken(v, t.colors[c]);

export default theme;
