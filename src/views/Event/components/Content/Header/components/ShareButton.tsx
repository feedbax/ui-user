import React from 'react';
import Button from 'components/ButtonNeumorphism';

import type { Props } from 'components/ButtonNeumorphism';

const ShareButton = (
  (props: Partial<Props>): JSX.Element => (
    <Button
      {...props}

      icon="share"
      size={28}
      apperance={{
        backgroundColor: 'accent2',
        position: 'absolute',
        right: 0,
        top: 0,
        padding: 20,
      }}
    />
  )
);

export default React.memo(ShareButton);
