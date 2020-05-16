import styled from 'styled-components';
import { buttonStyles, buttonIconStyles } from './styles';

export const StyledButtonIcon = styled.div`
  ${buttonIconStyles}
`;

export const StyledButton = styled.button`
  ${buttonStyles}

  &:disabled ${StyledButtonIcon} {
    opacity: 0.5;
  }
`;
