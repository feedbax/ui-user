import React, { useRef, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router-dom';

import Logo, { LogoSize, Title, Description, Image } from 'components/Logo';

import getScrollBarWidth from 'lib/get-scrollbar-width';
import { useLocationEffect } from 'lib/hooks';

import logo from 'assets/images/logo_128c.png';
import bgProtrait from 'assets/images/background_vertical.jpg';
import bgLandscape from 'assets/images/background_horizontal.jpg';

import Container from './components/Container';
import Content from './components/Content';
import Question from './components/Question';
import WriteAnswer, { TextArea, Button } from './components/WriteAnswer';

type ApiState = import('@feedbax/api/dist/store').ApiState;

const defaultElement = document.createElement('div');
const scrollBarWidth = getScrollBarWidth();

const demoElements = new Array<JSX.Element>(200).fill(<></>).map(
  (_, i): JSX.Element => (
    <div key={i} style={{ backgroundColor: '#fff' }}>
      {i}
    </div>
  )
);

function Demo({ height }: { height: number }): JSX.Element {
  return (
    <div
      style={{
        transform: `translateY(${height}px)`,
      }}
    >
      {demoElements}
    </div>
  );
}

const Event = (): JSX.Element => {
  const history = useHistory();
  const match = useRouteMatch<{ eventCode: string }>();

  const { params } = match;
  const { eventCode } = params;

  const questionsWrapperRef = useRef<HTMLDivElement>(defaultElement);

  const [answerText, setAnswerText] = useState('');
  const [isTextScrollable, setTextScrollable] = useState(false);
  const isEventLoaded = useSelector<ApiState, boolean>((_state) => _state.event.id !== '');

  const [questionNumber, setQuestionNumber] = useState(0);
  const [questionHeight, setQuestionHeight] = useState<number>(0);

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

  const _onQuestionChange = useCallback((newQuestionNumber: number): void => {
    setQuestionNumber(newQuestionNumber);
  }, []);

  const _onQuestionHeightChange = useCallback((newQuestionHeight: number): void => {
    setQuestionHeight(newQuestionHeight);
  }, []);

  const _logout = useCallback((): void => {
    history.push(`/login`, { eventCode });
  }, []); // eslint-disable-line

  const _share = useCallback((): void => {
    console.log('share');
  }, []);

  return (
    <Container bgLandscape={bgLandscape} bgProtrait={bgProtrait}>
      <Content ref={questionsWrapperRef}>
        <Button
          onClick={_logout}
          icon="log-out"
          size={28}
          apperance={{
            backgroundColor: 'accent2',
            position: 'absolute',
            left: 20,
            top: 20,
          }}
        />

        <Button
          onClick={_share}
          icon="share"
          size={28}
          apperance={{
            backgroundColor: 'accent2',
            position: 'absolute',
            right: 20,
            top: 20,
          }}
        />

        <Logo size={LogoSize.Small} padding="20px 0">
          <Image image={logo} />
          <Title>feedbax</Title>
          <Description>by 365steps</Description>
        </Logo>

        <Question
          questionNumber={questionNumber}
          onQuestionHeightChange={_onQuestionHeightChange}
          onQuestionChange={_onQuestionChange}
        />

        <Demo height={questionHeight} />
      </Content>
      <WriteAnswer>
        <TextArea
          rows={1}
          placeholder={`Deine Nachricht..`}
          value={answerText}
          maxLength={500}
          onChange={_onChange}
          onScrollable={_onScrollable}
        />

        <Button
          icon="send"
          disabled={answerText.length === 0}
          size={35}
          apperance={{
            transform: `translate(-${isTextScrollable ? scrollBarWidth : 0}px, -50%)`,
            backgroundColor: 'accent1',
          }}
        />
      </WriteAnswer>
    </Container>
  );
};

export default React.memo(Event);
