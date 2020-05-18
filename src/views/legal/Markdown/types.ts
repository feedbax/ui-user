import type { ReactNode } from 'react';

export type MarkdownProps = {
  markdownPath: string;
  helmet: ReactNode;
}

export type LinkProps = {
  href: string;
  children?: ReactNode;
}

export type LoadingProps = {
  className?: string;
};
