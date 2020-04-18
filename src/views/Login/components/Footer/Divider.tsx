import React from 'react';
import styled from 'styled-components';
import media from 'lib/media-queries';
import { color } from 'assets/theme';

const mq = media('xs', 'sm', 'md');
const StyledDivider = styled.div`
  width: 100%;
  margin-top: 26px;
  margin-bottom: 18px;
  border-bottom: 1px solid;
  border-color: ${color('primary')};

  ${mq`
    max-width: ${[200, 250, 300]}px;
  `}
`;

const Divider = (): JSX.Element => <StyledDivider />;

export default React.memo(Divider);
