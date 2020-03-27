import React, { useRef, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router-dom';

import Logo, { LogoSize, Title, Description, Image } from 'components/Logo';

import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import getScrollBarWidth from 'lib/get-scrollbar-width';
import { useLocationEffect } from 'lib/hooks';

import logo from 'assets/images/logo_128c.png';
import bgProtrait from 'assets/images/background_vertical.jpg';
import bgLandscape from 'assets/images/background_horizontal.jpg';

import Container from './components/Container';
import Content from './components/Content';
import WriteAnswer, { TextArea, Button } from './components/WriteAnswer';

type ApiState = import('@feedbax/api/dist/store').ApiState;

const defaultElement = document.createElement('div');
const scrollBarWidth = getScrollBarWidth();
const Demo = new Array<JSX.Element>(200).fill(<></>).map(
  (_, i): JSX.Element => (
    <div key={i} style={{ backgroundColor: '#fff' }}>
      {i}
    </div>
  )
);

const Event = (): JSX.Element => {
  const history = useHistory();
  const match = useRouteMatch<{ eventCode: string }>();

  const { params } = match;
  const { eventCode } = params;

  const questionsWrapperRef = useRef<Element>(defaultElement);

  const [answerText, setAnswerText] = useState('');
  const [isTextScrollable, setTextScrollable] = useState(false);
  const isEventLoaded = useSelector<ApiState>((_state) => _state.event.id !== '');

  useLocationEffect(`/e/${eventCode}`, () => {
    console.log('Event', 'useLocationEffect');
    console.log('Event', 'isEventLoaded?', isEventLoaded);

    if (!isEventLoaded) {
      console.log('Event', 'redirect to login');
      history.push(`/${eventCode}`);
    }
  });

  const _onChange = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setAnswerText(event.target.value);
  }, []);

  const _onScrollable = useCallback((isScrollable: boolean): void => {
    setTextScrollable(isScrollable);
  }, []);

  const _onFocus = useCallback((): void => {
    if (questionsWrapperRef.current) {
      disableBodyScroll(questionsWrapperRef.current);
    }
  }, []);

  const _onBlur = useCallback((): void => {
    if (questionsWrapperRef.current) {
      enableBodyScroll(questionsWrapperRef.current);
    }
  }, []);

  const _logout = useCallback((): void => {
    history.push(`/login`, { eventCode });
  }, []); // eslint-disable-line

  const _share = useCallback((): void => {
    console.log('share');
  }, []);

  return (
    <Container bgLandscape={bgLandscape} bgProtrait={bgProtrait}>
      <Content ref={questionsWrapperRef} backgroundColor="accent2">
        <Button
          onClick={_logout}
          icon="log-out"
          size={28}
          sx={{
            backgroundColor: 'accent2',
            position: 'absolute',
            left: '20px',
            top: '20px',
          }}
        />

        <Button
          onClick={_share}
          icon="share"
          size={28}
          sx={{
            backgroundColor: 'accent2',
            position: 'absolute',
            right: '20px',
            top: '20px',
          }}
        />

        <Logo size={LogoSize.Small} p="20px 0">
          <Image image={logo} />
          <Title>feedbax</Title>
          <Description>by 365steps</Description>
        </Logo>

        {Demo}
      </Content>
      <WriteAnswer>
        <TextArea
          rows={1}
          placeholder={`Deine Nachricht..`}
          value={answerText}
          maxLength={500}
          onChange={_onChange}
          onScrollable={_onScrollable}
          onFocus={_onFocus}
          onBlur={_onBlur}
        />

        <Button
          icon="send"
          disabled={answerText.length === 0}
          size={35}
          sx={{
            transform: `translate(-${isTextScrollable ? scrollBarWidth : 0}px, -50%)`,
            backgroundColor: 'accent1',
          }}
        />
      </WriteAnswer>
    </Container>
  );
};

export default React.memo(Event);
