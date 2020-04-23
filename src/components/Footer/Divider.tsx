import React, { useContext } from 'react';
import styled from 'styled-components';
import media from 'lib/media-queries';
import { color, Color, ColorFn } from 'assets/theme';
import { FooterProps } from './Footer';

interface StyledProps {
  borderColor: Color;
}

const mq = media('xs', 'sm', 'md');
const StyledDivider = styled.div<StyledProps>`
  width: 100%;
  margin-top: 26px;
  margin-bottom: 18px;
  border-bottom: 1px solid;
  border-color: ${({ borderColor }): ColorFn => color(borderColor)};

  ${mq`
    max-width: ${[200, 250, 300]}px;
  `}
`;

const Divider = (): JSX.Element => {
  const { color: borderColor } = useContext(FooterProps);
  return <StyledDivider borderColor={borderColor} />;
};

export default React.memo(Divider);
