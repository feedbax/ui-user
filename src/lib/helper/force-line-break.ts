export const forceLineBreak = <T extends HTMLElement>(el: T | null): void => {
  if (el) {
    const lineHeightString = window.getComputedStyle(el).lineHeight;
    const lineHeight = parseInt(lineHeightString, 10);

    if (el.clientHeight <= lineHeight + 1) {
      // eslint-disable-next-line no-param-reassign
      el.style.maxWidth = `${0.8 * el.clientWidth}px`;
    }
  }
};