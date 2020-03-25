/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable camelcase */

import Color from 'color';

const colorPrimary = new Color('#fff', 'hex');
const colorAccent1 = new Color('#3a556a', 'hex');
const colorAccent2 = new Color('#ff7d65', 'hex');

const preset = {
  colors: {
    primary: colorPrimary.toString(),
    accent1: colorAccent1.toString(),
    accent1_light_20: colorAccent1.lighten(0.2).toString(),
    accent1_dark_20: colorAccent1.darken(0.2).toString(),
    accent2: colorAccent2.toString(),
    accent2_light_20: colorAccent2.lighten(0.2).toString(),
    accent2_dark_20: colorAccent2.darken(0.2).toString(),
  },
  fonts: {
    primary: 'Roboto Slab',
    secondary: 'Klinic Slab',
    secondaryAccent: 'Klinic Slab Book',
  },
  fontSizes: [14, 16, 18, 22, 26, 34, 50, 66, 98],
  fontWeights: {
    bold: 700,
  },
  variants: {
    flexLogin: {
      size: '100%',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'auto',
    },
  },
};

const theme = {
  ...preset,
};

export default theme;
