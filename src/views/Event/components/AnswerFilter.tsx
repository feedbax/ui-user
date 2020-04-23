import React, { ReactNode } from 'react';
import { useSelector } from 'react-redux';

import styled, { css, FlattenSimpleInterpolation } from 'styled-components';

import store, { RootState } from 'store';
import { answerFilters, AnswerFilter } from 'store/types';
import { setAnswerFilter } from 'store/actions';

import Button from 'components/ButtonNeumorphism';

interface PaginationDotProps {
  active: boolean;
  children: ReactNode;
}

const Filter = styled.div<PaginationDotProps>`
  display: block;
  position: relative;

  transition: transform 0.3s ease, opacity 0.3s ease;

  ${(props): FlattenSimpleInterpolation => css`
    transform: scale(${props.active ? 1 : 0.8});
  `}
`;

const Wrapper = styled.div`
  flex: 0 0 auto;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const getIcon = (filter: number, currentFilter: number): string => {
  switch (filter) {
    case AnswerFilter.POPULAR:
      return filter === currentFilter ? 'heart-filled' : 'heart';

    case AnswerFilter.RECENT:
      return filter === currentFilter ? 'clock-filled' : 'clock';

    case AnswerFilter.MINE:
      return filter === currentFilter ? 'user-filled' : 'user';

    default:
      return '';
  }
};

function SelectAnswerFilter(): JSX.Element {
  const currentFilter = useSelector<RootState, AnswerFilter>((state) => state.app.answerFilter);

  return (
    <Wrapper>
      {answerFilters.map((filter) => (
        <Filter key={filter} active={filter === currentFilter}>
          <Button
            key={filter}
            icon={getIcon(filter, currentFilter)}
            onClick={(): void => {
              const action = setAnswerFilter(filter);
              store.dispatch(action);
            }}
            size={28}
            apperance={{
              backgroundColor: 'accent2',
              padding: 20,
            }}
          />
        </Filter>
      ))}
    </Wrapper>
  );
}

export default React.memo(SelectAnswerFilter);
