import React, { useContext, ReactNode } from 'react';

import media from 'lib/media-queries';
import styled, { FlattenInterpolation } from 'styled-components';
import { fontFamily, color, ThemeProps } from 'assets/theme';

import { LogoProps, LogoSize } from './Logo';

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

  ${(props): FlattenInterpolation<ThemeProps> => mq`
    font-size: ${props.apperance.fontSize}px;
  `}
`;

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
