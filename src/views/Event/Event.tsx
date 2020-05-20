import React, { useRef, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router-dom';

import { Helmet } from 'react-helmet';

import api from 'lib/api';
import { useLocationEffect } from 'lib/hooks';

import store from 'store';
import { setSeletedAnswer } from 'store/actions';

import {
  isEventLoadedSelector,
  currentQuestionSelector,
  selectedAnswerSelector,
} from 'store/selectors';

import { LogoSize, FBXLogo } from 'components/Logo';
import { FBXFooter } from 'components/Footer';

import Content from './components/Content';
import Header from './components/Content/Header';
import Pagination from './components/Content/Header/components/Pagination/Pagination';
import Question from './components/Content/Header/components/Question';
import AnswerFilter from './components/Content/Header/components/AnswerFilter';
import LogoutButton from './components/Content/Header/components/LogoutButton';
import ShareButton from './components/Content/Header/components/ShareButton';
import Answers from './components/Content/Answers';

import WriteAnswer, { TextArea, PostAnswerButton } from './components/WriteAnswer';
import VoteAnswer, { Button as VoteButton } from './components/VoteAnswer';

const defaultElement = document.createElement('div');

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

  const $onAnswerTextChange = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setAnswerText(event.target.value);
  }, []);

  const $onScrollableChange = useCallback((isScrollable: boolean): void => {
    setTextScrollable(isScrollable);
  }, []);

  const $logout = useCallback((): void => {
    history.push('/login', { eventCode });
  }, [eventCode, history]);

  const $share = useCallback((): void => {
    // console.log('share');
  }, []);

  const $postAnswer = useCallback(async (): Promise<void> => {
    if (currentQuestion) {
      const props = {
        question: { id: currentQuestion?.id },
        answer: { text: answerText },
      };

      await api.answer.create(props);
      setAnswerText('');
    }
  }, [answerText, currentQuestion]);

  const $voteAnswer = useCallback(async (): Promise<void> => {
    if (selectedAnswer) {
      const props = {
        answer: { id: selectedAnswer },
      };

      await api.like.toggle(props);

      const action = setSeletedAnswer(null);
      store.dispatchAll(action);
    }
  }, [selectedAnswer]);

  return (
    <>
      <Helmet>
        <title>feedbax | {eventCode}</title>
      </Helmet>

      <Content ref={questionsWrapperRef}>
        <Header>
          <LogoutButton onClick={$logout} />
          <ShareButton onClick={$share} hide />

          <FBXLogo size={LogoSize.Small} padding="20px 0" />

          <Pagination />
          <Question />
          <AnswerFilter />
        </Header>

        <Answers />

        <FBXFooter $color="accent1" />
      </Content>

      <WriteAnswer>
        <TextArea
          placeholder="Deine Nachricht.."
          value={answerText}
          onChange={$onAnswerTextChange}
          onScrollable={$onScrollableChange}
        />

        <PostAnswerButton
          answerText={answerText}
          isScrollable={isTextScrollable}
          onClick={$postAnswer}
        />
      </WriteAnswer>

      <VoteAnswer>
        <VoteButton onClick={$voteAnswer}>
          Bestätigen
        </VoteButton>
      </VoteAnswer>
    </>
  );
};

export default React.memo(Event);
