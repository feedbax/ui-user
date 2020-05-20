import React from 'react';
import Answer from '../factory/vote';

const PlaceholderLoading = new Array(3).fill(null).map((_, i) => (
  <Answer key={i} className="placeholder--loading">
    {'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod'
      .split(' ')
      .sort(() => Math.random() - 0.5)
      .map((word, j) => (
        <span key={j} className="word">
          {word}
        </span>
      ))}
  </Answer>
));

export default PlaceholderLoading;
