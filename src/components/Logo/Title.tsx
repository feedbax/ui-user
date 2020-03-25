import React, { useContext, ReactNode } from 'react';
import { Text, SxStyleProp } from 'rebass';

import { LogoProps, LogoSize } from './Logo';

interface Props {
  children: ReactNode;
}

const Title = ({ children }: Props): JSX.Element => {
  const { size } = useContext(LogoProps);

  let titleStyle: SxStyleProp = {
    fontFamily: 'secondary',
    fontWeight: 'bold',
    color: 'primary',
  };

  // eslint-disable-next-line default-case
  switch (size) {
    case LogoSize.Small: {
      titleStyle = {
        ...titleStyle,
        fontSize: [0, 1, 2],
      };

      break;
    }

    case LogoSize.Regular: {
      titleStyle = {
        ...titleStyle,
        fontSize: [2, 3, 4],
      };

      break;
    }
  }

  return <Text sx={titleStyle}>{children}</Text>;
};

export default React.memo(Title);
