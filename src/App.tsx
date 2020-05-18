import React from 'react';
import store from 'store';

import { Provider as StoreProvider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { Router } from 'react-router-dom';

import theme from 'assets/styles/theme';
import Routes from 'routes';
import history from 'routes/history';

function App(): JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <StoreProvider store={store}>
        <Router history={history}>
          <Routes />
        </Router>
      </StoreProvider>
    </ThemeProvider>
  );
}

export default App;
