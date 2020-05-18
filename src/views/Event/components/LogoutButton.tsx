import React from 'react';
import Button from 'components/ButtonNeumorphism';

import type { Props } from 'components/ButtonNeumorphism';

const LogoutButton = (
  (props: Partial<Props>): JSX.Element => (
    <Button
      {...props}

      icon="log-out"
      size={28}
      apperance={{
        backgroundColor: 'accent2',
        position: 'absolute',
        left: 0,
        top: 0,
        padding: 20,
      }}
    />
  )
);

export default LogoutButton;
