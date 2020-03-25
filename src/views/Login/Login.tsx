/* eslint-disable no-console */

import api from 'lib/api';
import sleep from 'lib/sleep';

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouteMatch, useHistory, useLocation } from 'react-router-dom';

import logo from 'assets/images/logo.png';
import bgProtrait from 'assets/images/background_vertical.jpg';
import bgLandscape from 'assets/images/background_horizontal.jpg';

import Logo, { Image, Title, Description } from 'components/Logo';

import Container from './components/Container';
import Greeting from './components/Greeting';
import { Form, Input, Button } from './components/Form';
import { Footer, Divider, Text, Link } from './components/Footer';

type ApiState = import('@feedbax/api/dist/store').ApiState;

const doLoginApi = async (eventCode: string): Promise<void> => {
  try {
    console.log('doLoginApi', eventCode);
    await api.login({ event: { slug: eventCode } });
    console.log(api.store.getState());
  } catch (error) {
    console.error(error);
  }
};

function Login(): JSX.Element {
  const match = useRouteMatch<{ eventCode?: string }>();
  const location = useLocation<{ reconnect?: boolean }>();
  const history = useHistory();

  const { params } = match;
  const { state = {} } = location;

  const { eventCode: eventCodeInitial } = params;
  const { reconnect: shouldReconnect } = state;

  const isEventLoaded = useSelector<ApiState>((_state) => _state.event.id !== '');

  const [eventCode, setEventCode] = useState(eventCodeInitial || '');
  const [isLoading, setLoading] = useState(true);

  const doLogin = async (): Promise<void> => {
    const timeStart = Date.now();
    let doLoginApiDuration = 0;

    setLoading(true);

    await doLoginApi(eventCode);

    doLoginApiDuration = Date.now() - timeStart;
    await sleep(Math.max(0, 500 - doLoginApiDuration));

    setLoading(false);
  };

  useEffect(() => {
    api.logout();
    setLoading(false);

    if (shouldReconnect && eventCode !== '') {
      doLogin();
    }
  }, []); // eslint-disable-line

  useEffect(() => {
    if (isEventLoaded && !isLoading) {
      history.push(`/e/${eventCode}`);
    }
  }, [isEventLoaded, eventCode, history, isLoading]);

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
