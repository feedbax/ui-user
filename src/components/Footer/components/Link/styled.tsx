import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import styled from 'styled-components';
import { linkStyles } from './styles';

import type { StyledProps } from './types';

const CustomLink = ({ textColor: _, ...props }: StyledProps): JSX.Element => (
  <RouterLink {...props} />
);

export const StyledLink = styled(CustomLink)`
  ${linkStyles}
`;
