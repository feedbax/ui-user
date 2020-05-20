import React, { useCallback } from 'react';

import { useSelector } from 'react-redux';
import { useSpring } from 'react-spring';
import { useHasLiked } from '../../hooks';
import { replaceEmojis } from 'lib/helper';

import store from 'store';
import { questionLikesSelector, selectedAnswerSelector } from 'store/selectors';
import { setSeletedAnswer } from 'store/actions';

import Button from 'components/ButtonNeumorphism';

import easing from './easing';

import { AnswerStyled, AnswerText, AnswerLike } from './styled';
import { Percentage, PercentageBar } from './styled';

import type { Props } from './types';

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

      <AnswerText ref={replaceEmojis} hasLiked={hasLikedQuestion}>
        {answer.text}
      </AnswerText>

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
