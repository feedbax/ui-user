import React, { useContext, ReactNode } from 'react';
import { Text, SxStyleProp } from 'rebass';
import { LogoProps } from './Logo';
import { LogoSize } from '.';

interface Props {
  children: ReactNode;
}

const Description = ({ children }: Props): JSX.Element => {
  const { size } = useContext(LogoProps);

  let descriptionStyle: SxStyleProp = {
    fontFamily: 'secondary',
    color: 'primary',
  };

  // eslint-disable-next-line default-case
  switch (size) {
    case LogoSize.Small: {
      descriptionStyle = {
        ...descriptionStyle,
        fontSize: ['10px', '12px', '14px'],
      };

      break;
    }

    case LogoSize.Regular: {
      descriptionStyle = {
        ...descriptionStyle,
        fontSize: [0, 1, 2],
      };

      break;
    }
  }

  return <Text sx={descriptionStyle}>{children}</Text>;
};

export default React.memo(Description);
