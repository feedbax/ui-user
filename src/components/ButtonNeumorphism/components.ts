import styled from 'styled-components';

import { buttonStyles, buttonIconStyles } from './styles';
import type { StyledProps } from './types';

export const StyledButtonIcon = styled.div<StyledProps>`
  ${buttonIconStyles}
`;

export const StyledButton = styled.button<StyledProps>`
  ${buttonStyles}

  &:disabled ${StyledButtonIcon} {
    opacity: 0.5;
  }
`;
