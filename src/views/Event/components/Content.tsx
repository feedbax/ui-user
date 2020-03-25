import React, { Ref, ReactNode } from 'react';
import { SxStyleProp, Box } from 'rebass';

interface Props {
  children: ReactNode;
}

const styleContent: SxStyleProp = {
  flex: '1 1 100%',
  overflowY: 'scroll',
};

const Content = ({ children }: Props, ref: Ref<Element>): JSX.Element => (
  <Box ref={ref} sx={styleContent}>
    {children}
  </Box>
);

export default React.memo(React.forwardRef(Content));
