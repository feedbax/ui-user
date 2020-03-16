import FBXAPI from '@feedbax/api';

import React, { useState, useEffect } from 'react';

import logo from 'assets/images/logo.png';
import bgProtrait from 'assets/images/background_vertical.jpg';
import bgLandscape from 'assets/images/background_horizontal.jpg';

import Container from './components/Container';
import { Logo, Image, Title, Description } from './components/Logo';
import Greeting from './components/Greeting';
import { Form, Input, Button } from './components/Form';
import { Footer, Divider, Text, Link } from './components/Footer';

interface Props {
  history: History;
  location: Location;
  match: import('react-router-dom').match<{ eventCode?: string }>;
}

const api = new FBXAPI('http://157.230.29.66:3000', 'user');

const sleep = (duration: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, duration));
};

const doLoginApi = async (eventCode: string): Promise<void> => {
  try {
    console.log('doLoginApi', eventCode);
    await api.login({ event: { slug: eventCode } });
    console.log(api.store.getState());
  } catch (error) {
    console.error(error);
  }
};

const Login = ({ match }: Props): JSX.Element => {
  const { params } = match;
  const { eventCode: eventCodeInitial } = params;

  const [eventCode, setEventCode] = useState(eventCodeInitial || '');
  const [isLoading, setLoading] = useState(false);

  const doLogin = async (): Promise<void> => {
    if (eventCode !== '') {
      const timeStart = Date.now();
      let doLoginApiDuration = 0;

      setLoading(true);

      await doLoginApi(eventCode);

      doLoginApiDuration = Date.now() - timeStart;
      await sleep(Math.max(0, 500 - doLoginApiDuration));

      setLoading(false);
    }
  };

  useEffect(() => {
    if (typeof eventCodeInitial !== 'undefined') {
      doLogin();
    }
  }, []); // eslint-disable-line

  return (
    <Container bgLandscape={bgLandscape} bgProtrait={bgProtrait}>
      <Logo>
        <Image image={logo} />
        <Title>feedbax</Title>
        <Description>by 365steps</Description>
      </Logo>

      <Greeting>Hallo!</Greeting>

      <Form>
        <Input
          autoFocus
          value={eventCode}
          onChange={(e): void => setEventCode(e.currentTarget.value)}
        >
          EVENT-CODE
        </Input>

        <Button height={[47, 59, 72]} disabled={isLoading} loading={isLoading} onClick={doLogin}>
          Los geht&apos;s
        </Button>
      </Form>

      <Footer>
        <Divider />
        <Text>&copy; 2019-2020 | feedb.ax by 365steps</Text>
        <Link to="/legal/privacy-policy">{`Datenschutz & Impressum`}</Link>
      </Footer>
    </Container>
  );
};

export default React.memo(Login);
