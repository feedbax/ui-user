import React, { useContext } from 'react';
import { StyledText } from './styled';
import { LogoProps, LogoSize } from '../Logo';

import type { Props, StyledPropsApperance } from './types';

const Description = ({ children }: Props): JSX.Element => {
  const { size } = useContext(LogoProps);

  let descriptionStyle: StyledPropsApperance = {
    fontSize: [0],
  };

  // eslint-disable-next-line default-case
  switch (size) {
    case LogoSize.Small: {
      descriptionStyle = {
        fontSize: [10, 12, 14],
      };

      break;
    }

    case LogoSize.Regular: {
      descriptionStyle = {
        fontSize: [14, 16, 18],
      };

      break;
    }
  }

  return <StyledText apperance={descriptionStyle}>{children}</StyledText>;
};

export default React.memo(Description);
