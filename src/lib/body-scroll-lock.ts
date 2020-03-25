import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

export const disableBodyScrolls = (elements: (HTMLElement | Element)[]): void => {
  for (let i = 0; i < elements.length; i += 1) {
    const element = elements[i];
    disableBodyScroll(element);
  }
};

export const enableBodyScrolls = (elements: (HTMLElement | Element)[]): void => {
  for (let i = 0; i < elements.length; i += 1) {
    const element = elements[i];
    enableBodyScroll(element);
  }
};
