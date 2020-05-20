import React from 'react';
import { useSelector } from 'react-redux';

import store from 'store';
import { answerFilters, AnswerFilter } from 'store/types';
import { setAnswerFilter } from 'store/actions';
import { currentAnswerFilterSelector, currentQuestionSelector } from 'store/selectors';
import { isFilterAble } from '@feedbax/backend-api/store/modules/questions/types';

import Button from 'components/ButtonNeumorphism';
import { Wrapper, Filter } from './styled';

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
  const currentQuestion = useSelector(currentQuestionSelector);
  const currentFilter = useSelector(currentAnswerFilterSelector);

  const isDisabled = !isFilterAble(currentQuestion);

  return (
    <Wrapper>
      {answerFilters.map((filter) => (
        <Filter key={filter} disabled={isDisabled} active={filter === currentFilter}>
          <Button
            key={filter}
            icon={getIcon(filter, currentFilter)}
            onClick={(): void => {
              if (!isDisabled) {
                const action = setAnswerFilter(filter);
                store.dispatch(action);
              }
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
