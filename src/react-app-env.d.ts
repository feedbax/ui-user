// eslint-disable-next-line spaced-comment
/// <reference types="react-scripts" />

declare module 'scroll-lock' {
  type Elements = HTMLElement | HTMLElement[] | NodeList;

  export function disablePageScroll(scrollableTarget?: Elements): void;
  export function enablePageScroll(scrollableTarget?: Elements): void;
  export function getPageScrollBarWidth(onlyExists?: boolean): number;
}
