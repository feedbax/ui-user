import { css } from 'styled-components';
import Event from './Event';

export const component = Event;
export const styles = {
  content: css`
    padding: 0;
    height: 100%;

    @media (min-width: 540px) {
      max-height: 800px;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 0 20px 0px rgba(0, 0, 0, 0.5);
    }
  `,
};
