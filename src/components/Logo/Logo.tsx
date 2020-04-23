import React, { ReactNode } from 'react';

import styled, { FlattenInterpolation } from 'styled-components';
import media from 'lib/media-queries';
import { ThemeProps } from 'assets/theme';

export enum LogoSize {
  Small,
  Regular,
}

interface Props extends StyledProps {
  children?: ReactNode;
  size?: LogoSize;
}

const parentProps: Props = { size: LogoSize.Regular };
export const LogoProps = React.createContext(parentProps);

const mq = media('xs', 'sm', 'md');

interface StyledProps {
  padding?: number | number[] | string | string[];
  margin?: number | number[] | string | string[];
}

const typeSuffix = (arg: number | string): string => {
  if (typeof arg === 'string') return '';
  if (typeof arg === 'number') return 'px';

  return '';
};

const autoSuffix = (arg: number | number[] | string | string[]): string => {
  if (Array.isArray(arg)) {
    return typeSuffix(arg[0]);
  }

  return typeSuffix(arg);
};

const StyledContainer = styled.div<StyledProps>`
  flex: 0 0 auto;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  ${(props: StyledProps): FlattenInterpolation<ThemeProps> => mq`
    margin: ${props.margin || 0}${autoSuffix(props.margin || 0)};
    padding: ${props.padding || 0}${autoSuffix(props.padding || 0)};
  `}
`;

const Logo = ({ children, size = LogoSize.Regular, ...rest }: Props): JSX.Element => (
  <StyledContainer {...rest}>
    <LogoProps.Provider value={{ size }}>{children}</LogoProps.Provider>
  </StyledContainer>
);

export default Logo;
