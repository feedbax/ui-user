import React, { useRef, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router-dom';

import api from 'lib/api';

import store from 'store';
import { setSeletedAnswer } from 'store/actions';
import {
  isEventLoadedSelector,
  currentQuestionSelector,
  selectedAnswerSelector,
} from 'store/selectors';

import Logo, { LogoSize, Title, Description, Image } from 'components/Logo';
import Button from 'components/ButtonNeumorphism';
import { Footer, Divider, Link, Text } from 'components/Footer';

import getScrollBarWidth from 'lib/get-scrollbar-width';
import { useLocationEffect } from 'lib/hooks';

import logo from 'assets/images/logo_128c.png';
import bgProtrait from 'assets/images/background_vertical.jpg';
import bgLandscape from 'assets/images/background_horizontal.jpg';

import Container from './components/Container';
import Content from './components/Content';
import Pagination from './components/Pagination';
import Question from './components/Question';
import AnswerFilter from './components/AnswerFilter';
import Answers from './components/Answers';
import WriteAnswer, { TextArea } from './components/WriteAnswer';
import Header from './components/Header';
import VoteAnswer, { Button as VoteButton } from './components/VoteAnswer';

const defaultElement = document.createElement('div');
const scrollBarWidth = getScrollBarWidth();

const Event = (): JSX.Element => {
  const history = useHistory();
  const match = useRouteMatch<{ eventCode: string }>();

  const { params } = match;
  const { eventCode } = params;

  const questionsWrapperRef = useRef<HTMLDivElement>(defaultElement);

  const [answerText, setAnswerText] = useState('');
  const [isTextScrollable, setTextScrollable] = useState(false);

  const isEventLoaded = useSelector(isEventLoadedSelector);
  const currentQuestion = useSelector(currentQuestionSelector);
  const selectedAnswer = useSelector(selectedAnswerSelector);

  useLocationEffect(`/e/${eventCode}`, () => {
    if (!isEventLoaded) {
      history.push(`/${eventCode}`);
    }
  });

  const _onChange = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setAnswerText(event.target.value);
  }, []);

  const _onScrollable = useCallback((isScrollable: boolean): void => {
    setTextScrollable(isScrollable);
  }, []);

  const _logout = useCallback((): void => {
    history.push(`/login`, { eventCode });
  }, []); // eslint-disable-line

  // const _share = useCallback((): void => {
  //   // console.log('share');
  // }, []);

  const _postAnswer = useCallback(async (): Promise<void> => {
    if (currentQuestion) {
      const props = {
        question: { id: currentQuestion?.id },
        answer: { text: answerText },
      };

      await api.postAnswer(props);
      setAnswerText('');
    }
  }, [answerText, currentQuestion]);

  const _voteAnswer = useCallback(async (): Promise<void> => {
    if (selectedAnswer) {
      const props = {
        answer: { id: selectedAnswer },
      };

      await api.toggleLike(props);

      const action = setSeletedAnswer(null);
      store.dispatchAll(action);
    }
  }, [selectedAnswer]);

  return (
    <Container bgLandscape={bgLandscape} bgProtrait={bgProtrait}>
      <Content ref={questionsWrapperRef}>
        <Header>
          <Button
            onClick={_logout}
            icon="log-out"
            size={28}
            apperance={{
              backgroundColor: 'accent2',
              position: 'absolute',
              left: 0,
              top: 0,
              padding: 20,
            }}
          />

          {/* <Button
            onClick={_share}
            icon="share"
            size={28}
            apperance={{
              backgroundColor: 'accent2',
              position: 'absolute',
              right: 0,
              top: 0,
              padding: 20,
            }}
          /> */}

          <Logo size={LogoSize.Small} padding="20px 0">
            <Image image={logo} />
            <Title>feedbax</Title>
            <Description>by 365steps</Description>
          </Logo>

          <Pagination />
          <Question />
          <AnswerFilter />
        </Header>

        <Answers />

        <Footer color="accent1">
          <Divider />
          <Text>{`© 2019-${new Date().getFullYear()} | feedb.ax by 365steps`}</Text>
          <Link to="/legal/privacy-policy">{`Datenschutz & Impressum`}</Link>
        </Footer>
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
          onClick={_postAnswer}
          size={35}
          apperance={{
            transform: `translate(-${isTextScrollable ? scrollBarWidth : 0}px, -50%)`,
            backgroundColor: 'accent1',
            position: 'absolute',
            top: [50, '%'],
            right: 15,
          }}
        />
      </WriteAnswer>

      <VoteAnswer>
        <VoteButton onClick={_voteAnswer}>Bestätigen</VoteButton>
      </VoteAnswer>
    </Container>
  );
};

export default React.memo(Event);
