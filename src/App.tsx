import React from 'react';
import FBXAPI from '@feedbax/api';

import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'emotion-theming';

import theme from 'assets/theme';
import Routes from 'lib/routes';

function App(): JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={FBXAPI.store}>
        <Router>
          <Routes />
        </Router>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
