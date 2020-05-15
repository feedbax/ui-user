import styled from 'styled-components';
import { contentStyles, wrapperStyles } from './styles';

import type { StyledProps, Styles } from './types';

export const StyledWrapper = styled.div<StyledProps & Styles>`
  ${wrapperStyles}
`;

export const StyledContent = styled.div<Styles>`
  ${contentStyles}
`;
