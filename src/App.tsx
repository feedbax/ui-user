import React from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import { ThemeProvider } from 'emotion-theming';
import theme from 'theme';

import Login from 'views/Login';

function App(): JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Route
          render={({ location }): JSX.Element => (
            <AnimatePresence exitBeforeEnter initial={false}>
              <Switch location={location} key={location.pathname}>
                <Route exact path="/" component={Login} />
                <Route exact path="/:eventCode" component={Login} />
                <Route exact path="/legal/privacy-policy" component={Login} />
              </Switch>
            </AnimatePresence>
          )}
        />
      </Router>
    </ThemeProvider>
  );
}

export default App;
