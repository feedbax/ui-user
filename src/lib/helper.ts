export const getScrollbarWidth = (): number => {
  const inner = document.createElement('div');
  inner.style.width = '100%';
  inner.style.height = '150px';

  const outer = document.createElement('div');
  outer.style.position = 'absolute';
  outer.style.visibility = 'hidden';
  outer.style.width = '200px';
  outer.style.height = '150px';
  outer.style.overflow = 'hidden';

  outer.appendChild(inner);
  document.body.appendChild(outer);

  const w1 = inner.offsetWidth;
  outer.style.overflow = 'scroll';
  let w2 = inner.offsetWidth;

  if (w1 === w2) {
    w2 = outer.clientWidth;
  }

  document.body.removeChild(outer);
  return w1 - w2;
};

export const rootElement = document.getElementById('root') as HTMLElement;

export const sleep = (
  (duration: number): Promise<void> => (
    new Promise((resolve) => setTimeout(resolve, duration))
  )
);
