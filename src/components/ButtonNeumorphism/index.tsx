import React from 'react';

import { StyledButton, StyledButtonIcon } from './styled';
import type { Props } from './types';

function Button(props: Props): JSX.Element {
  const { apperance, icon, hide = false, ...$props1 } = props;
  const { size = 20, disabled = false, ...$props2 } = $props1;

  if (hide) {
    return <React.Fragment />;
  }

  return (
    <StyledButton apperance={apperance} size={size} disabled={disabled} {...$props2}>
      <StyledButtonIcon size={size} className={`feedbax-icon icon-${icon}`} />
    </StyledButton>
  );
}

export default React.memo(Button);

export * from './styled';
export * from './styles';
export * from './types';
