import React, { useContext } from 'react';

import { LogoProps, LogoSize } from '../Logo';
import { StyledText } from './styled';

import type { Props, StyledPropsApperance } from './types';

const Title = ({ children }: Props): JSX.Element => {
  const { size } = useContext(LogoProps);

  let titleStyle: StyledPropsApperance = {
    fontSize: [0],
  };

  // eslint-disable-next-line default-case
  switch (size) {
    case LogoSize.Small: {
      titleStyle = {
        fontSize: [14, 16, 18],
      };

      break;
    }

    case LogoSize.Regular: {
      titleStyle = {
        fontSize: [18, 22, 26],
      };

      break;
    }
  }

  return <StyledText apperance={titleStyle}>{children}</StyledText>;
};

export default React.memo(Title);
