import React from 'react';
import { Box, BoxProps } from 'rebass';

const Divider = (props: BoxProps): JSX.Element => (
  <Box
    {...props}
    mt={[4]}
    mb={[2]}
    width="100%"
    maxWidth={[200, 250, 300]}
    sx={{ borderBottom: '1px solid', borderColor: 'primary' }}
  />
);

export default Divider;
