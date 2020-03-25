import React, { useRef, useState } from 'react';

import Logo, { LogoSize, Title, Description, Image } from 'components/Logo';

import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import getScrollBarWidth from 'lib/get-scrollbar-width';

import logo from 'assets/images/logo.png';
import bgProtrait from 'assets/images/background_vertical.jpg';
import bgLandscape from 'assets/images/background_horizontal.jpg';

import Container from './components/Container';
import Content from './components/Content';
import WriteAnswer, { TextArea, Button } from './components/WriteAnswer';

const defaultElement = document.createElement('div');
const scrollBarWidth = getScrollBarWidth();

const Event = (): JSX.Element => {
  const questionsWrapperRef = useRef<Element>(defaultElement);

  const [answerText, setAnswerText] = useState('');
  const [isTextScrollable, setTextScrollable] = useState(false);

  const _onChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setAnswerText(event.target.value);
  };

  const _onScrollable = (isScrollable: boolean): void => {
    setTextScrollable(isScrollable);
  };

  const _onFocus = (): void => {
    if (questionsWrapperRef.current) {
      disableBodyScroll(questionsWrapperRef.current);
    }
  };

  const _onBlur = (): void => {
    if (questionsWrapperRef.current) {
      enableBodyScroll(questionsWrapperRef.current);
    }
  };

  return (
    <Container bgLandscape={bgLandscape} bgProtrait={bgProtrait}>
      <Content ref={questionsWrapperRef}>
        <Logo size={LogoSize.Small} m="20px 0">
          <Image image={logo} />
          <Title>feedbax</Title>
          <Description>by 365steps</Description>
        </Logo>

        {new Array<JSX.Element>(200).fill(<></>).map(
          (_, i): JSX.Element => (
            <div key={i} style={{ backgroundColor: '#fff' }}>
              {i}
            </div>
          )
        )}
      </Content>
      <WriteAnswer>
        <TextArea
          rows={1}
          placeholder={`Deine Nachricht..`}
          value={answerText}
          maxLength={500}
          onChange={_onChange}
          onScrollable={_onScrollable}
          onFocus={_onFocus}
          onBlur={_onBlur}
        />

        <Button
          data-glyph="paper-plane"
          disabled={answerText.length === 0}
          sx={{
            transform: `translate(-${isTextScrollable ? scrollBarWidth : 0}px, -50%)`,
          }}
        />
      </WriteAnswer>
    </Container>
  );
};

export default React.memo(Event);
