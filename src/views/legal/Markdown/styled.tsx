import React from 'react';

import styled from 'styled-components';
import { stylesLoading } from './styles';

import type { LoadingProps } from './types';

function getRandomInt(min: number, max: number): number {
  const $min = Math.ceil(min);
  const $max = Math.floor(max);

  return Math.floor(
    Math.random() * ($max - $min + 1),
  ) + $min;
}

const loadingItems = (
  new Array(8)
    .fill(0)
    .map(
      (_, i) => (
        <div
          key={i}
          style={{
            maxWidth: `${getRandomInt(95, 100)}%`,
            animationDelay: `${i * 10}ms`,
          }}
        />
      ),
    )
);

const $Loading = ({ className }: LoadingProps): JSX.Element => (
  <div className={className}>
    { loadingItems }
  </div>
);

export const Loading = styled($Loading)`
  ${stylesLoading}
`;
