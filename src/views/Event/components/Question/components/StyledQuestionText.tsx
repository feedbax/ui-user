import React from 'react';

import styled from 'styled-components';
import media from 'lib/media-queries';

const mq = media('xs', 'sm', 'md');
const StyledQuestionText = styled.div`
  flex: 0 1 auto;

  ${mq`
    font-size: ${[18, 22, 25]}px;
    line-height: ${[21, 25, 28]}px;    
  `}
`;

export default React.memo(StyledQuestionText);
