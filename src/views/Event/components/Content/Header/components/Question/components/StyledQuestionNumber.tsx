import React from 'react';

import styled from 'styled-components';
import { fontFamily, color } from 'assets/styles/theme';
import media from 'assets/styles/media-queries';

const mq = media('xs', 'sm', 'md');
const StyledQuestionNumber = styled.div`
  flex: 0 0 auto;
  position: relative;
  margin-right: 15px;

  font-family: ${fontFamily('primary')};
  font-weight: 700;

  border-bottom-color: ${color('accent1')};
  border-bottom-style: solid;

  ${mq`
    font-size: ${[32, 40, 46]}px;
    line-height: ${[21, 25, 28]}px;
    padding-bottom: ${[5.5, 7.5, 9]}px;
    border-bottom-width: ${[3, 3, 4]}px;
  `}
`;

export default React.memo(StyledQuestionNumber);
