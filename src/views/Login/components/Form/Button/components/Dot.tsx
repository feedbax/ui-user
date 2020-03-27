import React from 'react';
import { Box } from 'rebass';
import styled, { keyframes } from 'styled-components';

const scale = keyframes`
  0% {
    transform: scale(0.7);
  }
 
  50% {
    transform: scale(1);
  }

  100% {
    transform: scale(0.7);
  }
`;

const delayProp = ({ delay }: { delay: string }): string => delay;

const Dot = styled(Box)`
  animation: ${scale} 1s infinite ${delayProp};
`;

export default React.memo(Dot);
