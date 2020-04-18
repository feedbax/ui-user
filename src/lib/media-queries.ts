import { css, FlattenInterpolation } from 'styled-components';
import { ThemeProps } from 'assets/theme';

type Fn = (props: any) => string;
type Prop = string[] | number[] | string | number | Fn;
type CSS = typeof css;
type CSSReturn = ReturnType<CSS>;
type Query = (template: TemplateStringsArray, ...substitutions: Prop[]) => CSSReturn;

type Size = 'xl' | 'lg' | 'md' | 'sm' | 'xs';
type Sizes = {
  [key in Size]?: number;
};

export const sizes: Sizes = {
  xl: 1216,
  lg: 1024,
  md: 832,
  sm: 640,
  xs: 0,
};

const substitution = (_substitution: Prop, i: number): string | Fn => {
  if (Array.isArray(_substitution)) {
    return `${_substitution[i] ? _substitution[i] : ''}`;
  }

  if (['string', 'number'].includes(typeof _substitution)) {
    return `${_substitution}`;
  }

  if (typeof _substitution === 'function') {
    return _substitution;
  }

  return '';
};

type CreateTemplate = (sizes: Size[]) => TemplateStringsArray;

const createTemplate: CreateTemplate = (_sizes) => {
  const _template = [];

  for (let i = 0; i < _sizes.length; i += 1) {
    if (i === 0) {
      _template.push('@media (min-width: ');
    } else {
      _template.push('} @media (min-width: ');
    }

    _template.push('px) {');

    if (i === _sizes.length - 1) {
      _template.push('}');
    }
  }

  return (_template as unknown) as TemplateStringsArray;
};

type Substitutions = (number | FlattenInterpolation<ThemeProps>)[];

type CreateSubstitutions = (
  sizes: Size[],
  template: TemplateStringsArray,
  substitutions: Prop[]
) => Substitutions;

const createSubstitutions: CreateSubstitutions = (_sizes, template, substitutions) => {
  const _substitutions: Substitutions = [];

  for (let i = 0; i < _sizes.length; i += 1) {
    const sizeKey = _sizes[i];
    const size = sizes[sizeKey];

    _substitutions.push(size || 0);
    _substitutions.push(css(template, ...substitutions.map((_sub) => substitution(_sub, i))));
  }

  return _substitutions;
};

export default function media(..._sizes: Size[]): Query {
  return (template, ...substitutions): CSSReturn => {
    const _template = createTemplate(_sizes);
    const _substitutions = createSubstitutions(_sizes, template, substitutions);

    return css(_template, ..._substitutions);
  };
}
