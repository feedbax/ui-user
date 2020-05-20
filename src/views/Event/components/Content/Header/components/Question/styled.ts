import React from 'react';
import styled from 'styled-components';

import {
  wrapperStyle,
  questionNumberStyle,
  questionTextStyle,
  questionWrapperStyle,
} from './styles';

export const QuestionNumber = (
  React.memo(
    styled.div`
      ${questionNumberStyle}
    `,
  )
);

export const QuestionText = (
  React.memo(
    styled.div`
      ${questionTextStyle}
    `,
  )
);

export const QuestionWrapper = (
  React.memo(
    styled.div`
      ${questionWrapperStyle}
    `,
  )
);

export const Wrapper = (
  React.memo(
    styled.div`
      ${wrapperStyle}
    `,
  )
);
