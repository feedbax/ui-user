import React from 'react';
import { Link as RebassLink, LinkProps } from 'rebass';
import { Link as RouterLink } from 'react-router-dom';

interface Props extends LinkProps {
  to: string;
}

const Link = ({ children, ...props }: Props): JSX.Element => (
  <RebassLink
    {...props}
    as={RouterLink}
    sx={{
      fontFamily: 'secondaryAccent',
      fontSize: 1,
      color: 'primary',
    }}
  >
    {children}
  </RebassLink>
);

export default React.memo(Link);
