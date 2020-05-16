import React, { useRef, useEffect, useState, useCallback } from 'react';

import styled from 'styled-components';
import { color, fontFamily } from 'assets/theme';
import autosize from 'autosize';

import { useFontLoader } from './hooks';

interface StyledProps {
  paddingRight?: number;
}

type TextAreaProps = JSX.IntrinsicElements['textarea'];

interface Props extends TextAreaProps, StyledProps {
  onScrollable: (isScollable: boolean) => void;
}

const paddingRightProp = ({ paddingRight = 65 }: StyledProps): string => `${paddingRight}px`;

const StyledTextArea = styled.textarea<StyledProps>`
  font-size: 16px;
  resize: none;
  border: 0;
  outline: 0;
  max-height: 116px;
  padding: 20px 15px;
  box-sizing: border-box;
  width: 100%;
  border-radius: 0;

  background-color: ${color('accent1')};
  font-family: ${fontFamily('secondaryAccent')};
  color: ${color('primary')};
  padding-right: ${paddingRightProp};

  &::placeholder {
    color: ${color('primary')};
    opacity: 0.7;
  }
`;

function TextArea(props: Props): JSX.Element {
  const { onChange, onScrollable, ..._props } = props;

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
      {..._props}
      ref={textareaRef}
      onChange={_onChange}
      data-scroll-lock-scrollable
    />
  );
}

export default TextArea;
