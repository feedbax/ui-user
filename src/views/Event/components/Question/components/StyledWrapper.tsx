import React from 'react';

import styled from 'styled-components';
import { fontFamily, color } from 'assets/theme';

type StyledProps = {
  questionHeight: number;
};

const StyledWrapper = styled.div<StyledProps>`
  width: 100%;
  overflow: hidden;
  background-size: cover;
  background-position: center;
  cursor: pointer;
  user-select: none;
  position: relative;

  font-family: ${fontFamily('secondary')};
  color: ${color('accent1')};

  flex: 0 0 ${(props): number => props.questionHeight}px;
`;

export default React.memo(StyledWrapper);
