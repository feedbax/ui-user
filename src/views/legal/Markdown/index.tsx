import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';

import Logo, { Image, Title, Description } from 'components/Logo';
import { Loading } from './styled';

import logo from 'assets/images/logo_128c.png';

import type { MarkdownProps, LinkProps } from './types';

const isExternalRegExp = /^(http|mailto)/;

const renderers = {
  link({ href, children }: LinkProps): JSX.Element {
    const isExternal = isExternalRegExp.test(href);

    if (isExternal) {
      return <a href={href}>{ children }</a>;
    }

    return (
      <Link to={href}>
        {children}
      </Link>
    );
  },
};

const Markdown = ({ markdownPath, helmet }: MarkdownProps): JSX.Element => {
  const [markdown, setMarkdown] = useState<string>();

  useEffect(() => {
    const loadMarkdown = async (): Promise<void> => {
      const result = await fetch(markdownPath);
      const content = await result.text();

      setMarkdown(content);
    };

    loadMarkdown();
  }, [markdownPath]);

  return (
    <>
      {helmet}

      <Logo link="/" margin={['30px 0', '40px 0', '50px 0']}>
        <Image image={logo} />
        <Title>feedbax</Title>
        <Description>by 365steps</Description>
      </Logo>

      <div className="content">
        {markdown ? (
          <ReactMarkdown renderers={renderers} source={markdown} />
        ) : (
          <Loading />
        )}
      </div>
    </>
  );
};

export default React.memo(Markdown);
