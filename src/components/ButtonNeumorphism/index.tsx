import React from 'react';

import { StyledButton, StyledButtonIcon } from './components';
import type { Props } from './types';

function Button(props: Props): JSX.Element {
  const { apperance, icon, ...$props1 } = props;
  const { size = 20, disabled = false, ...$props2 } = $props1;

  return (
    <StyledButton apperance={apperance} size={size} disabled={disabled} {...$props2}>
      <StyledButtonIcon size={size} className={`feedbax-icon icon-${icon}`} />
    </StyledButton>
  );
}

export default React.memo(Button);

export * from './components';
export * from './styles';
export * from './types';
