import React from 'react';

import Loading from 'components/Loading';

import bgProtrait from 'assets/images/background_vertical.jpg';
import bgLandscape from 'assets/images/background_horizontal.jpg';

import type { MotionProps } from 'framer-motion';

export const backgrounds = {
  bgLandscape,
  bgProtrait,
};

export const motionProps: MotionProps = {
  style: { position: 'absolute', width: '100%', height: '100%' },
  initial: { opacity: 0, zIndex: 0 },
  animate: { zIndex: 0, opacity: 1 },
  exit: { zIndex: 1, opacity: 0 },
  transition: { duration: 0.5 },
};

export const fallback = (
  <Loading {...backgrounds} />
);
