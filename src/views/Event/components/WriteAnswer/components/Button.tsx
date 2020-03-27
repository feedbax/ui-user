import React from 'react';
import { SxStyleProp, Button as RebassButton, ButtonProps } from 'rebass';

interface Props extends ButtonProps {
  icon?: string;
  size?: number;
}

const styleButton: SxStyleProp = {
  padding: '0',
  position: 'absolute',
  right: '15px',
  top: '50%',
  flex: '0 0 auto',
  width: '35px',
  height: '35px',
  border: 0,
  outline: 0,
  borderRadius: '50%',
  transition: 'transform .3s ease',
  cursor: 'pointer',
  fontSize: '16px',
};

function Button({ sx, size = 20, disabled = false, icon, ...props }: Props): JSX.Element {
  const shadowXY = Math.round(size * 0.1);
  const shadowBlur = Math.round(size * 0.2);
  const fontSize = Math.round(size * 0.45);

  const _sx: SxStyleProp = {
    ...styleButton,
    ...sx,
    fontSize: `${fontSize}px`,
    width: size,
    height: size,
    boxShadow: `${shadowXY}px ${shadowXY}px ${shadowBlur}px rgba(0, 0, 0, 0.1), 
                -${shadowXY}px -${shadowXY}px ${shadowBlur}px rgba(255, 255, 255, 0.1)`,
  };

  return (
    <RebassButton disabled={disabled} className={`feedbax-icon icon-${icon}`} {...props} sx={_sx} />
  );
}

export default React.memo(Button);
