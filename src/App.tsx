import React from 'react';
import store from 'store';

import { Provider as StoreProvider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { Normalize } from 'styled-normalize';
import { Router } from 'react-router-dom';

import theme from 'assets/theme';
import Routes from 'routes';
import history from 'routes/history';

function App(): JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <StoreProvider store={store}>
        <Normalize />
        <Router history={history}>
          <Routes />
        </Router>
      </StoreProvider>
    </ThemeProvider>
  );
}

export default App;
