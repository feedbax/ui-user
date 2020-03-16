const preset = {
  colors: {
    primary: '#fff',
    accent1: '#3a556a',
    accent2: '#ff7d65'
  },
  fonts: {
    primary: 'Roboto Slab',
    secondary: 'Klinic Slab',
    secondaryAccent: 'Klinic Slab Book'
  },
  fontSizes: [14, 16, 18, 22, 26, 34, 50, 66, 98],
  fontWeights: {
    bold: 700
  },
  variants: {
    flexLogin: {
      size: '100%',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'auto'
    }
  }
};

const theme = {
  ...preset
};

export default theme;
