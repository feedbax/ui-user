import React from 'react';

import styled from 'styled-components';
import { animated } from 'react-spring';

import { answerStyle, answerTextStyle, answerLikeStyle } from './styles';
import { percentageStyle, percentageBarStyle } from './styles';

import type { AnswerTextProps, PercentageProps } from './types';

export const AnswerStyled = styled.div`
  ${answerStyle}
`;

export const AnswerText = styled.div<AnswerTextProps>`
  ${answerTextStyle}
`;

export const AnswerLike = styled.div`
  ${answerLikeStyle}
`;

const PercentageAnimated = ({ percent, className }: PercentageProps): JSX.Element => (
  <animated.div className={className}>
    {percent.interpolate((p) => `${p.toFixed(1)}%`)}
  </animated.div>
);

export const Percentage = styled(PercentageAnimated)`
  ${percentageStyle}
`;

const PercentageBarAnimated = ({ percent, className }: PercentageProps): JSX.Element => (
  <div className={className}>
    <animated.div
      className="bar"
      style={{ transform: percent.interpolate((p) => `translateX(${-100 + p}%)`) }}
    />
  </div>
);

export const PercentageBar = styled(PercentageBarAnimated)`
  ${percentageBarStyle}
`;
