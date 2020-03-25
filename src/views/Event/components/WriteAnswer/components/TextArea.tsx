import React, { useRef, useEffect } from 'react';

import { SxStyleProp } from 'rebass';
import { Textarea, TextareaProps } from '@rebass/forms';

import autosize from 'autosize';

import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import getScrollBarWidth from 'lib/get-scrollbar-width';

import { useIsScrollable, useFontLoader } from './hooks';

interface Props extends TextareaProps {
  paddingRight?: number;
  onScrollable: (isScollable: boolean) => void;
}

const scrollBarWidth = getScrollBarWidth();
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
  const { onFocus, onBlur, onScrollable, ..._props } = props;
  const { paddingRight = 65, ...propsRest } = _props;

  const textareaRef = useRef<Element>();
  const isScrollable = useIsScrollable(textareaRef);
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
    paddingRight: `${paddingRight + (isScrollable ? scrollBarWidth : 0)}px`,
  };

  const _onFocus = (e: React.FocusEvent<HTMLTextAreaElement>): void => {
    if (onFocus) {
      onFocus(e);
    }

    if (textareaRef.current) {
      disableBodyScroll(textareaRef.current);
    }
  };

  const _onBlur = (e: React.FocusEvent<HTMLTextAreaElement>): void => {
    if (onBlur) {
      onBlur(e);
    }

    if (textareaRef.current) {
      enableBodyScroll(textareaRef.current);
    }
  };

  return <Textarea {...propsRest} ref={textareaRef} sx={_sx} onFocus={_onFocus} onBlur={_onBlur} />;
}

export default React.memo(TextArea);
