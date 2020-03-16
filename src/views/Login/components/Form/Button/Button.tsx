import React from 'react';
import { Button as RebassButton, ButtonProps } from 'rebass';
import { AnimatePresence } from 'framer-motion';

import MotionLabel from './components/MotionLabel';
import MotionDots from './components/MotionDots';

interface Props extends ButtonProps {
  children: string;
  loading?: boolean;
  height?: number | number[] | string;
}

const buttonStyles = {
  cursor: 'pointer',
  fontSize: [2, 3, 4],
  fontWeight: 'bold',
  fontFamily: 'secondary',
  color: 'primary',
  bg: 'accent1',
  borderRadius: '0',
  width: '100%',
  textAlign: 'left',
  px: [28, 32, 36],
  py: [12, 16, 20]
};

const Button = ({
  height = 'auto',
  loading = false,
  children: label,
  ...props
}: Props): JSX.Element => (
  <RebassButton {...props} sx={{ ...buttonStyles, height }}>
    <AnimatePresence exitBeforeEnter initial={false}>
      {loading && <MotionDots />}
      {!loading && <MotionLabel label={label} />}
    </AnimatePresence>
  </RebassButton>
);

export default Button;
