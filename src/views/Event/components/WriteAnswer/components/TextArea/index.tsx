import React, { useRef, useEffect, useState, useCallback } from 'react';
import autosize from 'autosize';
import { useFontLoader } from './hooks';
import { StyledTextArea } from './styled';

import type { Props } from './types';

function TextArea(props: Props): JSX.Element {
  const { onChange, onScrollable, ...$props1 } = props;
  const { rows = 1, maxLength = 500, ...$props2 } = $props1;

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [isScrollable, setScrollable] = useState(false);
  const isLoading = useFontLoader(['Klinic Slab Book']);

  useEffect(
    () => {
      onScrollable(isScrollable);
    },
    [isScrollable, onScrollable],
  );

  useEffect(
    () => {
      if (!isLoading && textareaRef.current) {
        autosize(textareaRef.current);
      }
    },
    [isLoading, textareaRef],
  );

  useEffect(
    () => {
      if (textareaRef.current) {
        autosize.update(textareaRef.current);
      }
    },
    [props.value],
  );

  const _onChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
      if (onChange) {
        onChange(e);
      }

      const scrollHeight = textareaRef.current?.scrollHeight || 0;
      const clientHeight = textareaRef.current?.clientHeight || 0;
      const _isScrollable = scrollHeight > clientHeight;

      if (isScrollable !== _isScrollable) {
        setScrollable(_isScrollable);
      }
    },
    [isScrollable, onChange],
  );

  return (
    <StyledTextArea
      {...$props2}

      rows={rows}
      maxLength={maxLength}

      ref={textareaRef}
      onChange={_onChange}
      data-scroll-lock-scrollable
    />
  );
}

export default TextArea;
