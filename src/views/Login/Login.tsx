/* eslint-disable no-console */

import api from 'lib/api';
import { useLocationEffect } from 'lib/hooks';

import React, { useState, useEffect } from 'react';
import { useRouteMatch, useHistory, useLocation } from 'react-router-dom';

import logo from 'assets/images/logo_128c.png';
import bgProtrait from 'assets/images/background_vertical.jpg';
import bgLandscape from 'assets/images/background_horizontal.jpg';

import Logo, { Image, Title, Description } from 'components/Logo';

import Container from './components/Container';
import Greeting from './components/Greeting';
import { Form, Input, Button } from './components/Form';
import { Footer, Divider, Text, Link } from './components/Footer';

import { useApiLogin } from './hooks';

function Login(): JSX.Element {
  const match = useRouteMatch<{ eventCode?: string }>();
  const location = useLocation<{ eventCode?: string }>();
  const history = useHistory();

  const { params } = match;
  const { state = {} } = location;

  const { eventCode: eventCodeInitial } = params;
  const { eventCode: eventCodeLast } = state;

  const [eventCode, setEventCode] = useState(eventCodeInitial || eventCodeLast || '');
  const [isLoading, isLoggedIn, doLogin] = useApiLogin(eventCode);

  useLocationEffect([`/${eventCode}`, '/login'], () => {
    console.log('Login', 'useLocationEffect');
    console.log('Login', 'eventCodeInitial?', eventCodeInitial);

    api.logout();

    if (eventCodeInitial && eventCodeInitial !== '') {
      doLogin();
    }
  });

  useEffect(
    function onLogin() {
      if (isLoggedIn && !isLoading) {
        history.push(`/e/${eventCode}`);
      }
    },
    [isLoggedIn, eventCode, history, isLoading]
  );

  return (
    <Container bgLandscape={bgLandscape} bgProtrait={bgProtrait}>
      <Logo mb={[30, 40, 50]}>
        <Image image={logo} />
        <Title>feedbax</Title>
        <Description>by 365steps</Description>
      </Logo>

      <Greeting>Hallo!</Greeting>

      <Form>
        <Input value={eventCode} onChange={(e): void => setEventCode(e.currentTarget.value)}>
          EVENT-CODE
        </Input>

        <Button height={[47, 59, 72]} disabled={isLoading} loading={isLoading} onClick={doLogin}>
          Los geht&apos;s
        </Button>
      </Form>

      <Footer>
        <Divider />
        <Text>{`© 2019-${new Date().getFullYear()} | feedb.ax by 365steps`}</Text>
        <Link to="/legal/privacy-policy">{`Datenschutz & Impressum`}</Link>
      </Footer>
    </Container>
  );
}

export default React.memo(Login);
