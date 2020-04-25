import React from 'react';

import styled from 'styled-components';
import { fontFamily } from 'assets/theme';

type StyledProps = {
  questionHeight: number;
};

const StyledWrapper = styled.div<StyledProps>`
  width: 100%;
  overflow: hidden;
  background-size: cover;
  background-position: center;
  font-family: ${fontFamily('secondary')};
  cursor: pointer;
  user-select: none;
  position: relative;

  flex: 0 0 ${(props): number => props.questionHeight}px;
`;

export default React.memo(StyledWrapper);
