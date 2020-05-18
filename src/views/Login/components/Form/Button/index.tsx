import React from 'react';
import { AnimatePresence } from 'framer-motion';

import MotionLabel from './components/MotionLabel';
import MotionDots from './components/MotionDots';

import { StyledButton } from './styled';

import type { Props } from './types';


const Button = (
  ({ loading = false, children: label, ...props }: Props): JSX.Element => (
    <StyledButton {...props}>
      <AnimatePresence exitBeforeEnter initial={false}>
        {loading && <MotionDots />}
        {!loading && <MotionLabel label={label} />}
      </AnimatePresence>
    </StyledButton>
  )
);

export default React.memo(Button);
