import styled from 'styled-components';
import { textStyles } from './styles';

import type { StyledProps } from './types';

export const StyledText = styled.div<StyledProps>`
  ${textStyles}
`;
