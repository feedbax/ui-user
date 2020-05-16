import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { linkStyles, containerStyles } from './styles';

import type { CustomLinkProps } from './types';

export const StyledContainer = styled.div`
  ${containerStyles}
`;

const CustomLink = ({ className, children, to }: CustomLinkProps): JSX.Element => (
  <Link className={className} to={to}>
    {children}
  </Link>
);

export const StyledLink = styled(CustomLink)`
  ${linkStyles}
`;
