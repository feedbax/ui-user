import React from 'react';
import FBXAPI from '@feedbax/api';

import { Provider as StoreProvider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router } from 'react-router-dom';

import theme from 'assets/theme';
import Routes from 'lib/routes';

function App(): JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <StoreProvider store={FBXAPI.store}>
        <Router>
          <Routes />
        </Router>
      </StoreProvider>
    </ThemeProvider>
  );
}

export default App;
