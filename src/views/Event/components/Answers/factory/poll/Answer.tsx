import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';

import styled from 'styled-components';
import media from 'lib/media-queries';
import { color, fontFamily } from 'assets/theme';

import store from 'store';
import { questionLikesSelector, selectedAnswerSelector } from 'store/selectors';

import api from 'lib/api';
import { setSeletedAnswer } from 'store/actions';

import Button from 'components/ButtonNeumorphism';

import { useSpring, animated, OpaqueInterpolation } from 'react-spring';
import easing from './easing';

type AnswerState = import('@feedbax/api/store/answers/types').AnswerState;

interface Props {
  className?: string;
  children: AnswerState;
}

const mq = media('xs', 'sm', 'md');
const AnswerStyled = styled.div`
  margin: 0 15px;
  padding: 20px 15px;
  box-sizing: border-box;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  z-index: 1;
  position: relative;
  background-color: ${color('primary')};
  font-family: ${fontFamily('secondaryAccent')};

  display: flex;
  cursor: pointer;

  &:not(:last-of-type)::after {
    content: '';
    position: absolute;
    left: 15px;
    bottom: 0;
    width: -webkit-calc(100% - 30px);
    width: -moz-calc(100% - 30px);
    width: calc(100% - 30px);
    height: 1px;
    background-color: #3a556a;
  }

  ${mq`
    font-size: ${[14, 15, 16]}px;
  `}
`;

function useHasLiked(answerLikes: string[]): boolean {
  const { api: apiStore } = store.getState();
  const { likes } = apiStore;

  for (let i = 0; i < answerLikes.length; i += 1) {
    const answerLike = answerLikes[i];
    const like = likes[answerLike];

    if (like && like.author === api.uuid) {
      return true;
    }
  }

  return false;
}

interface AnswerTextProps {
  hasLiked: boolean;
}

const AnswerText = styled.div<AnswerTextProps>`
  flex: 1 1 auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  transition: transform 0.3s ease;
  white-space: break-spaces;

  ${({ hasLiked }): string => `
    transform: translateY(${hasLiked ? 5 : 0}px);
  `}
`;

const AnswerLike = styled.div`
  flex: 0 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  flex-wrap: nowrap;
  padding-left: 8px;
  position: relative;
  min-height: 28px;
`;

interface PercentageProps {
  percent: OpaqueInterpolation<number>;
  className?: string;
  hasLiked: boolean;
}

const PercentageAnimated = ({ percent, className }: PercentageProps): JSX.Element => (
  <animated.div className={className}>
    {percent.interpolate((p) => `${p.toFixed(1)}%`)}
  </animated.div>
);

const Percentage = styled(PercentageAnimated)<PercentageProps>`
  font-size: 22px;
  color: ${({ hasLiked }): any => color(hasLiked ? 'accent2' : 'accent1')};
  font-weight: ${({ hasLiked }): any => (hasLiked ? 'bold' : 'normal')};
`;

const PercentageBarAnimated = ({ percent, className }: PercentageProps): JSX.Element => (
  <div className={className}>
    <animated.div
      className="bar"
      style={{ transform: percent.interpolate((p) => `translateX(${-100 + p}%)`) }}
    />
  </div>
);

const PercentageBar = styled(PercentageBarAnimated)<PercentageProps>`
  position: absolute;
  top: 15px;
  left: 15px;
  right: 15px;
  height: 5px;
  box-sizing: border-box;
  overflow: hidden;
  z-index: 0;

  & .bar {
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: ${({ hasLiked }): any => color(hasLiked ? 'accent2' : 'accent1')};
  }
`;

const Answer = ({ children: answer, className }: Props): JSX.Element => {
  const selectedAnswer = useSelector(selectedAnswerSelector);
  const likesQuestion = useSelector(questionLikesSelector);

  const __percent = (answer.likes.length / likesQuestion.length) * 100;

  const hasLikedQuestion = useHasLiked(likesQuestion);
  const hasLikedAnswer = useHasLiked(answer.likes);

  const isSelected = selectedAnswer === answer.id;

  const { percent } = useSpring({
    percent: hasLikedQuestion ? __percent : 0,
    from: {
      percent: 0,
    },
    config: {
      easing,
      duration: 2000,
    },
  });

  const _selectAnswer = useCallback(() => {
    if (!hasLikedQuestion) {
      const action = setSeletedAnswer(answer.id);
      store.dispatch(action);
    }
  }, [answer.id, hasLikedQuestion]);

  return (
    <AnswerStyled className={className} onClick={_selectAnswer}>
      {hasLikedQuestion ? <PercentageBar hasLiked={hasLikedAnswer} percent={percent} /> : ''}

      <AnswerText hasLiked={hasLikedQuestion}>{answer.text}</AnswerText>
      <AnswerLike>
        {hasLikedQuestion ? (
          <Percentage hasLiked={hasLikedAnswer} percent={percent} />
        ) : (
          <Button
            size={28}
            icon={isSelected ? 'heart-filled' : 'heart'}
            apperance={{
              backgroundColor: 'primary',
              textColor: 'accent1',
            }}
          />
        )}
      </AnswerLike>
    </AnswerStyled>
  );
};

export default React.memo(Answer);
