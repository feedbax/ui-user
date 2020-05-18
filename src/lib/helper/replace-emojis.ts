import twemoji from 'twemoji';

export const replaceEmojis = <T extends HTMLElement>(el: T | null): void => {
  if (el) {
    twemoji.parse(el);
  }
};
