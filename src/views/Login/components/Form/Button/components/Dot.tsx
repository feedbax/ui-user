import React from 'react';
import styled, { keyframes } from 'styled-components';
import media from 'lib/media-queries';

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
const mq = media('xs', 'sm', 'md');

const Dot = styled.div`
  animation: ${scale} 1s infinite ${delayProp};
  display: inline-block;
  background: #fff;
  margin: 0 5px;
  border-radius: 50%;
  transform: scale(0.7);

  ${mq`
    height: ${[8, 10, 12]}px;
    width: ${[8, 10, 12]}px;
  `}
`;

export default React.memo(Dot);
