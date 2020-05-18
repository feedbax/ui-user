// eslint-disable-next-line spaced-comment
/// <reference types="react-scripts" />

declare module '*.md' {
  const src: string;
  export default src;
}

declare module 'scroll-lock' {
  type Elements = HTMLElement | HTMLElement[] | NodeList;

  export function disablePageScroll(scrollableTarget?: Elements): void;
  export function enablePageScroll(scrollableTarget?: Elements): void;
  export function getPageScrollBarWidth(onlyExists?: boolean): number;
}

declare module 'detect-it' {
  type Input = 'mouse' | 'touch';

  interface DetectIt {
    primaryInput: Input;
  }

  const detectIt: DetectIt;
  export default detectIt;
}

declare module 'react-twemoji';
