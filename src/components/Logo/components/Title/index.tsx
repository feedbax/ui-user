import React, { useContext, ReactNode } from 'react';

import media from 'lib/media-queries';
import styled, { FlattenInterpolation } from 'styled-components';
import { fontFamily, color, ThemeProps } from 'assets/theme';

import { LogoProps, LogoSize } from '../Logo';

interface Props {
  children: ReactNode;
}

type StyledPropsApperance = {
  fontSize: number[];
};

interface StyledProps {
  apperance: StyledPropsApperance;
}

const mq = media('xs', 'sm', 'md');

const StyledText = styled.div<StyledProps>`
  font-family: ${fontFamily('secondary')};
  color: ${color('primary')};
  font-weight: bold;

  ${(props): FlattenInterpolation<ThemeProps> => mq`
    font-size: ${props.apperance.fontSize}px;
  `}
`;

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
