import React from 'react';

import { StyledContent, StyledWrapper } from './styled';
import type { Props } from './types';

const Container = (props: Props): JSX.Element => {
  const { bgProtrait, bgLandscape } = props;
  const { children, styles } = props;

  return (
    <StyledWrapper
      bgProtrait={bgProtrait}
      bgLandscape={bgLandscape}
      styles={styles?.wrapper}
      data-scroll-lock-scrollable
    >
      <StyledContent styles={styles?.content}>{children}</StyledContent>
    </StyledWrapper>
  );
};

export default React.memo(Container);
