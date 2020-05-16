import React, { ReactNode } from 'react';

import styled, { FlattenInterpolation } from 'styled-components';
import media from 'lib/media-queries';
import { ThemeProps } from 'assets/theme';
import { Link } from 'react-router-dom';

export enum LogoSize {
  Small,
  Regular,
}

interface Props extends StyledProps {
  children?: ReactNode;
  size?: LogoSize;
  link?: string;
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

interface CustomLinkProps {
  className?: string;
  children: ReactNode;
  to: string;
}

const CustomLink = ({ className, children, to }: CustomLinkProps): JSX.Element => (
  <Link className={className} to={to}>
    {children}
  </Link>
);

const StyledLink = styled(CustomLink)<CustomLinkProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: inherit;
  text-decoration: none;
`;

const Logo = (props: Props): JSX.Element => {
  const { children, ...$props1 } = props;
  const { link, size = LogoSize.Regular, ...$props2 } = $props1;

  return (
    <StyledContainer {...$props2}>
      <LogoProps.Provider value={{ size }}>
        {link ? <StyledLink to={link}>{children}</StyledLink> : children}
      </LogoProps.Provider>
    </StyledContainer>
  );
};

export default Logo;
