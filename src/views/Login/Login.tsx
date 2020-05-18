/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import { useRouteMatch, useHistory, useLocation } from 'react-router-dom';

import api from 'lib/api';
import { useLocationEffect } from 'lib/hooks';

import { Helmet } from 'react-helmet';

import { FBXLogo } from 'components/Logo';
import { FBXFooter } from 'components/Footer';

import Greeting from './components/Greeting';
import { Form, Input, Button } from './components/Form';

import { useApiLogin } from './hooks';

function Login(): JSX.Element {
  const match = useRouteMatch<{ eventCode?: string }>();
  const location = useLocation<{ eventCode?: string }>();
  const history = useHistory();

  const { params } = match;
  const { state = {} } = location;

  const { eventCode: eventCodeInitial } = params;
  const { eventCode: eventCodeLast } = state;

  const [eventCode, _setEventCode] = useState(eventCodeInitial || eventCodeLast || '');
  const setEventCode = (code: string): void => _setEventCode(code.trim().toLocaleLowerCase());

  const [isLoading, isLoggedIn, doLogin] = useApiLogin(eventCode);

  useLocationEffect(
    [`/${eventCode}`, '/login'],
    () => {
      api.logout();

      if (eventCodeInitial && eventCodeInitial !== '') {
        doLogin();
      }
    },
    true,
  );

  useEffect(
    () => {
      if (isLoggedIn && !isLoading) {
        history.push(`/e/${eventCode}`);
      }
    },
    [isLoggedIn, eventCode, history, isLoading],
  );

  return (
    <>
      <Helmet>
        <title>feedbax | Login</title>
      </Helmet>

      <FBXLogo margin={['0 0 30px 0', '0 0 40px 0', '0 0 50px 0']} />

      <Greeting>Hallo!</Greeting>

      <Form>
        <Input value={eventCode} onChange={(e): void => setEventCode(e.currentTarget.value)}>
          EVENT-CODE
        </Input>

        <Button height={[47, 59, 72]} disabled={isLoading} loading={isLoading} onClick={doLogin}>
          Los geht&apos;s
        </Button>
      </Form>

      <FBXFooter $color="primary" />
    </>
  );
}

export default React.memo(Login);
