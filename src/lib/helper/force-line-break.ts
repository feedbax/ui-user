export const forceLineBreak = <T extends HTMLElement>(el: T | null): void => {
  if (el) {
    const lineHeightString = window.getComputedStyle(el).lineHeight;
    const lineHeight = parseInt(lineHeightString, 10);
    const isOnlyOneLine = el.clientHeight <= lineHeight + 1;

    if (isOnlyOneLine) {
      // eslint-disable-next-line no-param-reassign
      el.style.maxWidth = `${0.8 * el.clientWidth}px`;

      const hasWhitespace = el.innerText.includes(' ');

      if (hasWhitespace) {
        const text = el.innerText.trim().split(' ');
        const last = text.pop();

        // eslint-disable-next-line no-param-reassign
        el.innerText = `${text.join(' ')}\n${last}`;
      }
    }
  }
};
