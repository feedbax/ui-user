import React from 'react';
import { SxStyleProp, Button as RebassButton, ButtonProps } from 'rebass';

interface Props extends ButtonProps {
  icon?: string;
}

const styleButton: SxStyleProp = {
  padding: '0',
  position: 'absolute',
  right: '10px',
  top: '50%',
  flex: '0 0 auto',
  width: '45px',
  height: '45px',
  backgroundColor: 'transparent',
  border: 0,
  outline: 0,
  borderRadius: '50%',
  background: '#3a556a',
  boxShadow: `inset -4px -4px 7px #31485a, 
              inset 4px 4px 7px #43627a`,
  transition: 'transform .3s ease',
  cursor: 'pointer',
};

function Button({ sx, disabled = false, icon, ...props }: Props): JSX.Element {
  const _props: Props & { 'data-glyph'?: string } = {
    ...props,
  };

  if (icon) {
    _props['data-glyph'] = icon;
  }

  const _sx: SxStyleProp = {
    ...styleButton,
    ...sx,
  };

  return <RebassButton disabled={disabled} {...props} className="steps-icon" sx={_sx} />;
}

export default React.memo(Button);
