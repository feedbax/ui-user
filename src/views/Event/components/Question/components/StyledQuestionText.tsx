import React from 'react';

import styled from 'styled-components';
import media from 'lib/media-queries';

import { useEmojis } from 'lib/hooks';

interface Props {
  ref: typeof useEmojis;
}

const mq = media('xs', 'sm', 'md');
const StyledQuestionText = styled.div<Props>`
  flex: 0 1 auto;

  display: flex;
  align-items: center;
  flex-wrap: wrap;

  ${mq`
    font-size: ${[18, 22, 25]}px;
    line-height: ${[21, 25, 28]}px;    
  `}

  & img.emoji {
    display: inline-block;
    margin: 0 2px;

    ${mq`
      width: ${[22, 26, 29]}px;
      height: ${[22, 26, 29]}px;
    `}
  }
`;

export default React.memo(StyledQuestionText);
