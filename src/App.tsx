import React from 'react';
import FBXAPI from '@feedbax/api';

import { Provider as StoreProvider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { Router } from 'react-router-dom';

import theme from 'assets/theme';
import Routes from 'lib/routes';
import history from 'lib/history';

function App(): JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <StoreProvider store={FBXAPI.store}>
        <Router history={history}>
          <Routes />
        </Router>
      </StoreProvider>
    </ThemeProvider>
  );
}

export default App;
