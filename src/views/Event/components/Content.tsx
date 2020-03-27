import React, { Ref, ReactNode } from 'react';
import { SxStyleProp, Box, BoxProps } from 'rebass';

interface Props extends BoxProps {
  children: ReactNode;
}

const styleContent: SxStyleProp = {
  flex: '1 1 100%',
  overflowY: 'auto',
  position: 'relative',
};

const Content = ({ children, ...props }: Props, ref: Ref<Element>): JSX.Element => (
  <Box {...props} ref={ref} sx={styleContent}>
    {children}
  </Box>
);

export default React.forwardRef(Content);
