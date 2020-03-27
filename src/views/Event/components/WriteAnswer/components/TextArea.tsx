import React, { useRef, useEffect, useState, useCallback } from 'react';

import { SxStyleProp } from 'rebass';
import { Textarea, TextareaProps } from '@rebass/forms';

import autosize from 'autosize';

import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { useFontLoader } from './hooks';

interface Props extends TextareaProps {
  paddingRight?: number;
  onScrollable: (isScollable: boolean) => void;
}

const styleTextArea: SxStyleProp = {
  backgroundColor: 'accent1',
  fontSize: 1,
  fontFamily: 'secondaryAccent',
  color: 'primary',
  resize: 'none',
  border: 0,
  outline: 0,
  maxHeight: '116px',
  padding: '20px 15px',
  boxSizing: 'border-box',
  '::placeholder': {
    color: 'primary',
    opacity: 0.7,
  },
};

function TextArea(props: Props): JSX.Element {
  const { onChange, onFocus, onBlur, onScrollable, ..._props } = props;
  const { paddingRight = 65, ...propsRest } = _props;

  const textareaRef = useRef<Element>();
  const [isScrollable, setScrollable] = useState(false);
  const isLoading = useFontLoader(['Klinic Slab Book']);

  useEffect(
    function onScrollablechanged() {
      if (textareaRef.current && isScrollable) {
        disableBodyScroll(textareaRef.current);
      } else if (textareaRef.current) {
        enableBodyScroll(textareaRef.current);
      }

      onScrollable(isScrollable);
    },
    [isScrollable, textareaRef] // eslint-disable-line react-hooks/exhaustive-deps
  );

  useEffect(
    function onFontLoadingChanged() {
      if (!isLoading && textareaRef.current) {
        autosize(textareaRef.current);
      }
    },
    [isLoading, textareaRef]
  );

  useEffect(
    () =>
      function unmount(): void {
        if (textareaRef.current) {
          enableBodyScroll(textareaRef.current);
        }
      },
    []
  );

  const _sx: SxStyleProp = {
    ...styleTextArea,
    paddingRight: `${paddingRight}px`,
  };

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
    [isScrollable, onChange]
  );

  const _onFocus = useCallback(
    (e: React.FocusEvent<HTMLTextAreaElement>): void => {
      if (onFocus) {
        onFocus(e);
      }

      if (textareaRef.current) {
        disableBodyScroll(textareaRef.current);
      }
    },
    [onFocus]
  );

  const _onBlur = useCallback(
    (e: React.FocusEvent<HTMLTextAreaElement>): void => {
      if (onBlur) {
        onBlur(e);
      }

      if (textareaRef.current) {
        enableBodyScroll(textareaRef.current);
      }
    },
    [onBlur]
  );

  return (
    <Textarea
      {...propsRest}
      ref={textareaRef}
      sx={_sx}
      onFocus={_onFocus}
      onBlur={_onBlur}
      onChange={_onChange}
    />
  );
}

export default TextArea;
