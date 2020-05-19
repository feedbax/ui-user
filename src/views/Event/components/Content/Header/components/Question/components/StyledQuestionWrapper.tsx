import React from 'react';
import styled from 'styled-components';

import { PointerType } from 'store/types';

type StyledProps = {
  pointerType: PointerType;
};

const StyledQuestionWrapper = styled.div<StyledProps>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  transition: padding 0.3s ease;
  position: relative;

  ${({ pointerType }): string => `
    ${pointerType === PointerType.MOUSE ? 'padding: 0 20px;' : ''}
  `}
`;

export default React.memo(StyledQuestionWrapper);
